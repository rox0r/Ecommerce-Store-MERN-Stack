require("dotenv").config({ path: "./config/.env" });
const connectDB = require("./config/connectDB");
const app = require("./index");

// Handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down server due to uncaught exception");
  process.exit(1);
});

connectDB();

const server = app.listen(process.env.PORT, () => {
  console.log(`Started listening at port ${process.env.PORT}`);
});

//Unhandled promise rejection handler
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down server due to unhandled rejection");
  server.close(() => {
    process.exit(1);
  });
});
