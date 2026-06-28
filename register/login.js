const catchAsync = require("../utils/catchAsync");
const User = require("../models/User");
const AppError = require("../utils/AppError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const err = new AppError("Enter valid email and password");
  }
  //   return console.log(email, password);
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    const err = new AppError("Invalid Email or Password", 401);
    return next(err);
  }
  const decoded = await bcrypt.compare(password, user.password);
  if (!decoded) {
    const err = new AppError("Invalid Email or Password", 401);
    return next(err);
  }
  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});
exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new AppError("You are not logged in", 401);
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    throw new AppError("User no longer exists", 401);
  }

  req.user = currentUser;
  next();
});
