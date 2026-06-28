const express = require("express");
const router = express.Router();
const { registerUser } = require("../register/signUp");
const { login } = require("../register/login");

router.post("/create", registerUser).post("/login", login);

module.exports = router;
