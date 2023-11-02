const express = require("express");
const mongoose = require("mongoose");
const db = require("./db");
const cookieParser = require("cookie-parser");
const userRouter = require("./users/userrouter");
const bodyParser = require("body-parser");
const viewsRouter = require("./views/views.router");
const auth = require("./Authentication/auth");
const taskModel = require("./models/tasksModel");
const taskRouter = require("./tasks/tasksRoute");
const overRide = require("method-override");

require("dotenv").config();

const PORT = process.env.PORT;

const app = express();
//connecting to mongoDB
db.connect();

app.use(express.json()); //bodyparser
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use("/views", viewsRouter);

app.use(express.static("public"));
app.use(cookieParser());
app.use(overRide("_method"));

app.use("/users", userRouter);
app.use("/task", auth.ensureLogin, taskRouter);

app.get("/", (req, res) => {
  res.render("index", { navs: ["Signup", "Login", "Home"] });
});

app.get("/home", (req, res) => {
  res.render("index", { navs: ["Signup", "Login", "Home"] });
});

app.get("/signup", (req, res) => {
  res.render("signup", { navs: ["Login", "Home"] || null, errorMessage: null });
});

app.get("/login", (req, res) => {
  res.render("login", { navs: ["Signup", "Home"] || null, errorMessage: null });
});

app.get("/dashboard", auth.ensureLogin, async (req, res) => {
  const taskInfo = await taskModel.find({ user_id: res.locals.user._id });
  res.render("dashboard", {
    navs: ["AddTask", "Logout", "Home"],
    user: res.locals.user,
    taskInfo,
    date: new Date(),
  });
});

app.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.render("index", { navs: ["Login", "Home"] });
});

app.get("/AddTask", auth.ensureLogin, (req, res) => {
  res.render("AddTask", { navs: ["Dashboard", "Logout"] });
});

app.listen(PORT, () => {
  console.log(`server started successsfully `);
});
