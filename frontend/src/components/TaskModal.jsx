import { useState, useEffect } from "react";
import Modal from "./Modal";

const defaultForm = {
  title: "",
  description: "",
  status: "todo",
  priority: "medium",
  dueDate: "",
};

export default function TaskModal({ onClose, onSubmit, editData }) {
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editData) {
      setForm({
        title: editData.title || "",
        description: editData.description || "",
        status: editData.status || "todo",
        priority: editData.priority || "medium",
        dueDate: editData.dueDate ? editData.dueDate.slice(0, 10) : "",
      });
    }
  }, [editData]);

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async () => {
    if (!form.title.trim()) return setError("Task title is required.");
    setLoading(true);
    setError("");
    try {
      await onSubmit(form);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={editData ? "Edit Task" : "Add New Task"}
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner" />
                {editData ? "Saving..." : "Adding..."}
              </>
            ) : editData ? (
              "Save Changes"
            ) : (
              "Add Task"
            )}
          </button>
        </>
      }
    >
      {error && <div className="error-msg">{error}</div>}
      <div className="form-group">
        <label className="form-label">Task Title *</label>
        <input
          className="form-input"
          placeholder="e.g. Design landing page"
          value={form.title}
          onChange={update("title")}
          autoFocus
        />
      </div>
      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          className="form-input"
          placeholder="Task details..."
          value={form.description}
          onChange={update("description")}
        />
      </div>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}
      >
        <div className="form-group">
          <label className="form-label">Status</label>
          <select
            className="form-input"
            value={form.status}
            onChange={update("status")}
          >
            <option value="todo">📋 To Do</option>
            <option value="in-progress">🔄 In Progress</option>
            <option value="completed">✅ Completed</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Priority</label>
          <select
            className="form-input"
            value={form.priority}
            onChange={update("priority")}
          >
            <option value="low">🟢 Low</option>
            <option value="medium">🟡 Medium</option>
            <option value="high">🔴 High</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Due Date</label>
        <input
          className="form-input"
          type="date"
          value={form.dueDate}
          onChange={update("dueDate")}
          style={{ colorScheme: "dark" }}
        />
      </div>
    </Modal>
  );
}
