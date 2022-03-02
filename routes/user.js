const express = require("express");
const route = express.Router();
const userController = require("../controllers/user");

route.post("/signup", userController.signUp);
route.get("/confirm/email/:code", userController.emailConfirm);
route.post("/signin", userController.signIn);
module.exports = route;
