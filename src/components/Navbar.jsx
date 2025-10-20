import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("adminToken");
  const isStudent = localStorage.getItem("studentData");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white flex justify-between items-center p-4">
      <div className="text-xl font-bold">
        Smart Note Organizer
      </div>
      <div className="flex gap-4">
        {!isAdmin && !isStudent && (
          <>
            <Link to="/admin-login" className="hover:underline">Admin Login</Link>
            <Link to="/student-login" className="hover:underline">Student Login</Link>
          </>
        )}
        {(isAdmin || isStudent) && (
          <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
