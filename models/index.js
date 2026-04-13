const Blog = require("./blog");
const User = require("./user");
const ReadingList = require("./reading_list");
const Session = require("./session");
User.hasMany(Blog);
Blog.belongsTo(User);

// Blog.sync({ alter: true }); //do not use in production, it can cause data loss do sync in utils/db
// User.sync({ alter: true });
User.belongsToMany(Blog, { through: ReadingList, as: "readings" });
Blog.belongsToMany(User, { through: ReadingList, as: "readers" });

User.hasMany(Session);
Session.belongsTo(User);

module.exports = {
  Blog,
  User,
  ReadingList,
  Session,
};
