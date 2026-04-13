const { validationResult } = require("express-validator");
const Project = require("../models/Project");
const Task = require("../models/Task");

const createProject = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, message: errors.array()[0].msg });
    }

    const { projectName, description } = req.body;
    const project = await Project.create({
      projectName,
      description,
      createdBy: req.user._id,
    });

    res
      .status(201)
      .json({ success: true, message: "Project created!", data: project });
  } catch (error) {
    next(error);
  }
};

const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ createdBy: req.user._id }).sort({
      createdAt: -1,
    });

    // Add task count to each project
    const projectsWithCount = await Promise.all(
      projects.map(async (project) => {
        const taskCount = await Task.countDocuments({ projectId: project._id });
        return { ...project.toObject(), taskCount };
      }),
    );

    res.json({
      success: true,
      count: projects.length,
      data: projectsWithCount,
    });
  } catch (error) {
    next(error);
  }
};

const getProject = async (req, res, next) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found." });
    }

    res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, message: errors.array()[0].msg });
    }

    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      { projectName: req.body.projectName, description: req.body.description },
      { new: true, runValidators: true },
    );

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found." });
    }

    res.json({ success: true, message: "Project updated!", data: project });
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found." });
    }

    // Delete all tasks in the project
    await Task.deleteMany({ projectId: req.params.id });

    res.json({
      success: true,
      message: "Project and its tasks deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
};
