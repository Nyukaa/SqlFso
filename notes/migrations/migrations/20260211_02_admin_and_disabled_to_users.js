const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("users", "admin", {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    });
    //Если disabled = true, пользователь не должен логиниться.
    await queryInterface.addColumn("users", "disabled", {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    });
  },
  //= откатить миграцию
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("users", "admin");
    await queryInterface.removeColumn("users", "disabled");
  },
};
