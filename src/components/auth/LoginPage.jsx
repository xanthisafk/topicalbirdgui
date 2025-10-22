import axios from "axios";
import { API_BASE_URL } from "../../../topicalbirdconfig";
import { useState } from "react";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const logIn = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;
    const rememberMe = event.target.rememberme.checked;

    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/api/Auth/login`,
        { email, password, rememberMe },
        { withCredentials: true } // if using cookies
      );

      console.log(data);
      localStorage.setItem("topicalbird_current_user", JSON.stringify(data.content));
      window.location.href = "/";
    } catch (ex) {
      console.error(ex);
      setError(ex.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh",
    }}>
      <form
        onSubmit={logIn}
        style={{
          backgroundColor: "var(--color-slate-800)",
          padding: "2rem",
          borderRadius: "1rem",
          width: "320px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          display: "flex",
          flexDirection: "column",
          gap: "1rem"
        }}
      >
        <h2 style={{
          fontFamily: "var(--font-heading)",
          color: "var(--text-color)",
          textAlign: "center"
        }}>Login</h2>

        {error && <div style={{ color: "red", textAlign: "center" }}>{error}</div>}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email..."
          style={{ padding: "0.5rem", borderRadius: "0.5rem", border: "none" }}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password..."
          style={{ padding: "0.5rem", borderRadius: "0.5rem", border: "none" }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input id="rememberme" name="rememberme" type="checkbox" />
          <label htmlFor="rememberme">Remember Me</label>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "0.75rem",
            borderRadius: "0.5rem",
            backgroundColor: "var(--accent-color)",
            color: "#fff",
            fontWeight: "600",
            cursor: "pointer",
            transition: "transform 0.2s"
          }}
          onMouseOver={e => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
