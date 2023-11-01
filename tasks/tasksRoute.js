const express = require("express");
const middleware = require("../users/user.middlewares");
const controllers = require("./tasksController");
const auth = require("../Authentication/auth");
const cookieParser = require("cookie-parser");
const overRide = require("method-override");

const taskRouter = express.Router();

taskRouter.use(cookieParser());
taskRouter.use(overRide("_method"));

taskRouter.post("/create", async (req, res) => {
  const user_id = res.locals.user._id;
  const response = await controllers.createTask(req.body, user_id);
  if (response.code === 201) {
    res.redirect("/dashboard");
  }
});

taskRouter.get("/dashboard", async (req, res) => {
  const user_id = res.locals.user._id;
  const getAll = await controllers.getTask(user_id);
  const taskInfo = Array.isArray(getAll.data) ? getAll.data : [];
  return res.render("/dashboard", { taskInfo, user: res.locals.user });
});

taskRouter.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const userId = res.locals.user._id;
  const updatetask = await controllers.updateTask(userId, id);
  if (updatetask.code === 200) {
    res.redirect("/dashboard");
  }
});

taskRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const userId = res.locals.user_id;
  const response = await controllers.deleteTask(userId, id);
  if (response.code === 200) {
    res.redirect("/dashboard");
  }
});

module.exports = taskRouter;
