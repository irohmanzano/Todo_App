const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  try {
    const auth = req.headers.authorization || req.headers.Authorization;
    if(!auth || !auth.startsWith('Bearer ')) return res.sendStatus(401);
    const aToken = auth.split(' ')[1];
    jwt.verify(
      aToken,
      process.env.ACCESS_TOKEN_SECRET,
      (err, decoded) => {
        if(err) return res.sendStatus(403);
        req.username = decoded.username;
        next();
      }
    );
  }
  catch {
    res.sendStatus(500);
  }
};

module.exports = verifyJWT;