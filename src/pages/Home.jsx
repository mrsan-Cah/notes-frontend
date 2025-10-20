import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 1rem",
      background: "linear-gradient(135deg, #7f00ff, #e100ff, #ff5f6d)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundSize: "400% 400%",
      animation: "gradientAnimation 15s ease infinite",
    },
    card: {
      backgroundColor: "rgba(255, 255, 255, 0.85)",
      backdropFilter: "blur(12px)",
      borderRadius: "2rem",
      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
      padding: "3rem 2rem",
      textAlign: "center",
      maxWidth: "32rem",
      width: "100%",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    title: {
      fontSize: "3.5rem",
      fontWeight: "900",
      color: "#1f2937",
      marginBottom: "1rem",
      textShadow: "0 4px 8px rgba(0,0,0,0.1)",
    },
    description: {
      color: "#374151",
      marginBottom: "2rem",
      fontSize: "1.125rem",
      lineHeight: "1.6",
    },
    buttonsContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      padding: "0.85rem 3rem",
      borderRadius: "1rem",
      fontWeight: "700",
      boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
      cursor: "pointer",
      transition: "all 0.3s ease",
      border: "none",
      fontSize: "1.125rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      transform: "translateY(0)",
    },
    adminButton: {
      backgroundColor: "#2563eb",
      color: "#fff",
    },
    studentButton: {
      backgroundColor: "#16a34a",
      color: "#fff",
    },
    footer: {
      marginTop: "3rem",
      color: "#fff",
      opacity: 0.85,
      fontSize: "0.875rem",
    },
    icon: {
      fontSize: "1.25rem",
    },
    '@keyframes gradientAnimation': {
      "0%": { backgroundPosition: "0% 50%" },
      "50%": { backgroundPosition: "100% 50%" },
      "100%": { backgroundPosition: "0% 50%" },
    },
  };

  // Hover effect
  const hoverEffect = (e) => {
    e.currentTarget.style.transform = "scale(1.05)";
    e.currentTarget.style.boxShadow = "0 18px 36px rgba(0,0,0,0.35)";
  };
  const leaveEffect = (e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.2)";
  };

  return (
    <div style={styles.container}>
      <div
        style={styles.card}
        onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
      >
        <h1 style={styles.title}>Smart Note Organizer</h1>
        <p style={styles.description}>
          Manage and access your department notes easily. Students and Admins can login below.
        </p>

        <div style={styles.buttonsContainer}>
          <button
            style={{ ...styles.button, ...styles.adminButton }}
            onClick={() => navigate("/admin-login")}
            onMouseOver={hoverEffect}
            onMouseOut={leaveEffect}
          >
            <span style={styles.icon}>🛠️</span> Admin Login
          </button>
          <button
            style={{ ...styles.button, ...styles.studentButton }}
            onClick={() => navigate("/student-login")}
            onMouseOver={hoverEffect}
            onMouseOut={leaveEffect}
          >
            <span style={styles.icon}>🎓</span> Student Login
          </button>
        </div>
      </div>

      <footer style={styles.footer}>
        &copy; {new Date().getFullYear()} Smart Note Organizer. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;
