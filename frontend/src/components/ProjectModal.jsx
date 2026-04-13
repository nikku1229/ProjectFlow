import { useState, useEffect } from "react";
import Modal from "./Modal";

export default function ProjectModal({ onClose, onSubmit, editData }) {
  const [form, setForm] = useState({ projectName: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editData)
      setForm({
        projectName: editData.projectName,
        description: editData.description || "",
      });
  }, [editData]);

  const handleSubmit = async () => {
    if (!form.projectName.trim()) return setError("Project name is required.");
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
      title={editData ? "Edit Project" : "Create New Project"}
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
                {editData ? "Saving..." : "Creating..."}
              </>
            ) : editData ? (
              "Save Changes"
            ) : (
              "Create Project"
            )}
          </button>
        </>
      }
    >
      {error && <div className="error-msg">{error}</div>}
      <div className="form-group">
        <label className="form-label">Project Name *</label>
        <input
          className="form-input"
          placeholder="e.g. E-Commerce App"
          value={form.projectName}
          onChange={(e) => setForm({ ...form, projectName: e.target.value })}
          autoFocus
        />
      </div>
      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          className="form-input"
          placeholder="Brief description of the project..."
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>
    </Modal>
  );
}
