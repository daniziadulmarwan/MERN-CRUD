const route = require("express").Router();
const teacherController = require("../controller/teacher.controller");

route.get("/teacher", teacherController.index);

module.exports = route;
