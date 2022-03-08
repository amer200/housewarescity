const express = require("express");
const route = express.Router();
const mainController = require("../controllers/main");

route.get("/", mainController.getIndex);
route.get("/about-us", mainController.getAbout);
route.get("/prods/:categ", mainController.getProds);
route.get("/prod/:prodId/:categId", mainController.getProd);
route.get("/contact", mainController.getContact);
route.get("/card/:userId", mainController.getCard);
route.get("/add-card/:prodId/:categId/:userId", mainController.addCard);
module.exports = route;
