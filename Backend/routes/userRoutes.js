const express = require("express");
const { isAuthenticatedUser, authorizedRoles } = require("../middlewares/auth");

const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  updatePassword,
  getUserDetails,
  updateUserDetails,
  getAllUsers,
  getOneUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/me/update").put(isAuthenticatedUser, updateUserDetails);
router
  .route("/admin/users/")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getAllUsers);
router
  .route("/admin/users/:id")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getOneUser)
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteUser);
module.exports = router;
