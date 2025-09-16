const express = require("express");
const router = express.Router();

const {
  createTask,
  getAllTask,
  deleteTask,
  suggestTask,
  updateTask
} = require("../Controller/Taskcontroller");

// Create a task
router.post("/create", createTask);

// Get all tasks
router.get("/getTaskList", getAllTask);

// Suggest tasks
router.post("/suggest", suggestTask);

// Delete task by id
router.delete("/delete/:id", deleteTask);
router.put("/update/:id",updateTask);

module.exports = router;
