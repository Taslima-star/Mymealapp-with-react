import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Paycash.css";

const Paycash = () => {
  const navigate = useNavigate();

  const [amountPaid, setAmountPaid] = useState("");
  const [cashPaidOption, setCashPaidOption] = useState("");
  const [deliveryBoyName, setDeliveryBoyName] = useState("");
  const [deliveryBoyMobile, setDeliveryBoyMobile] = useState("");
  const [note, setNote] = useState("");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can also pass data via state if needed
    navigate("/success");
  };

  return (
    <div className="paycash-container">
      <h1>Pay Cash</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Amount Paid *</label>
          <input
            type="number"
            value={amountPaid}
            onChange={(e) => setAmountPaid(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Cash Paid</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="cashPaidOption"
                value="deliveryBoy"
                checked={cashPaidOption === "deliveryBoy"}
                onChange={(e) => setCashPaidOption(e.target.value)}
              />
              Delivery Boy
            </label>
            <label>
              <input
                type="radio"
                name="cashPaidOption"
                value="office"
                checked={cashPaidOption === "office"}
                onChange={(e) => setCashPaidOption(e.target.value)}
              />
              At Office
            </label>
          </div>
        </div>

        {cashPaidOption === "deliveryBoy" && (
          <>
            <div className="form-group">
              <label>Delivery Boy Name *</label>
              <input
                type="text"
                value={deliveryBoyName}
                onChange={(e) => setDeliveryBoyName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Delivery Boy Mobile *</label>
              <input
                type="tel"
                value={deliveryBoyMobile}
                onChange={(e) => setDeliveryBoyMobile(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Select Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Select Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Note</label>
              <textarea value={note} onChange={(e) => setNote(e.target.value)} />
            </div>
          </>
        )}

        {cashPaidOption === "office" && (
          <>
            <div className="form-group">
              <label>Select Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Select Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Note</label>
              <textarea value={note} onChange={(e) => setNote(e.target.value)} />
            </div>
          </>
        )}

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Paycash;
