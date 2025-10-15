import React from "react";

const RadioGroup = ({ name, options, selected, onChange }) => {
  return (
    <div className="form-group">
      <label>Cash Paid</label>
      <div className="radio-group">
        {options.map((opt) => (
          <label key={opt.value}>
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={selected === opt.value}
              onChange={onChange}
            />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
