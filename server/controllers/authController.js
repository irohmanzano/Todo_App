const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const cookies = req.cookies;
    if(!username || !password) return res.sendStatus(400);
    if(cookies) res.clearCookie('jwt', { httpOnly: false, sameSite: 'None', secure: true }); //httpOnly: true, sameSite: 'None', secure: true

    const foundUser = await User.findOne({username});
    if(!foundUser) return res.sendStatus(401);

    const pwdMatched = await bcrypt.compare(password, foundUser.password);
    if(!pwdMatched) return res.sendStatus(401);

    
    const accessToken = jwt.sign(
      { 'username': foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign(
      { 'username': foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );
    
    let refreshTokenArray = !cookies.jwt
                              ? foundUser.refreshToken
                              : foundUser.refreshToken.filter(rt => rt !== cookies.jwt);

    if(cookies?.jwt) {
      const rToken = cookies.jwt;
      const foundToken = await User.findOne({ refreshToken: rToken });

      if(foundToken) {
        refreshTokenArray = [];
      }

      res.clearCookie('jwt', { httpOnly: false, sameSite: 'None', secure: true }); //httpOnly: true, sameSite: 'None', secure: true
    }

    foundUser.refreshToken = [...refreshTokenArray, refreshToken];
    await foundUser.save();

    res.cookie('jwt', refreshToken, { httpOnly: false, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 }); //httpOnly: true, sameSite: 'None', secure: true
    res.status(200).json({ userID: foundUser._id, username: foundUser.username, accessToken });
  }
  catch {
    res.sendStatus(500);
  }
};

module.exports = authController;