const route = require("express").Router();
const authController = require("../controller/auth.controller");
const { registerValidation } = require("../middleware/auth.validate");

route.get("/auth", authController.index);
route.post("/register", registerValidation, authController.register);

module.exports = route;
