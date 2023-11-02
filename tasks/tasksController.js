const taskModel = require("../models/tasksModel");

const createTask = async (task, user_id) => {
  try {
    const taskbody = task;
    const newTask = new taskModel();
    newTask.task_name = taskbody.task_name;
    newTask.user_id = user_id;
    const save = await newTask.save();
    return {
      status: "success",
      code: 201,
      message: "Task Created Successfully",
      data: save,
    };
  } catch (error) {
    return {
      status: "error",
      code: 422,
      data: error.message,
    };
  }
};

const getTask = async (user_id) => {
  try {
    const tasks = await taskModel.find({ user_id: user_id });
    if (!tasks || tasks.length === 0) {
      return {
        status: "error",
        data: "No task for the user",
      };
    }
    return {
      status: "success",
      data: tasks,
    };
  } catch (error) {
    return {
      status: "error",
      data: error.message,
    };
  }
};

const updateTask = async (user_id, taskId) => {
  try {
    const tasks = await taskModel.findByIdAndUpdate(
      { _id: taskId },
      { state: "COMPLETED" }
    );
    if (!tasks) {
      return {
        message: "Task not found",
        code: 404,
      };
    }
    return {
      code: 200,
      data: tasks,
    };
  } catch (error) {
    return {
      data: error,
      code: 500,
    };
  }
};
const deleteTask = async (user_id, taskId) => {
  try {
    const tasks = await taskModel.findByIdAndDelete({ _id: taskId });
    if (!tasks) {
      return {
        code: 404,
        data: "tasks not found",
      };
    }
    return {
      code: 200,
      data: tasks,
    };
  } catch (error) {
    return {
      data: error,
      code: 500,
    };
  }
};

module.exports = { createTask, getTask, updateTask, deleteTask };
