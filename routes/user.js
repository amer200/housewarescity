const express = require("express");
const route = express.Router();
const userController = require("../controllers/user");

route.post("/signup", userController.signUp);
route.get("/signup", userController.getSignUp);
route.get("/confirm/email/:code", userController.emailConfirm);
route.post("/signin", userController.signIn);
route.get("/signin", userController.getSignIn);
route.get("/log-out", userController.logOut);
module.exports = route;
