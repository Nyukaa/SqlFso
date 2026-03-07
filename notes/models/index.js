const Note = require("./note");
const User = require("./user");

//Note.sync(); // Create the table if it doesn't exist
User.hasMany(Note);
Note.belongsTo(User); //create foreign key userId in Note table

// User.sync();
// Note.sync();

Note.sync({ alter: true });
User.sync({ alter: true });

module.exports = {
  Note,
  User,
};
