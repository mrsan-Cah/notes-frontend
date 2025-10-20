import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiUser, FiCalendar, FiLock } from "react-icons/fi";

function StudentLogin() {
  const [rollNo, setRollNo] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/student-login", { rollNo, dob });
      localStorage.setItem("studentData", JSON.stringify(res.data));
      navigate("/student-dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #c3bdf7, #e0b0ff, #ffc0cb)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const cardStyle = {
    position: "relative",
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "#fff",
    borderRadius: "30px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    padding: "40px 30px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    transform: "scale(1)",
    transition: "transform 0.3s",
  };

  const cardHover = {
    transform: "scale(1.03)",
  };

  const titleStyle = {
    fontSize: "32px",
    fontWeight: "800",
    color: "#4f46e5",
    textAlign: "center",
  };

  const subtitleStyle = {
    fontSize: "14px",
    color: "#6b7280",
    textAlign: "center",
  };

  const inputContainer = {
    display: "flex",
    alignItems: "center",
    border: "1px solid #d1d5db",
    borderRadius: "25px",
    padding: "10px 15px",
    transition: "all 0.2s",
  };

  const inputStyle = {
    border: "none",
    outline: "none",
    flex: 1,
    fontSize: "14px",
  };

  const buttonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    backgroundColor: "#4f46e5",
    color: "#fff",
    fontWeight: "600",
    padding: "12px",
    borderRadius: "25px",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    transition: "all 0.3s",
  };

  const buttonHover = {
    backgroundColor: "#4338ca",
  };

  const errorStyle = {
    color: "red",
    textAlign: "center",
    fontSize: "14px",
  };

  const circleStyleTop = {
    position: "absolute",
    top: "-40px",
    left: "-40px",
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    backgroundColor: "rgba(168, 85, 247, 0.3)",
    animation: "pulse 2s infinite",
  };

  const circleStyleBottom = {
    position: "absolute",
    bottom: "-50px",
    right: "-50px",
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 192, 203, 0.3)",
    animation: "pulse 2s infinite",
  };

  return (
    <div style={containerStyle}>
      <div
        style={cardStyle}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <h2 style={titleStyle}>Welcome Back</h2>
        <p style={subtitleStyle}>Login to access your student dashboard</p>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={inputContainer}
            onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 2px rgba(79, 70, 229, 0.5)")}
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            <FiUser size={20} color="#9ca3af" style={{ marginRight: "10px" }} />
            <input
              type="text"
              placeholder="Roll Number"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              style={inputStyle}
              required
            />
          </div>

          <div
            style={inputContainer}
            onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 2px rgba(79, 70, 229, 0.5)")}
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            <FiCalendar size={20} color="#9ca3af" style={{ marginRight: "10px" }} />
            <input
              type="text"
              placeholder="Date of Birth (DD-MM-YYYY)"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              style={inputStyle}
              required
            />
          </div>

          {error && <p style={errorStyle}>{error}</p>}

          <button
            type="submit"
            style={buttonStyle}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#4338ca")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4f46e5")}
          >
            <FiLock size={18} /> Login
          </button>
        </form>

        <div style={circleStyleTop}></div>
        <div style={circleStyleBottom}></div>

        {/* Internal keyframes for pulse */}
        <style>
          {`
            @keyframes pulse {
              0% { transform: scale(1); opacity: 0.6; }
              50% { transform: scale(1.1); opacity: 0.8; }
              100% { transform: scale(1); opacity: 0.6; }
            }
          `}
        </style>
      </div>
    </div>
  );
}

export default StudentLogin;
