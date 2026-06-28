const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, "Order is required"],
    },
    contactPhone: {
      type: String,
      required: [true, "Contact no is required"],
    },
    name: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    address: {
      type: String,
      required: [true, "Address can not be left empty"],
    },
    city: {
      type: String,
      required: [true, "City cannot be left empty"],
    },
    productId: {
      type: String,
      required: [true, "Product Id is required"],
    },
    productName: {
      type: String,
      required: [true, "Product Name is Required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    orderStatus: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
