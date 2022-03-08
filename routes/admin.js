const express = require("express");
const route = express.Router();
const adminController = require("../controllers/admin");

route.get("/", adminController.getIndex);
// categorys
route.post("/add-categ/", adminController.addCateg);
route.post("/edit-categ/:categId", adminController.editCateg);
route.post("/remove-categ/:categId", adminController.removeCateg);
// products
route.get("/prods/:categId", adminController.getCategProd);
route.post("/add-prod/:categId", adminController.addProd);
// route.get("/add-prod/:categId", adminController.getAddProd);
route.post("/edit-prod/:prodId/:categId", adminController.editProd);
route.post("/remove-prod/:prodId/:categId", adminController.removeProd);

module.exports = route;
