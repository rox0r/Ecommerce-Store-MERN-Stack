const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const productsRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");

const ErrorHandler = require("./utilities/errorHandler");
const errorMiddleware = require("./middlewares/error");

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use("/api/v1/", productsRouter);
app.use("/api/v1/", userRouter);

app.use(errorMiddleware);

module.exports = app;
