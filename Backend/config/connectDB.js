const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(process.env.DB_URI, { useNewUrlParser: true })
    .then((data) => {
      console.log(`MongoDB connected to server ${data.connection.host}`);
    });
}

module.exports = connectDB;
