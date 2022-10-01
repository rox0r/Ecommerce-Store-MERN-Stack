const catchAsyncError = require("../middlewares/catchAsyncErrors");
const ProductModal = require("../modals/productModal");
const ErrorHandler = require("../utilities/errorHandler");
const ApiFeatures = require("../utilities/ApiFeatures");

// Get all products (Admin Only)
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const resultsPerPage = 8;
  const productsCount = await ProductModal.countDocuments();
  const apiFeatures = new ApiFeatures(ProductModal, req.query)
    .search()
    .filter();

  let products = await apiFeatures.query;
  let filteredProductsCount = products.length;
  apiFeatures.pagination(resultsPerPage);
  products = await apiFeatures.query.clone();

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultsPerPage,
    filteredProductsCount,
  });
});

// Create a product (Admin Only)
exports.createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await ProductModal.create(req.body);
  res.status(201).json({ success: true, product });
});

// Update a product (Admin Only)
exports.UpdateProduct = catchAsyncError(async (req, res, next) => {
  let product = await ProductModal.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler(500, "Product not found"));
  }
  product = await ProductModal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

//Delete a product (Admin Only)
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  let product = await ProductModal.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler(500, "Product not found"));
  }
  await product.remove();
  res.status(200).json({
    success: true,
    messsage: "Product Deleted Successfully",
  });
});

//Get single product details - (All Users)
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  let product = await ProductModal.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler(500, "Product not found"));
  }
  res.status(200).json({
    success: true,
    product,
  });
});
