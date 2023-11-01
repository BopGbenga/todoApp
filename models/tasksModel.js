const mongoose = require("mongoose");

const Schema = mongoose.schema;

const taskSchema = new mongoose.Schema({
  task_name: {
    type: String,
  },
  state: {
    type: String,
    enum: ["completed", "pending"],
    default: "pending",
  },
  user_id: { type: mongoose.Schema.ObjectId, ref: "user" },
});

const taskModel = mongoose.model("tasks", taskSchema);

module.exports = taskModel;
