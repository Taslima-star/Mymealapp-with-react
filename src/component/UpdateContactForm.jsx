import React, { useState } from "react";
import "../css/UpdateContactForm.css";
import { IoCheckmarkCircle, IoMailOutline } from "react-icons/io5";
import logo from "../assets/images/logo.png"; // ✅ Replace with actual logo path

const UpdateContactForm = () => {
  const [step, setStep] = useState("form");
  const [formData, setFormData] = useState({
    orderNo: "",
    name: "",
    email: "",
    plan: "",
    oldPhone: "",
    newPhone: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { orderNo, name, email, plan, oldPhone, newPhone } = formData;
    if (!orderNo || !name || !email || !plan || !oldPhone || !newPhone) {
      alert("Please fill all required fields");
      return;
    }
    setStep("thankyou");
  };

  if (step === "thankyou") {
    return (
      <div className="update-thank-container">
        <IoCheckmarkCircle className="update-thank-icon" />
        <h2 className="update-thank-title">Thank You!</h2>
        <p className="update-thank-message">
          Thank you for showing concern, it will be updated and you will get
          confirmation via email shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="update-form-container">
      <form className="update-card" onSubmit={handleSubmit}>
        <div className="update-logo-circle">
          <img src={logo} alt="MyMeals Logo" className="update-logo-img" />
        </div>

        <h2 className="update-heading">Update Contact No.</h2>

        <label className="update-label">Order No. *</label>
        <input
          type="number"
          className="update-input"
          value={formData.orderNo}
          onChange={(e) =>
            setFormData({ ...formData, orderNo: e.target.value })
          }
          placeholder="Enter your order number"
        />

        <label className="update-label">Name *</label>
        <input
          type="text"
          className="update-input"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter your name"
        />

        <label className="update-label">Email *</label>
        <div className="update-input-with-icon">
          <IoMailOutline className="update-icon" />
          <input
            type="email"
            className="update-input-inner"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Enter your email"
          />
        </div>

        <label className="update-label">Plan *</label>
        <select
          className="update-select"
          value={formData.plan}
          onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
        >
          <option value="">Select Plan</option>
          <option value="Combo">Combo Lunch & Dinner</option>
          <option value="Lunch">Lunch Only</option>
          <option value="Breakfast">Breakfast Only</option>
          <option value="Dinner">Dinner Only</option>
          <option value="All">Combo Lunch, Dinner & Breakfast</option>
        </select>

        <label className="update-label">Old Phone No. *</label>
        <input
          type="tel"
          className="update-input"
          value={formData.oldPhone}
          onChange={(e) =>
            setFormData({ ...formData, oldPhone: e.target.value })
          }
          placeholder="+91 00000 00000"
        />

        <label className="update-label">New Phone No. *</label>
        <input
          type="tel"
          className="update-input"
          value={formData.newPhone}
          onChange={(e) =>
            setFormData({ ...formData, newPhone: e.target.value })
          }
          placeholder="+91 00000 00000"
        />

        <button type="submit" className="update-submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateContactForm;
