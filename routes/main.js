const express = require("express");
const route = express.Router();
const mainController = require("../controllers/main");

route.get("/get-categs", mainController.getCategs);
route.get("/get-categ/:categId", mainController.getCateg);
route.get("/prods", mainController.getProds);
route.get("/prod/:prodId", mainController.getProd);
route.get("/search", mainController.search);
module.exports = route;
