const express = require("express");
const { body } = require("express-validator");
const {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const { protect } = require("../middleware/auth");

const router = express.Router();

const projectValidation = [
  body("projectName")
    .trim()
    .notEmpty()
    .withMessage("Project name is required")
    .isLength({ min: 2 })
    .withMessage("Project name must be at least 2 characters"),
];

router.use(protect);

router.route("/").get(getProjects).post(projectValidation, createProject);
router
  .route("/:id")
  .get(getProject)
  .put(projectValidation, updateProject)
  .delete(deleteProject);

module.exports = router;
