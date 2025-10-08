import React, { useState } from "react";
import "../css/FeedbackForm.css";
import logo from "../assets/images/logo.png";

const FeedbackForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderNo, setOrderNo] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [plan, setPlan] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [errors, setErrors] = useState({});
  const [selectedDate, setSelectedDate] = useState("");

  const plans = [
    { label: "Combo Lunch and Dinner", value: "combo_lunch_dinner" },
    { label: "Combo Lunch, Dinner & Breakfast", value: "combo_all" },
    { label: "Monthly Lunch", value: "monthly_lunch" },
    { label: "Monthly Dinner", value: "monthly_dinner" },
    { label: "Monthly Breakfast", value: "monthly_breakfast" },
  ];

  const ratingOptions = ["Excellent", "Good", "Average", "Poor"];
  const [foodRating, setFoodRating] = useState("");
  const [foodFeedback, setFoodFeedback] = useState("");
  const [deliveryRating, setDeliveryRating] = useState("");
  const [deliveryFeedback, setDeliveryFeedback] = useState("");
  const [managementRating, setManagementRating] = useState("");
  const [managementFeedback, setManagementFeedback] = useState("");

  const validateFields = () => {
    const newErrors = {};
    if (!orderNo.trim()) newErrors.orderNo = "Order number is required";
    if (!name.trim()) newErrors.name = "Name is required";
    if (!phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    if (!plan) newErrors.plan = "Please select a plan";
    if (!feedbackText.trim()) newErrors.feedbackText = "Please write your overall feedback";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setOrderNo(""); setName(""); setPhoneNumber(""); setPlan("");
      setFoodRating(""); setFoodFeedback(""); setDeliveryRating(""); setDeliveryFeedback("");
      setManagementRating(""); setManagementFeedback(""); setFeedbackText(""); setSelectedDate("");
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="thankYouContainer">
        <h2 className="thankYouText">🎉 Thank You for Your Feedback! 🎉</h2>
      </div>
    );
  }

  return (
    <div className="form-container">
      {/* Logo */}
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <h2 className="title">Feedback Form</h2>

      <form onSubmit={handleSubmit}>
        {/* Order No */}
        <div className="input-wrapper">
          <i className="fas fa-receipt"></i>
          <input
            type="text"
            className="input"
            placeholder="Order no. *"
            value={orderNo}
            onChange={(e) => setOrderNo(e.target.value)}
          />
        </div>
        {errors.orderNo && <p className="errorText">{errors.orderNo}</p>}

        {/* Name */}
        <div className="input-wrapper">
          <i className="fas fa-user"></i>
          <input
            type="text"
            className="input"
            placeholder="Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {errors.name && <p className="errorText">{errors.name}</p>}

        {/* Phone Number */}
        <div className="input-wrapper">
          <i className="fas fa-phone"></i>
          <input
            type="tel"
            className="input"
            placeholder="Phone number *"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        {errors.phoneNumber && <p className="errorText">{errors.phoneNumber}</p>}

        {/* Plan Selection */}
        <select className="dropdown" value={plan} onChange={(e) => setPlan(e.target.value)}>
          <option value="">Select your plan *</option>
          {plans.map((p) => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
        {errors.plan && <p className="errorText">{errors.plan}</p>}

        {/* Feedback Sections */}
        {[
          { name: "Food", rating: foodRating, setRating: setFoodRating, feedback: foodFeedback, setFeedback: setFoodFeedback },
          { name: "Delivery", rating: deliveryRating, setRating: setDeliveryRating, feedback: deliveryFeedback, setFeedback: setDeliveryFeedback },
          { name: "Management", rating: managementRating, setRating: setManagementRating, feedback: managementFeedback, setFeedback: setManagementFeedback },
        ].map((section) => (
          <div className="sectionCard" key={section.name}>
            <h3 className="sectionTitle">{section.name}</h3>
            <select className="dropdown" value={section.rating} onChange={(e) => section.setRating(e.target.value)}>
              <option value="">Rate {section.name}</option>
              {ratingOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <textarea
              className="textArea"
              placeholder={`Write about ${section.name.toLowerCase()}...`}
              value={section.feedback}
              onChange={(e) => section.setFeedback(e.target.value)}
            />
          </div>
        ))}

        {/* Overall Feedback */}
        <label className="label">Overall Feedback</label>
        <textarea
          className="textArea"
          placeholder="Type your overall view..."
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
        />
        {errors.feedbackText && <p className="errorText">{errors.feedbackText}</p>}

        {/* Optional Date */}
        <label className="label">Date (Optional)</label>
        <input
          type="date"
          className="dateButton"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        {/* Submit */}
        <button type="submit" className="submitButton">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
