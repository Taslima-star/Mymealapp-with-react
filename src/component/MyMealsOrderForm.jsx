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
      navigate("/CustomerForm");
    } else if (payByCash) {
      navigate("/paycash", {
        state: { plan, deliveryTime, deliveryAddress, pickupAddress },
      });
    } else {
      alert("Please select a payment method.");
    }
  };

  return (
    <div className="mymeals-form-container">
      <h1 className="mymeals-form-title">MyMeals Order Form</h1>

      <div className="mymeals-input-group">
        <label>Name *</label>
        <input
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mymeals-input-group">
        <label>Phone No *</label>
        <input
          type="tel"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="mymeals-input-group">
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter email (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mymeals-input-group">
        <label>Pick up from *</label>
        <input
          type="text"
          value={pickupFrom}
          onChange={(e) => setPickupFrom(e.target.value)}
        />
      </div>

      <div className="mymeals-input-group">
        <label>Pick up address *</label>
        <textarea
          value={pickupAddress}
          onChange={(e) => setPickupAddress(e.target.value)}
        />
      </div>

      <div className="mymeals-input-group">
        <label>Delivery address *</label>
        <textarea
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          placeholder="Enter delivery address"
        />
      </div>

      {/* 🗺️ Elegant Map Preview */}
      <div
        className={`mymeals-map-container ${
          deliveryAddress ? "active" : ""
        }`}
      >
        {deliveryAddress ? (
          <iframe
            title="Delivery Location"
            frameBorder="0"
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              deliveryAddress
            )}&output=embed`}
            allowFullScreen
          ></iframe>
        ) : (
          <p className="mymeals-map-placeholder">
            🗺️ Enter delivery address to preview map
          </p>
        )}
      </div>

      <div className="mymeals-input-group">
        <label>Delivery Time (other than ASAP) *</label>
        <input
          type="time"
          value={deliveryTime}
          onChange={(e) => setDeliveryTime(e.target.value)}
        />
      </div>

      <div className="mymeals-input-group">
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
        <button className="mymeals-btn" onClick={handleProceedToPayment}>
          Proceed to Payment
        </button>
      )}

      {showPaymentOptions && (
        <div className="mymeals-payment-container">
          <h2 className="mymeals-payment-title">Choose Payment Method</h2>

          <div className="mymeals-option-row">
            <input
              type="checkbox"
              checked={payByQR}
              onChange={(e) => {
                setPayByQR(e.target.checked);
                if (e.target.checked) setPayByCash(false);
              }}
            />
            <span className="mymeals-option-text">
              Pay through QR code (Best in accountability)
            </span>
          </div>

          <div className="mymeals-option-row">
            <input
              type="checkbox"
              checked={payByCash}
              onChange={(e) => {
                setPayByCash(e.target.checked);
                if (e.target.checked) setPayByQR(false);
              }}
            />
            <span className="mymeals-option-text">
              Pay Cash (Not recommended)
            </span>
          </div>

          {(payByQR || payByCash) && (
            <button className="mymeals-btn" onClick={handleNext}>
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MyMealsOrderForm;
