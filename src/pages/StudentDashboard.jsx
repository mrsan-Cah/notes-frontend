import React, { useState, useEffect } from "react";
import ViewNotes from "./ViewNotes.jsx";
import { FiMenu, FiX } from "react-icons/fi";

function StudentDashboard() {
  const studentData = JSON.parse(localStorage.getItem("studentData"));
  const [year, setYear] = useState(studentData.year);
  const [semester, setSemester] = useState(studentData.semester);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("studentData");
    window.location.href = "/";
  };

  // Internal CSS
  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#f3f4f6",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#16a34a",
      color: "#fff",
      padding: "16px 24px",
    },
    navLinks: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
    },
    button: {
      backgroundColor: "#fff",
      color: "#16a34a",
      border: "none",
      padding: "8px 16px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#e5e7eb",
    },
    mobileMenu: {
      backgroundColor: "#22c55e",
      color: "#fff",
      padding: "16px 24px",
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    card: {
      backgroundColor: "#fff",
      padding: "24px",
      borderRadius: "24px",
      boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
      maxWidth: "500px",
      margin: "24px auto",
    },
    cardTitle: {
      fontSize: "20px",
      fontWeight: "700",
      marginBottom: "12px",
      color: "#111827",
    },
    text: {
      fontSize: "16px",
      color: "#374151",
      marginBottom: "8px",
    },
    inputContainer: {
      display: "flex",
      gap: "12px",
      flexWrap: "wrap",
      marginTop: "16px",
    },
    input: {
      flex: "1",
      padding: "8px 12px",
      borderRadius: "16px",
      border: "1px solid #d1d5db",
      outline: "none",
    },
    viewNotesContainer: {
      maxWidth: "900px",
      margin: "32px auto",
      padding: "0 16px",
    },
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <h1>Student Dashboard</h1>

        {isMobile ? (
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}>
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        ) : (
          <div style={styles.navLinks}>
            <span>Welcome, {studentData.name}</span>
            <button style={styles.button} onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* Mobile menu */}
      {menuOpen && isMobile && (
        <div style={styles.mobileMenu}>
          <span>Welcome, {studentData.name}</span>
          <button style={styles.button} onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}

      {/* Student Info Card */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Student Information</h2>
        <p style={styles.text}>
          <strong>Roll No:</strong> {studentData.rollNo}
        </p>
        <p style={styles.text}>
          <strong>Department:</strong> {studentData.department}
        </p>

        <div style={styles.inputContainer}>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Year"
            style={styles.input}
          />
          <input
            type="number"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            placeholder="Semester"
            style={styles.input}
          />
        </div>
      </div>

      {/* View Notes */}
      <div style={styles.viewNotesContainer}>
        <ViewNotes department={studentData.department} year={year} semester={semester} />
      </div>
    </div>
  );
}

export default StudentDashboard;
