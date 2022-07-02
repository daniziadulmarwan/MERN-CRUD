const express = require("express");
const cors = require("cors");
const fileupload = require("express-fileupload");

const app = express();

const UserRouter = require("./router/user.router");
const StudentRouter = require("./router/student.router");
const TeacherRouter = require("./router/teacher.router");
const EmployeRouter = require("./router/employe.router");

app.use(cors());
app.use(express.json());
app.use(fileupload());
app.use(express.static("public"));

app.use("/api", UserRouter);
app.use("/api", StudentRouter);
app.use("/api", TeacherRouter);
app.use("/api", EmployeRouter);

app.listen(5000, () => console.log("Server running"));
