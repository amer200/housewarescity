const express = require("express");
const route = express.Router();
const adminController = require("../controllers/admin");

// categorys
route.post("/add-categ", adminController.addCateg);
route.post("/edit-categ/:categId", adminController.editCateg);
route.post("/remove-categ/:categId", adminController.removeCateg);
// products
route.post("/add-prod", adminController.addProd);
route.post("/edit-prod/:prodId", adminController.editProd);
route.post("/remove-prod/:prodId", adminController.removeProd);

module.exports = route;
