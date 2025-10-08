import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/MyMealsOrderForm.css";

const MyMealsOrderForm = () => {
  const navigate = useNavigate();

  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pickupAddress, setPickupAddress] = useState(
    "Bomikhal, Jharapada, Bhubaneswar, Odisha, India"
  );
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [pickupFrom, setPickupFrom] = useState("mymeals");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [plan, setPlan] = useState("");

  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [payByCash, setPayByCash] = useState(false);
  const [payByQR, setPayByQR] = useState(false);

  // Handlers
  const handleProceedToPayment = () => {
    if (!plan) {
      alert("Please select a plan to continue.");
      return;
    }
    setShowPaymentOptions(true);
  };

  const handleNext = () => {
    if (payByQR) {
      navigate("/Customerform");
    } else if (payByCash) {
      navigate("/paycash", {
        state: { plan, deliveryTime, deliveryAddress, pickupAddress },
      });
    } else {
      alert("Please select a payment method.");
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">mymeals</h1>

      <div className="input-group">
        <label>Name *</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="input-group">
        <label>Phone No *</label>
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>

      <div className="input-group">
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="input-group">
        <label>Pick up from *</label>
        <input type="text" value={pickupFrom} onChange={(e) => setPickupFrom(e.target.value)} />
      </div>

      <div className="input-group">
        <label>Pick up address *</label>
        <textarea value={pickupAddress} onChange={(e) => setPickupAddress(e.target.value)} />
      </div>

      <div className="input-group">
        <label>Delivery address *</label>
        <textarea
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          placeholder="Enter delivery address"
        />
      </div>

      {/* Map Preview */}
      <div className="map-container">
        {deliveryAddress ? (
          <iframe
            title="Delivery Location"
            width="100%"
            height="250"
            frameBorder="0"
            style={{ border: 0, borderRadius: "8px" }}
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              deliveryAddress
            )}&output=embed`}
            allowFullScreen
          ></iframe>
        ) : (
          <p className="map-placeholder">Enter delivery address to see map</p>
        )}
      </div>

      <div className="input-group">
        <label>Delivery Time (other than ASAP) *</label>
        <input type="time" value={deliveryTime} onChange={(e) => setDeliveryTime(e.target.value)} />
      </div>

      <div className="input-group">
        <label>Select Plan *</label>
        <select value={plan} onChange={(e) => setPlan(e.target.value)}>
          <option value="">Select Plan</option>
          <option value="combo-lunch-dinner">Combo Lunch and Dinner</option>
          <option value="monthly-lunch">Monthly Lunch</option>
          <option value="monthly-dinner">Monthly Dinner</option>
          <option value="combo-all">Combo Lunch, Dinner, Breakfast</option>
        </select>
      </div>

      {!showPaymentOptions && (
        <button className="btn" onClick={handleProceedToPayment}>
          Proceed to payment
        </button>
      )}

      {showPaymentOptions && (
        <div className="payment-container">
          <h2>Choose Payment Method</h2>

          <div className="option-row">
            <input
              type="checkbox"
              checked={payByQR}
              onChange={(e) => {
                setPayByQR(e.target.checked);
                if (e.target.checked) setPayByCash(false);
              }}
            />
            <span className="option-text">Pay through QR code (Best in accountability)</span>
          </div>

          <div className="option-row">
            <input
              type="checkbox"
              checked={payByCash}
              onChange={(e) => {
                setPayByCash(e.target.checked);
                if (e.target.checked) setPayByQR(false);
              }}
            />
            <span className="option-text">Pay Cash (Not recommended)</span>
          </div>

          {(payByQR || payByCash) && (
            <button className="btn" onClick={handleNext}>
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MyMealsOrderForm;
