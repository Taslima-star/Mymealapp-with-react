import React, { useState } from "react";
import "../css/Customerform.css";
import { useNavigate } from "react-router-dom";

export default function CustomerForm() {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState(false);
  const [amount, setAmount] = useState("2100");
  const [planName, setPlanName] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [note, setNote] = useState("");
  const [screenshot, setScreenshot] = useState(null);

  const pickDocument = (e) => {
    const file = e.target.files[0];
    if (file) {
      setScreenshot(file);
    }
  };

  const handleSubmit = () => {
    if (!screenshot || !transactionId || !planName) {
      alert("Please fill all required fields and upload a screenshot.");
      return;
    }

    console.log({
      amount,
      planName,
      transactionId,
      note,
      screenshot,
    });

    navigate("/success");
  };

  return (
    <div className="container">
      <h2 className="title">Pay by QR</h2>

      {/* QR Option */}
      <div
        className={`option ${selectedPayment ? "selectedOption" : ""}`}
        onClick={() => setSelectedPayment(true)}
      >
        <span className="icon">📷</span>
        <span className="optionText">Scan QR Code</span>
      </div>

      {/* QR Payment Form */}
      {selectedPayment && (
        <div className="formContainer">
          <h3 className="subTitle">PATRI FOOD AND BEVERAGES</h3>
          <h4 className="subTitle">36152201</h4>

          <img
            src="https://api.qrserver.com/v1/create-qr-code/?data=36152201&size=200x200"
            alt="QR Code"
            className="qr"
          />

          <label className="label">Amount Paid</label>
          <input
            type="number"
            className="input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <label className="label">Plan Name</label>
          <input
            type="text"
            className="input"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
            placeholder="Enter your plan name"
          />

          <label className="label">Share the Screenshot *</label>
          <input type="file" className="uploadBox" onChange={pickDocument} />
          {screenshot && <p>{screenshot.name}</p>}

          <label className="label">Transaction ID *</label>
          <input
            type="text"
            className="input"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
          />

          <label className="label">Note</label>
          <input
            type="text"
            className="input"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <button className="submitBtn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
