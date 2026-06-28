const Product = require("../models/Products");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const multer = require("multer");

exports.readProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find();
  if (products.length === 0) {
    return next(new AppError("No Product found", 200));
  }
  res.status(200).json({
    status: "success",
    data: products,
  });
});
exports.createProduct = catchAsync(async (req, res, next) => {
  console.log(req.body);

  // return console.log(req.body);
  const products = await Product.create(req.body);
  console.log(products);
  res.status(201).json({
    status: "success",
    data: products,
  });
});
exports.editProduct = catchAsync(async (req, res, next) => {
  const products = await Product.findByIdAndUpdate(req.params.id, req.body);
  //   return res.send(req.params);
  res.status(200).json({
    status: "success",
    data: products,
  });
});
exports.deleteProduct = catchAsync(async (req, res, next) => {
  // return console.log("Id", req.params);
  const products = await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "Product Deleted Successfully",
    data: products,
  });
});
