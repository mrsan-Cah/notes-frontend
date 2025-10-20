import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import DepartmentSelector from "../components/DepartmentSelector.jsx";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("CSE");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/admin-login", {
        username,
        password,
        department,
      });
      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("adminDept", res.data.department);
      navigate("/admin-dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Poppins', sans-serif",
      background: "linear-gradient(135deg, #667eea, #764ba2, #ff758c)",
      backgroundSize: "300% 300%",
      animation: "gradientBG 12s ease infinite",
      overflow: "hidden",
    },
    fadeIn: {
      opacity: fadeIn ? 1 : 0,
      transition: "opacity 1s ease",
    },
    card: {
      background: "rgba(255,255,255,0.1)",
      borderRadius: "2rem",
      padding: "3rem 2.5rem",
      width: "100%",
      maxWidth: "28rem",
      textAlign: "center",
      backdropFilter: "blur(20px)",
      boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
      border: "1px solid rgba(255,255,255,0.25)",
      transform: "translateY(0)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    title: {
      fontSize: "3rem",
      fontWeight: "900",
      color: "#fff",
      marginBottom: "2rem",
      textShadow: "0 6px 12px rgba(0,0,0,0.3)",
    },
    input: {
      border: "1px solid rgba(255,255,255,0.3)",
      borderRadius: "1rem",
      padding: "0.75rem 1rem",
      fontSize: "1rem",
      outline: "none",
      width: "100%",
      background: "rgba(255,255,255,0.15)",
      color: "#fff",
      backdropFilter: "blur(5px)",
    },
    button: {
      background: "linear-gradient(135deg, #43cea2, #185a9d)",
      color: "#fff",
      padding: "0.85rem 2rem",
      borderRadius: "1rem",
      fontWeight: "700",
      fontSize: "1.1rem",
      cursor: "pointer",
      border: "none",
      width: "100%",
      marginTop: "0.5rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "0.5rem",
      boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
      transition: "all 0.3s ease",
    },
    buttonHover: {
      transform: "scale(1.05)",
      boxShadow: "0 12px 25px rgba(0,0,0,0.35)",
    },
    linkText: {
      marginTop: "1rem",
      fontSize: "0.9rem",
      color: "rgba(255,255,255,0.85)",
    },
    link: {
      color: "#00f6ff",
      textDecoration: "underline",
    },
    error: {
      color: "#ff4d6d",
      fontSize: "0.9rem",
      marginTop: "0.5rem",
    },
    floatingBG: {
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      zIndex: 0,
      overflow: "hidden",
      pointerEvents: "none",
    },
    circle: (size, x, y, delay, color) => ({
      position: "absolute",
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: "50%",
      background: color,
      top: `${y}%`,
      left: `${x}%`,
      animation: `floatCircle 10s ease-in-out ${delay}s infinite alternate`,
      opacity: 0.4,
      zIndex: 0,
    }),
    "@keyframes floatCircle": {
      "0%": { transform: "translateY(0px)" },
      "100%": { transform: "translateY(-50px)" },
    },
    "@keyframes gradientBG": {
      "0%": { backgroundPosition: "0% 50%" },
      "50%": { backgroundPosition: "100% 50%" },
      "100%": { backgroundPosition: "0% 50%" },
    },
  };

  const handleHover = (e) => (e.currentTarget.style.transform = "scale(1.05)");
  const handleLeave = (e) => (e.currentTarget.style.transform = "scale(1)");

  return (
    <div style={styles.container}>
      {/* Floating circles background */}
      <div style={styles.floatingBG}>
        <div style={styles.circle(100, 10, 20, 0, "#ffffff")} />
        <div style={styles.circle(80, 70, 50, 2, "#ff69b4")} />
        <div style={styles.circle(60, 40, 80, 4, "#00ffff")} />
      </div>

      <div style={{ ...styles.card, ...styles.fadeIn }}>
        <h2 style={styles.title}>Admin Login</h2>
        <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }} onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <DepartmentSelector value={department} onChange={setDepartment} />
          {error && <p style={styles.error}>{error}</p>}

          <button
            type="submit"
            style={styles.button}
            onMouseOver={handleHover}
            onMouseOut={handleLeave}
          >
            🔒 Login
          </button>
        </form>

        <p style={styles.linkText}>
          Don't have an account?{" "}
          <Link to="/admin-register" style={styles.link}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
