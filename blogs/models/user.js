const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,

      //isEmail: true,
      validate: {
        isEmail: {
          msg: "username must be a valid email address",
        },
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING,
      //allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "user",
    underscored: true, // this will make the createdAt  fields to be created_at in the database
    timestamps: true,
  }
);

module.exports = User;
