import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/Toast";

export default function Login({ onSwitch }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password)
      return setError("All fields are required.");
    setLoading(true);
    setError("");
    try {
      await login(form.email, form.password);
      showToast("Welcome back! 👋");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(108,99,255,0.12) 0%, transparent 70%)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          animation: "fadeIn 0.4s ease",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontSize: "44px", marginBottom: "12px" }}>⚡</div>
          <h1
            style={{ fontSize: "28px", fontWeight: 800, marginBottom: "6px" }}
          >
            ProjectFlow
          </h1>
          <p style={{ color: "var(--text2)", fontSize: "14px" }}>
            Manage your projects efficiently
          </p>
        </div>

        <div className="card" style={{ padding: "32px" }}>
          <h2
            style={{ fontSize: "20px", fontWeight: 700, marginBottom: "24px" }}
          >
            Sign In
          </h2>

          {error && <div className="error-msg">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                className="form-input"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                className="form-input"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
            <button
              className="btn btn-primary w-full"
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                justifyContent: "center",
                marginTop: "8px",
                padding: "12px",
              }}
            >
              {loading ? (
                <>
                  <span className="spinner" /> Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            color: "var(--text2)",
            fontSize: "14px",
          }}
        >
          Don't have an account?{" "}
          <button
            onClick={onSwitch}
            style={{
              background: "none",
              border: "none",
              color: "var(--primary)",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}
