const express = require("express");
const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");
//const sequelize = require("./utils/db");
const blogsRouter = require("./controllers/blogs");
const errorHandler = require("./middleware/ErrorHandler");
const app = express();

app.use(express.json());
app.use("/api/blogs", blogsRouter);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectToDatabase();
    console.log("Database connected successfully.");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();
