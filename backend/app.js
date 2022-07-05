const express = require("express");
const cors = require("cors");
const fileupload = require("express-fileupload");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const app = express();
dotenv.config();

const auth_router = require("./router/auth.router");
const user_router = require("./router/user.router");
const student_router = require("./router/student.router");
const teacher_router = require("./router/teacher.router");
const employe_router = require("./router/employe.router");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use(fileupload());
app.use(express.static("public"));

app.use("/api", auth_router);
app.use("/api", user_router);
app.use("/api", student_router);
app.use("/api", teacher_router);
app.use("/api", employe_router);

app.listen(5000, () => console.log("Server running"));
