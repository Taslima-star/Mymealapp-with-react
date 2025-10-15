import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputGroup from "./InputGroup";
import PlanSelector from "./PlanSelector";
import MapPreview from "./MapPreview";
import PaymentOptions from "./PaymentOptions";
import "../../css/MyMealsOrderForm.css";

import backgroundImage from "../../assets/images/bg.png";

const MyMealsOrderForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [primaryAddress, setPrimaryAddress] = useState(
    "Bomikhal, Jharapada, Bhubaneswar, Odisha, India"
  );
  const [secondaryAddress, setSecondaryAddress] = useState("");
  const [pickupFrom, setPickupFrom] = useState("mymeals");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [plan, setPlan] = useState("");

  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [payByCash, setPayByCash] = useState(false);
  const [payByQR, setPayByQR] = useState(false);

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
        state: { plan, deliveryTime, secondaryAddress, primaryAddress },
      });
    } else {
      alert("Please select a payment method.");
    }
  };

  return (
    <div
      className="mymeals-page-bg"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="mymeals-form-card">
        <h1 className="mymeals-form-title">MyMeals Order Form</h1>

        <InputGroup
          label="Name *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
        />

        <InputGroup
          label="Phone No *"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter phone number"
        />

        <InputGroup
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email (optional)"
        />

        <InputGroup
          label="Pickup From *"
          value={pickupFrom}
          onChange={(e) => setPickupFrom(e.target.value)}
        />

        {/* 🌍 Primary Address + Map */}
        <InputGroup
          label="Primary Address *"
          isTextarea
          value={primaryAddress}
          onChange={(e) => setPrimaryAddress(e.target.value)}
        />
        <MapPreview deliveryAddress={primaryAddress} />

        {/* 🗺️ Secondary Address + Map */}
        <InputGroup
          label="Secondary Address *"
          isTextarea
          value={secondaryAddress}
          onChange={(e) => setSecondaryAddress(e.target.value)}
          placeholder="Enter secondary address"
        />
        <MapPreview deliveryAddress={secondaryAddress} />

        <InputGroup
          label="Delivery Time (other than ASAP) *"
          type="time"
          value={deliveryTime}
          onChange={(e) => setDeliveryTime(e.target.value)}
        />

        <PlanSelector plan={plan} setPlan={setPlan} />

        {!showPaymentOptions && (
          <button className="mymeals-btn" onClick={handleProceedToPayment}>
            Proceed to Payment
          </button>
        )}

        {showPaymentOptions && (
          <PaymentOptions
            payByQR={payByQR}
            setPayByQR={setPayByQR}
            payByCash={payByCash}
            setPayByCash={setPayByCash}
            onNext={handleNext}
          />
        )}
      </div>
    </div>
  );
};

export default MyMealsOrderForm;
