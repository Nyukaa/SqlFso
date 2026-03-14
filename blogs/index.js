const { PORT } = require("./utils/config");
const app = require("./app");
const { connectToDatabase } = require("./utils/db");

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
