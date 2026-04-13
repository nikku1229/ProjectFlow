import { useEffect, useState } from "react";
import { useProjects } from "../context/ProjectContext";
import { useToast } from "../components/Toast";
import Navbar from "../components/Navbar";
import ProjectModal from "../components/ProjectModal";

const COLORS = [
  "#6c63ff",
  "#22d3a0",
  "#f59e0b",
  "#ef4444",
  "#38bdf8",
  "#a78bfa",
  "#fb923c",
];

export default function Dashboard({ onOpenProject }) {
  const {
    projects,
    loading,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
  } = useProjects();
  const { showToast } = useToast();
  const [showCreate, setShowCreate] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async (form) => {
    await createProject(form);
    showToast("Project created!");
  };

  const handleUpdate = async (form) => {
    await updateProject(editProject._id, form);
    showToast("Project updated!");
    setEditProject(null);
  };

  const handleDelete = async () => {
    await deleteProject(deleteConfirm._id);
    showToast("Project deleted.");
    setDeleteConfirm(null);
  };

  const getColor = (index) => COLORS[index % COLORS.length];

  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      <div
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 24px" }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "32px",
          }}
        >
          <div>
            <h1
              style={{ fontSize: "26px", fontWeight: 800, marginBottom: "4px" }}
            >
              My Projects
            </h1>
            <p style={{ color: "var(--text2)", fontSize: "14px" }}>
              {projects.length} project{projects.length !== 1 ? "s" : ""} total
            </p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setShowCreate(true)}
          >
            + New Project
          </button>
        </div>

        {/* Stats row */}
        {projects.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))",
              gap: "16px",
              marginBottom: "32px",
            }}
          >
            {[
              { label: "Total Projects", value: projects.length, icon: "📁" },
              {
                label: "Total Tasks",
                value: projects.reduce((a, p) => a + (p.taskCount || 0), 0),
                icon: "✅",
              },
              { label: "Active", value: projects.length, icon: "🚀" },
            ].map((s) => (
              <div
                key={s.label}
                className="card"
                style={{ display: "flex", alignItems: "center", gap: "14px" }}
              >
                <span style={{ fontSize: "28px" }}>{s.icon}</span>
                <div>
                  <div style={{ fontSize: "22px", fontWeight: 800 }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text2)" }}>
                    {s.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Projects grid */}
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "80px",
            }}
          >
            <span
              className="spinner"
              style={{ width: 36, height: 36, borderWidth: 3 }}
            />
          </div>
        ) : projects.length === 0 ? (
          <div className="empty-state">
            <div className="icon">📁</div>
            <h3>No projects yet</h3>
            <p>Create your first project to get started</p>
            <button
              className="btn btn-primary"
              onClick={() => setShowCreate(true)}
            >
              Create Project
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr))",
              gap: "20px",
            }}
          >
            {projects.map((project, i) => (
              <div
                key={project._id}
                className="card fade-in"
                style={{
                  cursor: "pointer",
                  transition: "all 0.2s",
                  borderTop: `3px solid ${getColor(i)}`,
                  position: "relative",
                }}
                onClick={() => onOpenProject(project)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 30px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "12px",
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: "10px",
                      background: `${getColor(i)}22`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                    }}
                  >
                    📋
                  </div>
                  <div
                    style={{ display: "flex", gap: "6px" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="btn-icon btn-sm"
                      onClick={() => setEditProject(project)}
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      className="btn-icon btn-sm"
                      onClick={() => setDeleteConfirm(project)}
                      title="Delete"
                      style={{ color: "var(--danger)" }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 700,
                    marginBottom: "6px",
                  }}
                >
                  {project.projectName}
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--text2)",
                    marginBottom: "16px",
                    lineHeight: 1.5,
                    minHeight: "38px",
                  }}
                >
                  {project.description || "No description provided."}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: "14px",
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  <span style={{ fontSize: "12px", color: "var(--text2)" }}>
                    🗂 {project.taskCount || 0} task
                    {project.taskCount !== 1 ? "s" : ""}
                  </span>
                  <span style={{ fontSize: "11px", color: "var(--text2)" }}>
                    {new Date(project.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showCreate && (
        <ProjectModal
          onClose={() => setShowCreate(false)}
          onSubmit={handleCreate}
        />
      )}
      {editProject && (
        <ProjectModal
          onClose={() => setEditProject(null)}
          onSubmit={handleUpdate}
          editData={editProject}
        />
      )}

      {/* Delete confirmation */}
      {deleteConfirm && (
        <div className="modal-overlay">
          <div className="modal" style={{ maxWidth: "380px" }}>
            <div style={{ textAlign: "center", padding: "8px 0 24px" }}>
              <div style={{ fontSize: "44px", marginBottom: "12px" }}>🗑️</div>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  marginBottom: "8px",
                }}
              >
                Delete Project?
              </h3>
              <p style={{ color: "var(--text2)", fontSize: "14px" }}>
                <strong style={{ color: "var(--text)" }}>
                  {deleteConfirm.projectName}
                </strong>{" "}
                and all its tasks will be permanently deleted.
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
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
