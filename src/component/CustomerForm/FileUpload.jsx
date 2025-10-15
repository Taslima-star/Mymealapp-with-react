import React from "react";

export default function FileUpload({ screenshot, onFilePick }) {
  const handlePick = (e) => {
    const file = e.target.files[0];
    if (file) onFilePick(file);
  };

  return (
    <div>
      <label className="label">Share the Screenshot *</label>
      <input type="file" className="uploadBox" onChange={handlePick} />
      {screenshot && <p>{screenshot.name}</p>}
    </div>
  );
}
