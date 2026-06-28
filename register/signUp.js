const bcrypt = require("bcryptjs");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/User");
exports.registerUser = catchAsync(async (req, res, next) => {
  const hashedPass = await bcrypt.hash(req.body.password, 10);
  //   return res.send(hashedPass);
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPass,
  });

  return res.send(user);

  res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
});
