const express = require("express");
const cors = require("cors");
const fileupload = require("express-fileupload");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const app = express();
dotenv.config();

const AuthRouter = require("./router/auth.router");
const UserRouter = require("./router/user.router");
const StudentRouter = require("./router/student.router");
const TeacherRouter = require("./router/teacher.router");
const EmployeRouter = require("./router/employe.router");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use(fileupload());
app.use(express.static("public"));

app.use("/api", AuthRouter);
app.use("/api", UserRouter);
app.use("/api", StudentRouter);
app.use("/api", TeacherRouter);
app.use("/api", EmployeRouter);

app.listen(5000, () => console.log("Server running"));
