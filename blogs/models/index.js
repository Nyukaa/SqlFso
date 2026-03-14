const Blog = require("./blog");
const User = require("./user");

User.hasMany(Blog);
Blog.belongsTo(User);

// Blog.sync({ alter: true }); //do not use in production, it can cause data loss do sync in utils/db
// User.sync({ alter: true });

module.exports = {
  Blog,
  User,
};
