import React, { useState } from "react";
import axios from "axios";
import DepartmentSelector from "../components/DepartmentSelector.jsx";

function AddStudent() {
  const [form, setForm] = useState({
    rollNo: "",
    name: "",
    dob: "",
    department: "CSE",
    year: "1",
    semester: "I"
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDepartmentChange = (dept) => {
    setForm({ ...form, department: dept });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      await axios.post("/api/admin/students", form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage("Student added successfully!");
      setForm({ rollNo: "", name: "", dob: "", department: "CSE", year: "1", semester: "I" });
    } catch (err) {
      setMessage(err.response?.data?.message || "Error adding student");
    }
  };

  const years = ["1", "2", "3", "4"];
  const semesters = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <form 
        onSubmit={handleSubmit} 
        style={{
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(12px)",
          borderRadius: "2rem",
          padding: "2rem",
          maxWidth: "400px",
          width: "100%",
          boxShadow: "0 12px 36px rgba(0,0,0,0.25)",
          display: "flex",
          flexDirection: "column",
          gap: "1rem"
        }}
      >
        <input 
          type="text" 
          name="rollNo" 
          placeholder="Roll Number" 
          value={form.rollNo} 
          onChange={handleChange} 
          required 
          style={{ padding: "0.5rem 1rem", borderRadius: "1rem", border: "none", outline: "none" }}
        />
        <input 
          type="text" 
          name="name" 
          placeholder="Name" 
          value={form.name} 
          onChange={handleChange} 
          required 
          style={{ padding: "0.5rem 1rem", borderRadius: "1rem", border: "none", outline: "none" }}
        />
        <input 
          type="text" 
          name="dob" 
          placeholder="DOB (DD-MM-YYYY)" 
          value={form.dob} 
          onChange={handleChange} 
          required 
          style={{ padding: "0.5rem 1rem", borderRadius: "1rem", border: "none", outline: "none" }}
        />

        {/* Department Selector */}
        <DepartmentSelector value={form.department} onChange={handleDepartmentChange} />

        {/* Year Dropdown */}
        <select
          name="year"
          value={form.year}
          onChange={handleChange}
          required
          style={{ padding: "0.5rem 1rem", borderRadius: "1rem", border: "none", outline: "none" }}
        >
          {years.map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        {/* Semester Dropdown */}
        <select
          name="semester"
          value={form.semester}
          onChange={handleChange}
          required
          style={{ padding: "0.5rem 1rem", borderRadius: "1rem", border: "none", outline: "none" }}
        >
          {semesters.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <button 
          type="submit" 
          style={{
            padding: "0.7rem 1rem",
            borderRadius: "1.5rem",
            border: "none",
            fontWeight: "bold",
            background: "rgba(59, 130, 246, 0.5)",
            color: "#fff",
            cursor: "pointer",
            transition: "all 0.3s ease"
          }}
          onMouseOver={e => e.currentTarget.style.background = "rgba(59, 130, 246, 0.7)"}
          onMouseOut={e => e.currentTarget.style.background = "rgba(59, 130, 246, 0.5)"}
        >
          Add Student
        </button>

        {message && (
          <p style={{ color: "limegreen", textAlign: "center", fontWeight: "bold" }}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default AddStudent;
