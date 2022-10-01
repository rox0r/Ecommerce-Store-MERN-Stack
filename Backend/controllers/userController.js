const User = require("../modals/userModal");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const bcrypt = require("bcryptjs");
const ErrorHandler = require("../utilities/errorHandler");
const sendToken = require("../utilities/jwtToken");
const sendEmail = require("../utilities/sendEmail");
const crypto = require("crypto");

// Register User
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const userData = {
    name,
    email,
    password,
    avatar: {
      public_id: "jhdsbfdsjhfb",
      url: "sdhjfhjdhsf",
    },
  };
  const user = await User.create(userData);

  sendToken(user, 201, res);
});

// Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler(400, "Please enter Email and Password"));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler(400, "Invalid Email or Password"));
  }
  const isPassMatched = await user.comparePassword(password);

  if (!isPassMatched) {
    return next(new ErrorHandler(400, "Invalid Email or Password"));
  }

  sendToken(user, 200, res);
});

// Logout User
exports.logoutUser = catchAsyncError(async (req, res, next) => {
  const options = {
    expires: new Date(Date.now()), //Expire right away
    httpOnly: true,
  };

  res.cookie("token", null, options);

  res.status(200).json({
    success: true,
    message: "Logout Successful",
  });
});

// Forgot Password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler(404, "User not found"));
  }

  const resetToken = user.getResetPassToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset link is: \n\n ${resetPasswordUrl}`;

  // try to send email
  try {
    await sendEmail({
      email: user.email,
      subject: "Ecommerce Password Reset Link",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Reset Password link sent to ${req.body.email}`,
    });
  } catch (error) {
    //Clear saved token and expiry time first
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(500, error.message));
  }
});

// Reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  //Turn received token to hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler(400, "Invalid or Expired token"));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler(400, "Password does not match "));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Update Password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const isPassMatched = await user.comparePassword(req.body.currentPassword);

  if (!isPassMatched) {
    return next(new ErrorHandler(400, "Please enter correct current password"));
  }

  if (req.body.newPassword !== req.body.confirmNewPassword) {
    return next(new ErrorHandler(400, "Password does not match "));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res);
});

// Get User Details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

// Update User Details
exports.updateUserDetails = catchAsyncError(async (req, res, next) => {
  const newUserDetails = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserDetails, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

// Get all Users - Admin Only
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

// Get One User - Admin Only
exports.getOneUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler(404, `No user with ID: \n ${req.params.id}`));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Update User Role - Admin Only
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const newUserDetails = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserDetails, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (!user) {
    return next(new ErrorHandler(404, `No user with ID: \n ${req.params.id}`));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Delete User - Admin Only
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler(404, `No user with ID: \n ${req.params.id}`));
  }

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfuly",
  });
});
