import React, { useState } from "react";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import UploadNotes from "./UploadNotes.jsx";
import ManageNotes from "./ManageNotes.jsx";
import AddStudent from "./AddStudent.jsx";

function AdminDashboard() {
  const [tab, setTab] = useState("addStudent");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cards = [
    {
      key: "addStudent",
      title: "Add Student",
      description: "Add new student details including Roll No, Department, Year, Section, and Semester.",
      icon: "👤➕"
    },
    {
      key: "uploadNotes",
      title: "Upload Notes",
      description: "Upload and manage departmental notes for students to access online.",
      icon: "📄⬆️"
    },
    {
      key: "manageNotes",
      title: "Manage Notes",
      description: "Edit, delete or view uploaded notes and organize them by department.",
      icon: "📚⚙️"
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminDept");
    window.location.href = "/";
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC", padding: "2rem", fontFamily: "'Poppins', sans-serif" }}>
      
      {/* Navbar */}
      <nav style={{
        background: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(10px)",
        borderRadius: "1.5rem",
        padding: "1rem 2rem",
        marginBottom: "2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
        position: "relative",
      }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#111827", letterSpacing: "1px" }}>
          Admin Dashboard
        </h1>

        {/* Desktop Menu */}
        <div className="desktop-menu" style={{ display: "flex", gap: "1rem" }}>
          {cards.map(card => (
            <button
              key={card.key}
              onClick={() => setTab(card.key)}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "0.8rem",
                background: tab === card.key ? "#3B82F6" : "#E5E7EB",
                color: tab === card.key ? "#fff" : "#111827",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "0.3s",
              }}
            >
              {card.title}
            </button>
          ))}
          <button
            onClick={handleLogout}
            style={{
              padding: "0.6rem 1.8rem",
              borderRadius: "1rem",
              background: "#EF4444",
              color: "#fff",
              fontWeight: "bold",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <FiLogOut size={20} /> Logout
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="mobile-menu-button" style={{ display: "none" }}>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div style={{
            position: "absolute",
            top: "100%",
            right: "0",
            background: "#fff",
            width: "80%",
            borderRadius: "1rem",
            boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.8rem",
            zIndex: 50,
          }}>
            {cards.map(card => (
              <button
                key={card.key}
                onClick={() => { setTab(card.key); setMobileMenuOpen(false); }}
                style={{
                  padding: "0.8rem 1rem",
                  borderRadius: "0.8rem",
                  background: tab === card.key ? "#3B82F6" : "#E5E7EB",
                  color: tab === card.key ? "#fff" : "#111827",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "bold",
                  textAlign: "left",
                  transition: "0.3s",
                }}
              >
                {card.title}
              </button>
            ))}
            <hr style={{ border: "0.5px solid #E5E7EB", margin: "0.5rem 0" }} />
            <button
              onClick={handleLogout}
              style={{
                padding: "0.8rem 1rem",
                borderRadius: "0.8rem",
                background: "#EF4444",
                color: "#fff",
                fontWeight: "bold",
                border: "none",
                cursor: "pointer",
                transition: "0.3s",
              }}
            >
              <FiLogOut size={20} /> Logout
            </button>
          </div>
        )}

      </nav>

      {/* Dashboard Cards */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2rem", marginBottom: "2rem" }}>
        {cards.map(card => (
          <div
            key={card.key}
            onClick={() => setTab(card.key)}
            style={{
              cursor: "pointer",
              width: "22rem",
              padding: "2rem",
              borderRadius: "1.5rem",
              background: tab === card.key ? "#E5E7EB" : "#FFFFFF",
              boxShadow: tab === card.key ? "0 8px 32px rgba(0,0,0,0.2)" : "0 4px 16px rgba(0,0,0,0.1)",
              color: "#111827",
              transition: "all 0.3s ease, transform 0.3s ease",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              border: tab === card.key ? "2px solid #3B82F6" : "2px solid #E5E7EB",
              textAlign: "center",
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = "translateY(-5px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 10px 40px rgba(0,0,0,0.15)";
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = tab === card.key ? "0 8px 32px rgba(0,0,0,0.2)" : "0 4px 16px rgba(0,0,0,0.1)";
            }}
          >
            <div style={{ fontSize: "2.5rem" }}>{card.icon}</div>
            <h2 style={{ fontSize: "1.6rem", fontWeight: "700" }}>{card.title}</h2>
            <p style={{ fontSize: "1rem", lineHeight: "1.5" }}>{card.description}</p>
          </div>
        ))}
      </div>

      {/* Content Area */}
      <div style={{
        maxWidth: "65rem",
        margin: "0 auto",
        background: "#FFFFFF",
        borderRadius: "2rem",
        padding: "2.5rem",
        boxShadow: "0 12px 36px rgba(0,0,0,0.15)",
        transition: "all 0.5s ease",
      }}>
        {tab === "addStudent" && <AddStudent />}
        {tab === "uploadNotes" && <UploadNotes />}
        {tab === "manageNotes" && <ManageNotes />}
      </div>

      {/* Responsive CSS */}
      <style>
        {`
          @media (max-width: 768px) {
            .desktop-menu { display: none; }
            .mobile-menu-button { display: block; }
          }
        `}
      </style>
    </div>
  );
}

export default AdminDashboard;
