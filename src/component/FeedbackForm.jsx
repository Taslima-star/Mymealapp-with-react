import React, { useState } from "react";
import "../css/FeedbackForm.css";
import logo from "../assets/images/logo.png";

const FeedbackForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    orderNo: "",
    name: "",
    phoneNumber: "",
    plan: "",
    feedbackText: "",
    selectedDate: "",
  });
  const [errors, setErrors] = useState({});
  const [ratings, setRatings] = useState({
    food: { rating: "", feedback: "" },
    delivery: { rating: "", feedback: "" },
    management: { rating: "", feedback: "" },
  });

  const plans = [
    { label: "Combo Lunch and Dinner", value: "combo_lunch_dinner" },
    { label: "Combo Lunch, Dinner & Breakfast", value: "combo_all" },
    { label: "Monthly Lunch", value: "monthly_lunch" },
    { label: "Monthly Dinner", value: "monthly_dinner" },
    { label: "Monthly Breakfast", value: "monthly_breakfast" },
  ];

  const ratingOptions = ["Excellent", "Good", "Average", "Poor"];

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateFields = () => {
    const newErrors = {};
    if (!formData.orderNo.trim()) newErrors.orderNo = "Order number is required";
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    if (!formData.plan) newErrors.plan = "Please select a plan";
    if (!formData.feedbackText.trim()) newErrors.feedbackText = "Please provide overall feedback";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateFields()) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ orderNo: "", name: "", phoneNumber: "", plan: "", feedbackText: "", selectedDate: "" });
      setRatings({ food: {}, delivery: {}, management: {} });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="thankYouContainer">
        <h2 className="thankYouText">🎉 Thank You for Your Valuable Feedback! 🎉</h2>
        <p className="thankYouNote">Your response helps us improve our services!</p>
      </div>
    );
  }

  return (
    <div className="feedback-wrapper">
      <div className="feedback-card">
        <div className="header">
          <img src={logo} alt="Logo" className="logo" />
          <h2 className="title">Customer Feedback Form</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div>
              <input
                type="text"
                placeholder="Order No.*"
                value={formData.orderNo}
                onChange={(e) => handleChange("orderNo", e.target.value)}
                className="input"
              />
              {errors.orderNo && <p className="errorText">{errors.orderNo}</p>}
            </div>

            <div>
              <input
                type="text"
                placeholder="Name*"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="input"
              />
              {errors.name && <p className="errorText">{errors.name}</p>}
            </div>

            <div>
              <input
                type="tel"
                placeholder="Phone Number*"
                value={formData.phoneNumber}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
                className="input"
              />
              {errors.phoneNumber && <p className="errorText">{errors.phoneNumber}</p>}
            </div>

            <div>
              <select
                className="input"
                value={formData.plan}
                onChange={(e) => handleChange("plan", e.target.value)}
              >
                <option value="">Select Plan*</option>
                {plans.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
              {errors.plan && <p className="errorText">{errors.plan}</p>}
            </div>
          </div>

          {["Food", "Delivery", "Management"].map((section) => (
            <div className="sectionCard" key={section}>
              <h3 className="sectionTitle">{section} Feedback</h3>
              <select
                className="input"
                value={ratings[section.toLowerCase()]?.rating || ""}
                onChange={(e) =>
                  setRatings({
                    ...ratings,
                    [section.toLowerCase()]: { ...ratings[section.toLowerCase()], rating: e.target.value },
                  })
                }
              >
                <option value="">Rate {section}</option>
                {ratingOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <textarea
                className="textArea"
                placeholder={`Write about ${section.toLowerCase()}...`}
                value={ratings[section.toLowerCase()]?.feedback || ""}
                onChange={(e) =>
                  setRatings({
                    ...ratings,
                    [section.toLowerCase()]: { ...ratings[section.toLowerCase()], feedback: e.target.value },
                  })
                }
              />
            </div>
          ))}

          <label className="label">Overall Feedback*</label>
          <textarea
            className="textArea"
            placeholder="Type your overall view..."
            value={formData.feedbackText}
            onChange={(e) => handleChange("feedbackText", e.target.value)}
          />
          {errors.feedbackText && <p className="errorText">{errors.feedbackText}</p>}

          <label className="label">Date (Optional)</label>
          <input
            type="date"
            className="input"
            value={formData.selectedDate}
            onChange={(e) => handleChange("selectedDate", e.target.value)}
          />

          <button type="submit" className="submitButton">
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
