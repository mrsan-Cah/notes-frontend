import React, { useState } from "react";
import axios from "axios";
import DepartmentSelector from "../components/DepartmentSelector.jsx";

function UploadNotes() {
  const [form, setForm] = useState({
    title: "",
    department: "CSE",
    year: "",
    semester: "",
    file: null
  });
  const [message, setMessage] = useState("");

  const romanYears = ["I", "II", "III", "IV"];
  const romanSemesters = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

  const romanToNumber = {
    I: 1, II: 2, III: 3, IV: 4,
    V: 5, VI: 6, VII: 7, VIII: 8
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setForm({ ...form, file: e.target.files[0] });
  const handleDepartmentChange = (dept) => setForm({ ...form, department: dept });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.file) return setMessage("Please select a PDF file.");

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("department", form.department);
    formData.append("year", romanToNumber[form.year]);
    formData.append("semester", romanToNumber[form.semester]);
    formData.append("file", form.file);

    try {
      const token = localStorage.getItem("adminToken");
      await axios.post("/api/admin/notes", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
      });
      setMessage("Note uploaded successfully!");
      setForm({ title: "", department: "CSE", year: "", semester: "", file: null });
    } catch (err) {
      setMessage(err.response?.data?.message || "Upload failed");
    }
  };

  // Internal CSS
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "32px 16px",
      minHeight: "100vh",
      backgroundColor: "#f3f4f6",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    form: {
      width: "100%",
      maxWidth: "600px",
      backgroundColor: "#fff",
      borderRadius: "32px",
      padding: "32px 40px",
      display: "flex",
      flexDirection: "column",
      gap: "24px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
      transition: "transform 0.3s",
      cursor: "default",
    },
    formHover: {
      transform: "scale(1.02)",
    },
    title: {
      fontSize: "28px",
      fontWeight: "700",
      color: "#111827",
      textAlign: "center",
      marginBottom: "8px",
    },
    input: {
      padding: "12px 16px",
      borderRadius: "24px",
      border: "1px solid #d1d5db",
      fontSize: "16px",
      outline: "none",
      transition: "box-shadow 0.3s, border 0.3s",
    },
    inputFocus: {
      boxShadow: "0 0 0 3px rgba(99,102,241,0.4)",
      borderColor: "#6366f1"
    },
    dropdown: {
      padding: "12px 16px",
      borderRadius: "24px",
      border: "1px solid #d1d5db",
      fontSize: "16px",
      outline: "none",
      cursor: "pointer",
      transition: "box-shadow 0.3s, border 0.3s",
    },
    yearSemesterContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "16px",
    },
    fileInput: {
      padding: "12px 16px",
      borderRadius: "24px",
      border: "1px solid #d1d5db",
      fontSize: "16px",
      cursor: "pointer",
      outline: "none",
      transition: "box-shadow 0.3s, border 0.3s",
    },
    submitButton: {
      background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
      color: "#fff",
      fontWeight: "600",
      padding: "12px",
      borderRadius: "24px",
      border: "none",
      cursor: "pointer",
      fontSize: "16px",
      transition: "box-shadow 0.3s, transform 0.3s",
    },
    submitHover: {
      boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
      transform: "translateY(-2px)"
    },
    message: {
      textAlign: "center",
      color: "#16a34a",
      fontWeight: "600",
      marginTop: "8px"
    }
  };

  return (
    <div style={styles.container}>
      <form
        onSubmit={handleSubmit}
        style={styles.form}
        onMouseEnter={(e) => e.currentTarget.style.transform = styles.formHover.transform}
        onMouseLeave={(e) => e.currentTarget.style.transform = "none"}
      >
        <h2 style={styles.title}>Upload Notes</h2>

        <input
          type="text"
          name="title"
          placeholder="Note Title"
          value={form.title}
          onChange={handleChange}
          required
          style={styles.input}
          onFocus={(e) => e.currentTarget.style.boxShadow = styles.inputFocus.boxShadow}
          onBlur={(e) => e.currentTarget.style.boxShadow = "none"}
        />

        {/* Department Selector */}
        <DepartmentSelector
          value={form.department}
          onChange={handleDepartmentChange}
          style={styles.dropdown}
        />

        {/* Year & Semester Dropdowns */}
        <div style={styles.yearSemesterContainer}>
          <select
            name="year"
            value={form.year}
            onChange={handleChange}
            required
            style={styles.dropdown}
          >
            <option value="">Select Year</option>
            {romanYears.map(y => <option key={y} value={y}>{y}</option>)}
          </select>

          <select
            name="semester"
            value={form.semester}
            onChange={handleChange}
            required
            style={styles.dropdown}
          >
            <option value="">Select Semester</option>
            {romanSemesters.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          required
          style={styles.fileInput}
        />

        <button
          type="submit"
          style={styles.submitButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = styles.submitHover.boxShadow;
            e.currentTarget.style.transform = styles.submitHover.transform;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.transform = "none";
          }}
        >
          Upload Note
        </button>

        {message && <p style={styles.message}>{message}</p>}
      </form>
    </div>
  );
}

export default UploadNotes;
