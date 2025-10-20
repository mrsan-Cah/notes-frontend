import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DepartmentSelector from "../components/DepartmentSelector.jsx";

function AdminRegister() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    department: "CSE",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleDepartmentChange = (dept) => setForm({ ...form, department: dept });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/admin-register", form);
      setMessage("Admin registered successfully! Redirecting to login...");
      setError("");
      setForm({ username: "", password: "", department: "CSE" });
      setTimeout(() => navigate("/admin-login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      setMessage("");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #667eea, #764ba2)",
      padding: "1rem",
      fontFamily: "'Poppins', sans-serif"
    }}>
      <div style={{
        background: "#fff",
        borderRadius: "2rem",
        padding: "3rem 2rem",
        width: "100%",
        maxWidth: "420px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        position: "relative",
      }}>
        {/* Header */}
        <h2 style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          background: "linear-gradient(90deg, #667eea, #764ba2)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textAlign: "center",
          marginBottom: "1rem"
        }}>
          Admin Registration
        </h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Username Input */}
          <div style={{ position: "relative" }}>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "1rem",
                borderRadius: "1rem",
                border: "1px solid #D1D5DB",
                outline: "none",
                transition: "all 0.3s",
                fontSize: "1rem",
              }}
              onFocus={e => e.target.style.borderColor = "#667eea"}
              onBlur={e => e.target.style.borderColor = "#D1D5DB"}
            />
            <label style={{
              position: "absolute",
              top: "-0.8rem",
              left: "1rem",
              background: "#fff",
              padding: "0 0.25rem",
              fontSize: "0.85rem",
              color: "#6B7280",
              fontWeight: "600"
            }}>Username</label>
          </div>

          {/* Password Input */}
          <div style={{ position: "relative" }}>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "1rem",
                borderRadius: "1rem",
                border: "1px solid #D1D5DB",
                outline: "none",
                transition: "all 0.3s",
                fontSize: "1rem",
              }}
              onFocus={e => e.target.style.borderColor = "#667eea"}
              onBlur={e => e.target.style.borderColor = "#D1D5DB"}
            />
            <label style={{
              position: "absolute",
              top: "-0.8rem",
              left: "1rem",
              background: "#fff",
              padding: "0 0.25rem",
              fontSize: "0.85rem",
              color: "#6B7280",
              fontWeight: "600"
            }}>Password</label>
          </div>

          {/* Department Selector */}
          <div style={{ textAlign: "left" }}>
            <label style={{ fontWeight: "600", color: "#374151", marginBottom: "0.5rem", display: "block" }}>
              Department
            </label>
            <DepartmentSelector value={form.department} onChange={handleDepartmentChange} />
          </div>

          {/* Messages */}
          {message && <p style={{ color: "green", fontWeight: "600", textAlign: "center" }}>{message}</p>}
          {error && <p style={{ color: "red", fontWeight: "600", textAlign: "center" }}>{error}</p>}

          {/* Submit Button */}
          <button type="submit" style={{
            padding: "1rem",
            borderRadius: "1rem",
            background: "linear-gradient(90deg, #667eea, #764ba2)",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1rem",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s",
            boxShadow: "0 8px 16px rgba(0,0,0,0.2)"
          }}
          onMouseOver={e => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.3)";
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.2)";
          }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminRegister;
