const User = require('../model/User');
const bcrypt = require('bcrypt');

const registerController = async (req, res) => {
  try {
    const { firstName, lastName, username, password } = req.body;
    if(!firstName || !lastName || !username || !password) return res.sendStatus(400);
    const foundUser = await User.findOne({username});
    if(foundUser) return res.sendStatus(409);
    const hashedPwd = await bcrypt.hash(password, 10);
    await User.create({
      firstName,
      lastName,
      username,
      password: hashedPwd
    });
    res.sendStatus(201);
  } 
  catch {
    res.sendStatus(500);
  }
};

module.exports = registerController;