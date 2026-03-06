const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

class Note extends Model {}

Note.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    important: {
      type: DataTypes.BOOLEAN,
    },
    date: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "note",
    underscored: true,
    timestamps: false,
  }
);

module.exports = Note;
