const mongoose = require("mongoose");

const prodScema = mongoose.Schema({
  name: {
    ar: String,
    en: String,
  },
  desc: {
    ar: String,
    en: String,
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
  itemno: String,
  dimentions: Object,
  offer: Number,
});
const categorySchema = mongoose.Schema({
  name: {
    ar: String,
    en: String,
  },
  img: String,
  backg: String,
  prods: [prodScema],
});
module.exports = mongoose.model("Categ-ar", categorySchema);
