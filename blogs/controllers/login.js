const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); // for hashing passwords
const loginRouter = require("express").Router();
const { User } = require("../models");
const { SECRET } = require("../utils/config");

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    where: { username },
  });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };
  // create a token that expires in 1 hour
  const token = jwt.sign(userForToken, SECRET, {
    expiresIn: "1h",
  });
  // return the token and user information
  res.json({
    token,
    username: user.username,
    name: user.name,
  });
});

module.exports = loginRouter;
