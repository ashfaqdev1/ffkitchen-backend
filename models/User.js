// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"], // Built-in validation with a custom error message
      trim: true, // Automatically removes whitespace from start/end
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true, // Generates a unique index (prevents duplicate emails)
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email", // Regex validation for emails
      ],
    },
    password: {
      type: String,
      required: [true, "Password must be given"],
    },
  },
  {
    timestamps: true, // Automatically creates and manages 'createdAt' and 'updatedAt' fields
  },
);

// Compiling the schema into a reusable Model
// Mongoose will automatically look for a lowercase, plural collection named "users"
const User = mongoose.model("User", userSchema);

module.exports = User;
