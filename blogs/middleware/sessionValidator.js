const { Session, User } = require("../models");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../utils/config");

const sessionValidator = async (req, res, next) => {
  const authorization = req.get("authorization");
  if (!authorization || !authorization.toLowerCase().startsWith("bearer ")) {
    return res.status(401).json({ error: "token missing" });
  }

  const token = authorization.substring(7);
  let decoded;
  try {
    decoded = jwt.verify(token, SECRET);
  } catch {
    return res.status(401).json({ error: "token invalid" });
  }

  // check if the session exists in the database
  const session = await Session.findOne({ where: { token } });
  if (!session) {
    return res.status(401).json({ error: "session expired or invalid" });
  }

  // check if the user exists and is not disabled
  const user = await User.findByPk(decoded.id);
  if (!user || user.disabled) {
    return res.status(403).json({ error: "user disabled" });
  }

  req.decodedToken = decoded;
  next();
};

module.exports = sessionValidator;
