import { useAuth } from "../context/AuthContext";
import { useToast } from "./Toast";
import Logo from "../assets/Favicon.png";

export default function Navbar({ onBack, backLabel }) {
  const { user, logout } = useAuth();
  const { showToast } = useToast();

  const handleLogout = () => {
    logout();
    showToast("Logged out successfully");
  };

  return (
    <nav
      style={{
        background: "var(--bg2)",
        borderBottom: "1px solid var(--border)",
        padding: "0 24px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {onBack && (
          <button className="btn-icon" onClick={onBack} title="Back">
            ←
          </button>
        )}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <span>
            <img
              src={Logo}
              alt="Logo"
              style={{
                width: "25px",
                height: "25px",
                alignSelf: "center",
                marginTop: "7px",
              }}
            />
          </span>
          <span
            style={{ fontWeight: 700, fontSize: "16px", color: "var(--text)" }}
          >
            {onBack ? backLabel || "Back" : "ProjectFlow"}
          </span>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            background: "var(--bg3)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            padding: "6px 14px",
            fontSize: "13px",
            color: "var(--text2)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              width: 28,
              height: 28,
              background: "var(--primary)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {user?.name?.[0]?.toUpperCase()}
          </span>
          <span style={{ color: "var(--text)" }}>{user?.name}</span>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
