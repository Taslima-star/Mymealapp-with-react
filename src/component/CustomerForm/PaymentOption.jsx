import React from "react";

export default function PaymentOption({ selected, onSelect }) {
  return (
    <div
      className={`option ${selected ? "selectedOption" : ""}`}
      onClick={onSelect}
    >
      <span className="icon">📷</span>
      <span className="optionText">Scan QR Code</span>
    </div>
  );
}
