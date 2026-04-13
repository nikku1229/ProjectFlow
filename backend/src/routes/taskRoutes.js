const express = require("express");
const { body } = require("express-validator");
const {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const { protect } = require("../middleware/auth");

const router = express.Router({ mergeParams: true });

const taskValidation = [
  body("title").trim().notEmpty().withMessage("Task title is required"),
  body("status")
    .optional()
    .isIn(["todo", "in-progress", "completed"])
    .withMessage("Invalid status"),
  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Invalid priority"),
];

router.use(protect);

router.route("/").get(getTasks).post(taskValidation, addTask);
router.route("/:taskId").put(taskValidation, updateTask).delete(deleteTask);

module.exports = router;
