const cloudinary = require("../config/cloudinary");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const Product = require("../models/Products");
exports.deleteFromCloudinary = catchAsync(async (req, res, next) => {
  //   return console.log(req.params);
  const product = await Product.findById(req.params.id);

  if (!product?.publicId) {
    return next();
  }

  const deleteImage = await cloudinary.uploader.destroy(product.publicId);

  //   return console.log(deleteImage);
  if (deleteImage.result.includes("not found")) {
    const err = new AppError("Image could not deleted", 400);
    return next(err);
  }
  next();

  //   const err = new AppError("Image could not deleted", 400);
  //   return next(err);
});
