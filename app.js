const express = require("express");
const app = express();

const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const authorsRouter = require("./controllers/authors");
const testingRouter = require("./controllers/testing");
const loginRouter = require("./controllers/login");
const logoutRouter = require("./controllers/logout");
//const errorHandler = require("./middleware/ErrorHandler").default;
const readingListsRouter = require("./controllers/readinglists");
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("ok");
});
app.use("/api/login", loginRouter);
app.use("/api/logout", logoutRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/authors", authorsRouter);
app.use("/api/readinglists", readingListsRouter);
app.use("/api", testingRouter);

//app.use(errorHandler);

module.exports = app;
