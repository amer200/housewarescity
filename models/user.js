const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: { type: String, unique: true },
  password: { type: String, required: true },
  email: { type: String, unique: true },
  isactive: { type: Boolean, required: true },
  role: { type: String },
  code: Number,
});

module.exports = mongoose.model("User", userSchema);
