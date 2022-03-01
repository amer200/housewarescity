const mongoose = require("mongoose");

const prodScema = mongoose.Schema({
  name: {
    type: String,
    uniqui: true,
    required: true,
  },
  quant: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imgs: [String],
});
const categorySchema = mongoose.Schema({
  name: {
    type: String,
    uniqui: true,
    required: true,
  },
  prods: [prodScema],
});
prodScema.index({ name: "text", "name": "text" });
module.exports = mongoose.model("Categ-ar", categorySchema);
