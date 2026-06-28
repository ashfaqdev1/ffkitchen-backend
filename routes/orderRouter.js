const express = require("express");
const router = express.Router();
const { protect } = require("../register/login");

const {
  readOrders,
  placeOrder,
  deleteOrder,
  orderStatus,
} = require("../controller/orderController");

router
  .get("/orders", protect, readOrders)
  .post("/place", placeOrder)
  .patch("/edit/:id", protect, orderStatus)
  .delete("/delete/:id", protect, deleteOrder);

module.exports = router;
