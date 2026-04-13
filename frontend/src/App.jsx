import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ProjectProvider } from "./context/ProjectContext";
import { ToastProvider } from "./components/Toast";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProjectDetail from "./pages/ProjectDetail";
import "./index.css";

function AppContent() {
  const { user, loading } = useAuth();
  const [authPage, setAuthPage] = useState("login");
  const [currentProject, setCurrentProject] = useState(null);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <span
            className="spinner"
            style={{ width: 40, height: 40, borderWidth: 3 }}
          />
          <p style={{ marginTop: 16, color: "var(--text2)" }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return authPage === "login" ? (
      <Login onSwitch={() => setAuthPage("register")} />
    ) : (
      <Register onSwitch={() => setAuthPage("login")} />
    );
  }

  if (currentProject) {
    return (
      <ProjectDetail
        project={currentProject}
        onBack={() => setCurrentProject(null)}
      />
    );
  }

  return <Dashboard onOpenProject={setCurrentProject} />;
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <ProjectProvider>
          <AppContent />
        </ProjectProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
