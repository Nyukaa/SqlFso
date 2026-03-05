require("dotenv").config();
const express = require("express");
const sequelize = require("./utils/db");
const notesRouter = require("./controllers/notes");

const app = express();

app.use(express.json());
app.use("/api/notes", notesRouter);

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();
