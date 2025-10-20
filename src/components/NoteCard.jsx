import React from "react";

function NoteCard({ note }) {
  return (
    <div className="bg-white p-4 rounded shadow flex flex-col gap-2">
      <h3 className="font-bold text-lg">{note.title}</h3>
      <p>Year: {note.year}, Semester: {note.semester}</p>
      <a href={note.fileUrl} target="_blank" className="text-blue-600 hover:underline">Download PDF</a>
    </div>
  );
}

export default NoteCard;
