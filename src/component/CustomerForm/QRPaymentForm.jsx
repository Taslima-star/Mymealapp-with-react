import React from "react";
import FileUpload from "./FileUpload";

export default function QRPaymentForm({
  amount,
  setAmount,
  planName,
  setPlanName,
  transactionId,
  setTransactionId,
  note,
  setNote,
  screenshot,
  setScreenshot,
  handleSubmit,
}) {
  return (
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

      <FileUpload screenshot={screenshot} onFilePick={setScreenshot} />

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
  );
}
