require("dotenv").config();

const { Sequelize } = require("sequelize");
const { Umzug, SequelizeStorage } = require("umzug");

const isProduction = process.env.NODE_ENV === "production";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: isProduction
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {},
});

const runMigrations = async () => {
  const migrator = new Umzug({
    migrations: {
      glob: "migrations/*.js",
    },
    storage: new SequelizeStorage({
      sequelize,
      tableName: "migrations",
    }),
    context: sequelize.getQueryInterface(),
    logger: console,
  });

  await migrator.up();
};

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();

    console.log("connected to the database");
  } catch (err) {
    console.error(err);
    console.log("failed to connect to the database");
    process.exit(1);
  }
};

module.exports = { connectToDatabase, sequelize };
