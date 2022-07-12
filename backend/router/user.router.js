const route = require("express").Router();
const userController = require("../controller/user.controller");

route.get("/user", userController.index);
route.post("/user", userValidate, userController.store);
route.get("/user/:id", userParamsValidate, userController.show);
route.put("/user/:id", userParamsValidate, userValidate, userController.update);
route.delete("/user/:id", userParamsValidate, userController.destroy);

module.exports = route;
