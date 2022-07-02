const route = require("express").Router();
const employeController = require("../controller/employe.controller");

route.get("/employe", employeController.index);

module.exports = route;
