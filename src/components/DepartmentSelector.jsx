import React from "react";

function DepartmentSelector({ value, onChange }) {
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "0.6rem 1rem",
          borderRadius: "1rem",
          border: "none",
          outline: "none",
          background: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          fontSize: "1rem",
          color: "#111827",
          appearance: "none", // hides default arrow
          cursor: "pointer",
          transition: "all 0.3s ease"
        }}
        onMouseOver={e => e.currentTarget.style.background = "rgba(255, 255, 255, 0.4)"}
        onMouseOut={e => e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)"}
        onFocus={e => e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.15)"}
        onBlur={e => e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"}
      >
        <option value="">Select Department</option>
        <option value="CSE">CSE</option>
        <option value="ECE">ECE</option>
        <option value="MECH">MECH</option>
        <option value="CIVIL">CIVIL</option>
        <option value="EEE">EEE</option>
        <option value="IT">IT</option>
        {/* Add more departments if needed */}
      </select>

      {/* Custom arrow */}
      <div style={{
        position: "absolute",
        top: "50%",
        right: "1rem",
        transform: "translateY(-50%)",
        pointerEvents: "none",
        fontSize: "1.2rem",
        color: "#111827"
      }}>
        ▼
      </div>
    </div>
  );
}

export default DepartmentSelector;
