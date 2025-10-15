import React from "react";

const TextareaField = ({ label, value, onChange }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <textarea value={value} onChange={onChange} />
    </div>
  );
};

export default TextareaField;
