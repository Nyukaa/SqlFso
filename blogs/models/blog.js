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
  },
  {
    sequelize,
    modelName: "blog",
    timestamps: false,
    underscored: true,
  }
);

module.exports = Blog;
