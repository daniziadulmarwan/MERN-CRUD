const route = require("express").Router();
const studentController = require("../controller/student.controller");

route.get("/student", studentController.index);
route.post("/student", studentController.store);
route.get("/student/:id", studentController.show);
route.put("/student/:id", studentController.update);
route.delete("/student/:id", studentController.destroy);

module.exports = route;
