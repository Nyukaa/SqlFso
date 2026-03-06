const Note = require("./note");
const User = require("./user");

Note.sync(); // Create the table if it doesn't exist
User.sync();

module.exports = {
  Note,
  User,
};
