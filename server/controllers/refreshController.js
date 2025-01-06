const User = require('../model/User');
const jwt = require('jsonwebtoken');

const refreshController = async (req, res) => {
  try {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401);
    const rToken = cookies.jwt;
    res.clearCookie('jwt', { httpOnly: false, sameSite: 'None', secure: true }); //httpOnly: true, sameSite: 'None', secure: true

    const foundUser = await User.findOne({ refreshToken: rToken });
    if(!foundUser) {
      jwt.verify(
        rToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
          if(err) return res.sendStatus(403);
          if(decoded.username) {
            const hackedUser = await User.findOne({ username: decoded.username });
            if(hackedUser) {
              hackedUser.refreshToken = [];
              await hackedUser.save();
            }
          }
        }
      );
      return res.sendStatus(403)
    };

    const refreshTokenArray = foundUser.refreshToken.filter(rt => rt !== rToken);
    
    jwt.verify(
      rToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if(err) {
          foundUser.refreshToken = [...refreshTokenArray];
          await foundUser.save();
        }
        if(err || decoded.username !== foundUser.username) return res.sendStatus(403);
        
        const accessToken = jwt.sign(
          { 'username': decoded.username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '1h' }
        );

        const newRefreshToken = jwt.sign(
          { 'username': decoded.username },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: '1d' }
        );

        foundUser.refreshToken = [...refreshTokenArray, newRefreshToken];
        await foundUser.save();
        res.cookie('jwt', newRefreshToken, { httpOnly: false, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 }); //httpOnly: true, sameSite: 'None', secure: true
        res.json({ userID: foundUser._id, username: foundUser.username, accessToken });
      }
    );
  }
  catch {
    res.sendStatus(500);
  }
};

module.exports = refreshController;