const mongoose = require("mongoose");

const teamSchema = mongoose.Schema({
  name: String,
  job: String,
  img: String,
  facebook: String,
  twitter: String,
  insta: String,
});
module.exports = mongoose.model("Team", teamSchema);
