const ErrorHandler = require("../utilities/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //Mongodb objectID Cast Error Handling
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(400, message);
  }

  //Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered.`;
    err = new ErrorHandler(400, message);
  }

  // Wrong Json Web Token
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again.`;
    err = new ErrorHandler(400, message);
  }

  //Expired Json Web Token
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is expired, Try again.`;
    err = new ErrorHandler(400, message);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message, //change to err.stack to display it along with msg
  });
};
