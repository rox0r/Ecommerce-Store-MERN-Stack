const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizedRoles } = require("../middlewares/auth");

const {
  getAllProducts,
  createProduct,
  UpdateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controllers/productController");

router.route("/products").get(getAllProducts);

router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizedRoles("admin"), createProduct);

router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizedRoles("admin"), UpdateProduct)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteProduct);

router.route("/product/:id").get(getProductDetails);

module.exports = router;
