import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit, FiTrash2, FiDownload } from "react-icons/fi";

function ManageNotes() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", year: "", semester: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const romanYears = ["I", "II", "III", "IV"];
  const romanSemesters = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

  // Fetch notes from API
  const fetchNotes = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) throw new Error("Admin token not found");

      const res = await axios.get("/api/admin/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!Array.isArray(res.data)) throw new Error("Invalid data from server");
      setNotes(res.data);
    } catch (err) {
      console.error("Fetch notes error:", err.response?.data || err.message);
      setMessage("Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = async (note) => {
    if (!note?._id) return;

    if (!window.confirm(`Are you sure you want to delete "${note.title}"?`)) return;

    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`/api/admin/notes/${note._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotes(notes.filter((n) => n._id !== note._id));
      setMessage(`Note "${note.title}" deleted successfully`);
    } catch (err) {
      console.error(err);
      setMessage("Error deleting note");
    }
  };

  const handleEditClick = (note) => {
    setEditingNote(note);
    setEditForm({ title: note.title, year: note.year, semester: note.semester });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingNote?._id) return;

    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.put(`/api/admin/notes/${editingNote._id}`, editForm, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotes(notes.map((note) => (note._id === editingNote._id ? res.data : note)));
      setEditingNote(null);
      setMessage(`Note "${editForm.title}" updated successfully`);
    } catch (err) {
      console.error(err);
      setMessage("Error updating note");
    }
  };

  // Internal CSS
  const styles = {
    container: {
      padding: "48px 24px",
      backgroundColor: "#f9fafb",
      minHeight: "100vh",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    heading: {
      fontSize: "36px",
      fontWeight: "800",
      textAlign: "center",
      color: "#4f46e5",
      marginBottom: "24px",
    },
    message: {
      textAlign: "center",
      backgroundColor: "#4f46e5",
      color: "#fff",
      padding: "12px 16px",
      borderRadius: "12px",
      marginBottom: "24px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "24px",
    },
    card: {
      backgroundColor: "rgba(255,255,255,0.6)",
      backdropFilter: "blur(10px)",
      padding: "24px",
      borderRadius: "24px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
      border: "1px solid #e5e7eb",
      transition: "transform 0.3s, box-shadow 0.3s",
      cursor: "pointer",
    },
    cardHover: {
      transform: "scale(1.03)",
      boxShadow: "0 12px 28px rgba(0,0,0,0.2)",
    },
    cardTitle: {
      fontSize: "20px",
      fontWeight: "700",
      color: "#111827",
      marginBottom: "8px",
    },
    cardText: {
      fontSize: "14px",
      color: "#4b5563",
      marginBottom: "12px",
    },
    link: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      color: "#4f46e5",
      fontWeight: "500",
      textDecoration: "none",
      marginBottom: "12px",
      transition: "color 0.3s",
    },
    linkHover: {
      color: "#4338ca",
    },
    buttonContainer: {
      display: "flex",
      gap: "12px",
      marginTop: "12px",
    },
    editButton: {
      flex: 1,
      backgroundColor: "#fbbf24",
      color: "#fff",
      padding: "8px 12px",
      borderRadius: "16px",
      fontWeight: "600",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background-color 0.3s",
    },
    deleteButton: {
      flex: 1,
      backgroundColor: "#ef4444",
      color: "#fff",
      padding: "8px 12px",
      borderRadius: "16px",
      fontWeight: "600",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background-color 0.3s",
    },
    modalOverlay: {
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0,0,0,0.4)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "16px",
      zIndex: 50,
    },
    modal: {
      backgroundColor: "#fff",
      borderRadius: "24px",
      padding: "32px",
      maxWidth: "480px",
      width: "100%",
      boxShadow: "0 12px 28px rgba(0,0,0,0.25)",
    },
    modalTitle: {
      fontSize: "24px",
      fontWeight: "700",
      textAlign: "center",
      color: "#111827",
      marginBottom: "24px",
    },
    input: {
      padding: "12px 16px",
      borderRadius: "16px",
      border: "1px solid #d1d5db",
      fontSize: "14px",
      outline: "none",
      width: "100%",
      marginBottom: "12px",
    },
    select: {
      padding: "12px 16px",
      borderRadius: "16px",
      border: "1px solid #d1d5db",
      fontSize: "14px",
      outline: "none",
      width: "100%",
    },
    modalButtonContainer: {
      display: "flex",
      gap: "12px",
      marginTop: "16px",
    },
    saveButton: {
      flex: 1,
      backgroundColor: "#16a34a",
      color: "#fff",
      padding: "10px 16px",
      borderRadius: "16px",
      fontWeight: "600",
      cursor: "pointer",
    },
    cancelButton: {
      flex: 1,
      backgroundColor: "#9ca3af",
      color: "#fff",
      padding: "10px 16px",
      borderRadius: "16px",
      fontWeight: "600",
      cursor: "pointer",
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Manage Notes</h2>

      {message && <div style={styles.message}>{message}</div>}

      {loading ? (
        <p style={{ textAlign: "center", color: "#4b5563" }}>Loading notes...</p>
      ) : notes.length === 0 ? (
        <p style={{ textAlign: "center", color: "#6b7280" }}>No notes available.</p>
      ) : (
        <div style={styles.grid}>
          {notes.map((note) => (
            <div
              key={note._id}
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = styles.cardHover.transform;
                e.currentTarget.style.boxShadow = styles.cardHover.boxShadow;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = styles.card.boxShadow;
              }}
            >
              <h3 style={styles.cardTitle}>{note.title}</h3>
              <p style={styles.cardText}>
                Year: {note.year} | Semester: {note.semester}
              </p>
              <a
                href={note.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.link}
                onMouseEnter={(e) => e.currentTarget.style.color = styles.linkHover.color}
                onMouseLeave={(e) => e.currentTarget.style.color = styles.link.color}
              >
                <FiDownload /> Download PDF
              </a>

              <div style={styles.buttonContainer}>
                <button
                  style={styles.editButton}
                  onClick={() => handleEditClick(note)}
                >
                  <FiEdit /> Edit
                </button>
                <button
                  style={styles.deleteButton}
                  onClick={() => handleDelete(note)}
                >
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingNote && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2 style={styles.modalTitle}>Edit Note</h2>
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                name="title"
                value={editForm.title}
                onChange={handleEditChange}
                placeholder="Title"
                required
                style={styles.input}
              />
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <select
                  name="year"
                  value={editForm.year}
                  onChange={handleEditChange}
                  required
                  style={styles.select}
                >
                  <option value="">Select Year</option>
                  {romanYears.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
                <select
                  name="semester"
                  value={editForm.semester}
                  onChange={handleEditChange}
                  required
                  style={styles.select}
                >
                  <option value="">Select Semester</option>
                  {romanSemesters.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div style={styles.modalButtonContainer}>
                <button type="submit" style={styles.saveButton}>Save</button>
                <button type="button" style={styles.cancelButton} onClick={() => setEditingNote(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageNotes;
