const User = require('../model/User');

const logoutController = async (req, res) => {
  try {
      const cookies = req.cookies;
      if(!cookies?.jwt) return res.sendStatus(204);
    
      const rToken = cookies.jwt;
      res.clearCookie('jwt', { httpOnly: false, sameSite: 'None', secure: true }); //httpOnly: true, sameSite: 'None', secure: true
    
      const foundUser = await User.findOne({ refreshToken: rToken }).exec();
      if(!foundUser) return res.sendStatus(204);
    
      const refreshTokenArray = foundUser.refreshToken.filter(rt => rt !== rToken);
      foundUser.refreshToken = [...refreshTokenArray];
      await foundUser.save();
      res.sendStatus(204);
  }
  catch {
    res.sendStatus(500);
  }
};

module.exports = logoutController;