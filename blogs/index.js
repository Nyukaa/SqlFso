const express = require("express");
const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");
//const sequelize = require("./utils/db");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const authorsRouter = require("./controllers/authors");
const errorHandler = require("./middleware/ErrorHandler");
const app = express();

app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/login", loginRouter);
app.use("/api/authors", authorsRouter);
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
