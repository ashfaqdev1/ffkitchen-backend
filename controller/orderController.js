const Order = require("../models/Order");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const Product = require("../models/Products");

exports.readOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find();
  // console.log(orders);
  if (orders.length === 0) {
    return next(new AppError("No Order found", 200));
  }
  res.status(200).json({
    status: "success",
    data: orders,
  });
});
exports.placeOrder = catchAsync(async (req, res, next) => {
  const {
    items: [{ productId }],
    customerName,
    customerPhone,
    customerEmail,
    deliveryAddress,
    city,
  } = req.body;
  // return console.log(productId);
  const product = await Product.findById(productId);

  const orders = await Order.find();
  const orderId = `ORD_${orders.length + 1}`;

  const customerOrder = {
    name: customerName,
    email: customerEmail,
    contactPhone: customerPhone,
    address: deliveryAddress,
    productId: productId,
    city: city,
    productName: product.title,
    id: `ORD_${orders.length + 1}`,
    price: product.price,
  };
  // return console.log(customerOrder);
  const order = await Order.create(customerOrder);

  res.status(201).json({
    status: "success",
    data: order,
  });
});
exports.orderStatus = catchAsync(async (req, res, next) => {
  console.log(req.body);

  const status = await Order.findByIdAndUpdate(req.params.id, req.body);
  res.status(201).json({
    status: "Success",
    data: status,
  });
});
exports.deleteOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "Product Deleted Successfully",
    data: order,
  });
});
