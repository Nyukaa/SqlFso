const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    likes: { type: DataTypes.INTEGER, defaultValue: 0 },
    year: {
      type: DataTypes.INTEGER,
      allowNull: true, //
      validate: {
        min: {
          args: 1991,
          msg: "year must be at least 1991",
        },
        max: {
          args: new Date().getFullYear(),
          msg: `year cannot be greater than ${new Date().getFullYear()}`,
        },
      },
    },
  },
  {
    sequelize,
    modelName: "blog",
    timestamps: true,
    underscored: true,
  }
);

module.exports = Blog;
