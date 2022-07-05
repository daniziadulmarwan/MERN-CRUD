const route = require("express").Router();
const authController = require("../controller/auth.controller");
const refreshToken = require("../controller/refresh.token");
const {
  registerValidation,
  loginValidation,
} = require("../middleware/auth.validate");
const { verifyToken } = require("../middleware/verify.token");

route.get("/auth", verifyToken, authController.index);
route.post("/register", registerValidation, authController.register);
route.post("/login", loginValidation, authController.login);
route.get("/token", refreshToken.index);
route.delete("/logout", authController.logout);

module.exports = route;
