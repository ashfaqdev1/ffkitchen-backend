const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    desc: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    stock: {
      type: Number,
      required: [true, "Stock count is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    status: {
      type: String,
      required: true,
      // enum: ["Active", "Out of Stock"],
      default: "Active",
    },
    imageUrl: {
      type: String,
      required: [true, "Image Url is required"],
    },
    publicId: {
      type: String,
      require: [true, "Public Id of image is required"],
    },
  },
  {
    timestamps: true, // Automatically creates createdAt and updatedAt date tracking strings
  },
);

// Compile schema into a collection named "products"
const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
