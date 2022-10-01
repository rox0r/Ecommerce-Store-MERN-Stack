const jwt = require("jsonwebtoken");
const User = require("../modals/userModal");
const ErrorHandler = require("../utilities/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler(401, "Please login to access resource"));
  }

  const decodedData = await jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);
  next();
});

exports.authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(403, `Role: ${req.user.role}, does not has permission`)
      );
    }
    next();
  };
};
