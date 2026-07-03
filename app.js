const express = require("express");
const morgan = require("morgan");
const userrouter = require("./routes/userrouter");
const productRouter = require("./routes/productrouter");
const orderRouter = require("./routes/orderRouter");
const globalErrorHandler = require("./controller/errorController");
const AppError = require("./utils/AppError");
const app = express();
const path = require("path");
const cors = require("cors");

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://ffkitchen.duckdns.org",
];

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Blocked by security policy (CORS)"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(morgan("dev"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/v1/admin", userrouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/order", orderRouter);

app.all("/*s", (req, res, next) => {
  const err = new AppError("Wrong path", 404);
  return next(err);
});

app.use(globalErrorHandler);
module.exports = app;
