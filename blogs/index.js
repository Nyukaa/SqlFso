require("dotenv").config();
const express = require("express");
const sequelize = require("./utils/db");
const blogsRouter = require("./controllers/blogs");

const app = express();

app.use(express.json());
app.use("/api/blogs", blogsRouter);

const PORT = process.env.PORT || 3002;

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
