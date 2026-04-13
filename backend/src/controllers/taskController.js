const { validationResult } = require("express-validator");
const Task = require("../models/Task");
const Project = require("../models/Project");

const verifyProjectOwnership = async (projectId, userId) => {
  const project = await Project.findOne({ _id: projectId, createdBy: userId });
  return project;
};

const addTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, message: errors.array()[0].msg });
    }

    const project = await verifyProjectOwnership(
      req.params.projectId,
      req.user._id,
    );
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found." });
    }

    const { title, description, status, priority, dueDate } = req.body;
    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate: dueDate || null,
      projectId: req.params.projectId,
      createdBy: req.user._id,
    });

    res.status(201).json({ success: true, message: "Task added!", data: task });
  } catch (error) {
    next(error);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const project = await verifyProjectOwnership(
      req.params.projectId,
      req.user._id,
    );
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found." });
    }

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Filtering
    const filter = { projectId: req.params.projectId };
    if (req.query.status) filter.status = req.query.status;
    if (req.query.priority) filter.priority = req.query.priority;

    const totalTasks = await Task.countDocuments(filter);
    const tasks = await Task.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      data: tasks,
      pagination: {
        total: totalTasks,
        page,
        limit,
        totalPages: Math.ceil(totalTasks / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, message: errors.array()[0].msg });
    }

    const project = await verifyProjectOwnership(
      req.params.projectId,
      req.user._id,
    );
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found." });
    }

    const { title, description, status, priority, dueDate } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.taskId, projectId: req.params.projectId },
      { title, description, status, priority, dueDate },
      { new: true, runValidators: true },
    );

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found." });
    }

    res.json({ success: true, message: "Task updated!", data: task });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const project = await verifyProjectOwnership(
      req.params.projectId,
      req.user._id,
    );
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found." });
    }

    const task = await Task.findOneAndDelete({
      _id: req.params.taskId,
      projectId: req.params.projectId,
    });

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found." });
    }

    res.json({ success: true, message: "Task deleted successfully." });
  } catch (error) {
    next(error);
  }
};

module.exports = { addTask, getTasks, updateTask, deleteTask };
