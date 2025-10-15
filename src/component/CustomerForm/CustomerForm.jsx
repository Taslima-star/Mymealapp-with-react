import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentOption from "./PaymentOption";
import QRPaymentForm from "./QRPaymentForm";
import "../../css/Customerform.css";

import backgroundImage from "../../assets/images/bg.png"; // 🌄 Background Image

export default function CustomerForm() {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState(false);
  const [amount, setAmount] = useState("2100");
  const [planName, setPlanName] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [note, setNote] = useState("");
  const [screenshot, setScreenshot] = useState(null);

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
    <div
      className="customerform-bg"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="customerform-card">
        <h2 className="customerform-title">💳 Pay by QR</h2>

        <PaymentOption
          selected={selectedPayment}
          onSelect={() => setSelectedPayment(true)}
        />

        {selectedPayment && (
          <QRPaymentForm
            amount={amount}
            setAmount={setAmount}
            planName={planName}
            setPlanName={setPlanName}
            transactionId={transactionId}
            setTransactionId={setTransactionId}
            note={note}
            setNote={setNote}
            screenshot={screenshot}
            setScreenshot={setScreenshot}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}
