import { useState, useEffect, useCallback } from "react";
import { taskAPI } from "../services/api";
import { useToast } from "../components/Toast";
import Navbar from "../components/Navbar";
import TaskModal from "../components/TaskModal";

const STATUS_MAP = {
  todo: { label: "To Do", class: "badge-todo", icon: "📋" },
  "in-progress": {
    label: "In Progress",
    class: "badge-inprogress",
    icon: "🔄",
  },
  completed: { label: "Completed", class: "badge-completed", icon: "✅" },
};
const PRIORITY_MAP = {
  low: { label: "Low", class: "badge-low" },
  medium: { label: "Medium", class: "badge-medium" },
  high: { label: "High", class: "badge-high" },
};

export default function ProjectDetail({ project, onBack }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const { showToast } = useToast();
  const LIMIT = 8;

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: LIMIT };
      if (filterStatus) params.status = filterStatus;
      const data = await taskAPI.getAll(project._id, params);
      setTasks(data.data);
      setPagination(data.pagination);
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  }, [project._id, page, filterStatus]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);
  useEffect(() => {
    setPage(1);
  }, [filterStatus]);

  const handleAdd = async (form) => {
    await taskAPI.create(project._id, form);
    showToast("Task added! ✅");
    fetchTasks();
  };

  const handleUpdate = async (form) => {
    await taskAPI.update(project._id, editTask._id, form);
    showToast("Task updated!");
    setEditTask(null);
    fetchTasks();
  };

  const handleDelete = async () => {
    await taskAPI.delete(project._id, deleteConfirm._id);
    showToast("Task deleted.");
    setDeleteConfirm(null);
    fetchTasks();
  };

  const handleStatusChange = async (task, newStatus) => {
    try {
      await taskAPI.update(project._id, task._id, {
        ...task,
        status: newStatus,
      });
      showToast(`Status updated to "${newStatus}"!`);
      fetchTasks();
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  const counts = { todo: 0, "in-progress": 0, completed: 0 };
  tasks.forEach((t) => {
    if (counts[t.status] !== undefined) counts[t.status]++;
  });

  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar onBack={onBack} backLabel="Projects" />

      <div
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 24px" }}
      >
        {/* Project header */}
        <div
          className="card fade-in"
          style={{
            marginBottom: "28px",
            background: "linear-gradient(135deg, var(--bg2), var(--bg3))",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "24px",
                  fontWeight: 800,
                  marginBottom: "6px",
                }}
              >
                {project.projectName}
              </h1>
              <p
                style={{
                  color: "var(--text2)",
                  fontSize: "14px",
                  maxWidth: "600px",
                }}
              >
                {project.description || "No description provided."}
              </p>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => setShowAdd(true)}
            >
              + Add Task
            </button>
          </div>

          {/* Status counters */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "20px",
              flexWrap: "wrap",
            }}
          >
            {Object.entries(STATUS_MAP).map(([key, s]) => (
              <div
                key={key}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "var(--bg)",
                  borderRadius: "8px",
                  padding: "8px 14px",
                  border: "1px solid var(--border)",
                }}
              >
                <span>{s.icon}</span>
                <span style={{ fontSize: "13px", color: "var(--text2)" }}>
                  {s.label}
                </span>
                <span style={{ fontSize: "15px", fontWeight: 700 }}>
                  {counts[key]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Filter bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{ fontSize: "13px", color: "var(--text2)", fontWeight: 500 }}
          >
            Filter:
          </span>
          {["", "todo", "in-progress", "completed"].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className="btn btn-sm"
              style={{
                background:
                  filterStatus === s ? "var(--primary)" : "var(--bg3)",
                color: filterStatus === s ? "white" : "var(--text2)",
                border: `1px solid ${filterStatus === s ? "var(--primary)" : "var(--border)"}`,
              }}
            >
              {s === "" ? "All Tasks" : STATUS_MAP[s].label}
            </button>
          ))}
          {pagination && (
            <span
              style={{
                marginLeft: "auto",
                fontSize: "12px",
                color: "var(--text2)",
              }}
            >
              {pagination.total} task{pagination.total !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Tasks */}
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "60px",
            }}
          >
            <span
              className="spinner"
              style={{ width: 36, height: 36, borderWidth: 3 }}
            />
          </div>
        ) : tasks.length === 0 ? (
          <div className="empty-state">
            <div className="icon">📝</div>
            <h3>
              {filterStatus ? "No tasks with this status" : "No tasks yet"}
            </h3>
            <p>
              {filterStatus
                ? "Try a different filter"
                : "Add your first task to get started"}
            </p>
            {!filterStatus && (
              <button
                className="btn btn-primary"
                onClick={() => setShowAdd(true)}
              >
                Add Task
              </button>
            )}
          </div>
        ) : (
          <>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="card fade-in"
                  style={{
                    padding: "16px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "var(--primary)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "var(--border)")
                  }
                >
                  {/* Status toggle */}
                  <div style={{ position: "relative" }}>
                    <select
                      value={task.status}
                      onChange={(e) => handleStatusChange(task, e.target.value)}
                      className="badge"
                      style={{
                        cursor: "pointer",
                        border: "none",
                        outline: "none",
                        appearance: "none",
                        padding: "4px 10px",
                        borderRadius: "20px",
                        fontWeight: 600,
                        fontSize: "11px",
                        background:
                          task.status === "completed"
                            ? "rgba(34,211,160,0.15)"
                            : task.status === "in-progress"
                              ? "rgba(56,189,248,0.15)"
                              : "rgba(139,147,184,0.15)",
                        color:
                          task.status === "completed"
                            ? "var(--success)"
                            : task.status === "in-progress"
                              ? "var(--info)"
                              : "var(--text2)",
                      }}
                    >
                      <option value="todo">📋 To Do</option>
                      <option value="in-progress">🔄 In Progress</option>
                      <option value="completed">✅ Done</option>
                    </select>
                  </div>

                  {/* Task info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: "14px",
                        textDecoration:
                          task.status === "completed" ? "line-through" : "none",
                        opacity: task.status === "completed" ? 0.6 : 1,
                      }}
                    >
                      {task.title}
                    </div>
                    {task.description && (
                      <div
                        style={{
                          fontSize: "12px",
                          color: "var(--text2)",
                          marginTop: "2px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {task.description}
                      </div>
                    )}
                  </div>

                  {/* Priority badge */}
                  <span
                    className={`badge ${PRIORITY_MAP[task.priority]?.class}`}
                  >
                    {PRIORITY_MAP[task.priority]?.label}
                  </span>

                  {/* Due date */}
                  {task.dueDate && (
                    <span
                      style={{
                        fontSize: "12px",
                        color:
                          new Date(task.dueDate) < new Date() &&
                          task.status !== "completed"
                            ? "var(--danger)"
                            : "var(--text2)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      📅{" "}
                      {new Date(task.dueDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  )}

                  {/* Actions */}
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button
                      className="btn-icon"
                      onClick={() => setEditTask(task)}
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      className="btn-icon"
                      onClick={() => setDeleteConfirm(task)}
                      title="Delete"
                      style={{ color: "var(--danger)" }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  marginTop: "24px",
                }}
              >
                <button
                  className="btn btn-ghost btn-sm"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  ← Prev
                </button>
                <span style={{ fontSize: "13px", color: "var(--text2)" }}>
                  Page {page} of {pagination.totalPages}
                </span>
                <button
                  className="btn btn-ghost btn-sm"
                  disabled={page >= pagination.totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {showAdd && (
        <TaskModal onClose={() => setShowAdd(false)} onSubmit={handleAdd} />
      )}
      {editTask && (
        <TaskModal
          onClose={() => setEditTask(null)}
          onSubmit={handleUpdate}
          editData={editTask}
        />
      )}

      {deleteConfirm && (
        <div className="modal-overlay">
          <div className="modal" style={{ maxWidth: "360px" }}>
            <div style={{ textAlign: "center", padding: "8px 0 24px" }}>
              <div style={{ fontSize: "44px", marginBottom: "12px" }}>🗑️</div>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  marginBottom: "8px",
                }}
              >
                Delete Task?
              </h3>
              <p style={{ color: "var(--text2)", fontSize: "14px" }}>
                <strong style={{ color: "var(--text)" }}>
                  {deleteConfirm.title}
                </strong>{" "}
                will be permanently deleted.
              </p>
            </div>
            <div
              style={{ display: "flex", gap: "10px", justifyContent: "center" }}
            >
              <button
                className="btn btn-ghost"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
