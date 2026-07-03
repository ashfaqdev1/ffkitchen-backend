const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  createProduct,
  readProducts,
  editProduct,
  deleteProduct,
} = require("../controller/productsController");
const { protect } = require("../register/login");
const { uploadToCloudinary } = require("../config/cloudinaryUpload");
const {
  deleteFromCloudinary,
  deleteImageCloudinary,
} = require("../Middlewares/deleteImageMiddleWare");

const storage = multer.memoryStorage();

const upload = multer({ storage });

router
  .get("/read", readProducts)
  .post(
    "/create",
    protect,
    upload.single("image"),
    uploadToCloudinary,
    createProduct,
  )
  .patch(
    "/edit/:id",
    protect,
    upload.single("image"),
    deleteFromCloudinary,
    uploadToCloudinary,
    editProduct,
  )
  .delete("/delete/:id", protect, deleteImageCloudinary, deleteProduct);

module.exports = router;
