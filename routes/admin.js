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
route.post(
  "/remove-prod-img/:categId/:prodId/:imgPath",
  adminController.removeProdImg
);
// route.get("/add-prod/:categId", adminController.getAddProd);
route.post("/edit-prod/:prodId/:categId", adminController.editProd);
route.post("/remove-prod/:prodId/:categId", adminController.removeProd);
// team
route.get("/team", adminController.getTeam);
route.post("/add-team", adminController.addTeam);
route.post("/remove-team/:id", adminController.removeTeam);
module.exports = route;
