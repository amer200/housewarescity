const express = require("express");
const route = express.Router();
const mainController = require("../controllers/main");
const isLogedin = require("../controllers/isLogedin").isLoged;
route.get("/", mainController.getIndex);
route.get("/about-us", mainController.getAbout);
route.get("/prods/:categ", mainController.getProds);
route.get("/prod/:prodId/:categId", mainController.getProd);
route.get("/contact", mainController.getContact);
route.get("/card/:userId", isLogedin, mainController.getCard);
route.get(
  "/add-card/:prodId/:categId/:userId",
  isLogedin,
  mainController.addCard
);
module.exports = route;
