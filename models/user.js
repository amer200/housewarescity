const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  username: String,
  password: { type: String, required: true },
  email: { type: String, unique: true },
  isactive: { type: Boolean, required: true },
  role: { type: String },
  code: String,
});

module.exports = mongoose.model("User", userSchema);
