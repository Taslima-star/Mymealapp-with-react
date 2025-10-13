import React, { useState } from "react";
import "../css/Complaint.css";
import { IoCheckmarkCircle, IoArrowForward } from "react-icons/io5";
import logo from "../assets/images/logo.png"; 
const Complaint = () => {
  const [step, setStep] = useState("order");

  const [orderData, setOrderData] = useState({
    orderNo: "",
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    plan: "",
  });

  const [complaintData, setComplaintData] = useState({
    complaint: [],
    date: new Date(),
    meal: "",
    issue: "",
    imageUri: null,
  });

  const handleNext = (e) => {
    e.preventDefault();
    const { orderNo, name, phone, address, city, state, plan } = orderData;
    if (!orderNo || !name || !phone || !address || !city || !state || !plan) {
      alert("Please fill all required fields");
      return;
    }
    setStep("complaint");
  };

  const toggleComplaintType = (type) => {
    setComplaintData((prev) => ({
      ...prev,
      complaint: prev.complaint.includes(type)
        ? prev.complaint.filter((t) => t !== type)
        : [...prev.complaint, type],
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setComplaintData({ ...complaintData, imageUri: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!complaintData.complaint.length || !complaintData.issue) {
      alert("Please complete all required fields");
      return;
    }
    setStep("thankyou");
  };

  if (step === "thankyou") {
    return (
      <div className="thankyou-container">
        <IoCheckmarkCircle className="thank-icon" />
        <h2 className="thank-title">Thank You!</h2>
        <p className="thank-text">
          We owe you an apology for the issues you faced. <br />
          We will look after it and make sure you won't face it again.
        </p>
      </div>
    );
  }

  return (
    <div className="form-wrapper">
      <div className="card">
        <div className="logo-container">
          <img src={logo} alt="mymeals logo" className="logo-img" />
        </div>

        {step === "order" && (
          <form onSubmit={handleNext}>
            <h2 className="heading">Order Details</h2>

            {[
              { label: "Order No *", key: "orderNo" },
              { label: "Name *", key: "name" },
              { label: "Phone *", key: "phone" },
              { label: "Address *", key: "address" },
              { label: "City *", key: "city" },
              { label: "State *", key: "state" },
              { label: "ZIP", key: "zip" },
            ].map((field) => (
              <div key={field.key} className="form-group">
                <label>{field.label}</label>
                <input
                  type="text"
                  value={orderData[field.key]}
                  onChange={(e) =>
                    setOrderData({ ...orderData, [field.key]: e.target.value })
                  }
                />
              </div>
            ))}

            <label>Plan *</label>
            <select
              value={orderData.plan}
              onChange={(e) =>
                setOrderData({ ...orderData, plan: e.target.value })
              }
            >
              <option value="">Select Plan</option>
              <option value="Combo Lunch & Dinner">Combo Lunch & Dinner</option>
              <option value="Lunch">Lunch Only</option>
              <option value="Dinner">Dinner Only</option>
              <option value="Breakfast">Breakfast Only</option>
              <option value="Combo Lunch,Breakfast & Dinner">
                Combo Lunch, Breakfast & Dinner
              </option>
            </select>

            <button type="submit" className="btn">
              Next <IoArrowForward className="icon-inline" />
            </button>
          </form>
        )}

        {step === "complaint" && (
          <form onSubmit={handleSubmit}>
            <h2 className="heading">Raise a Complaint</h2>

            <label>Complaint Type *</label>
            <div className="checkbox-group">
              {["Food", "Delivery", "Management", "Other"].map((item) => (
                <div
                  key={item}
                  className={`checkbox ${
                    complaintData.complaint.includes(item) ? "selected" : ""
                  }`}
                  onClick={() => toggleComplaintType(item)}
                >
                  {item}
                </div>
              ))}
            </div>

            <label>Date</label>
            <input
              type="date"
              value={complaintData.date.toISOString().split("T")[0]}
              onChange={(e) =>
                setComplaintData({
                  ...complaintData,
                  date: new Date(e.target.value),
                })
              }
            />

            <label>Meal *</label>
            <select
              value={complaintData.meal}
              onChange={(e) =>
                setComplaintData({ ...complaintData, meal: e.target.value })
              }
            >
              <option value="">Select Meal</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>

            <label>Issue *</label>
            <textarea
              placeholder="Describe your issue"
              value={complaintData.issue}
              onChange={(e) =>
                setComplaintData({ ...complaintData, issue: e.target.value })
              }
            ></textarea>

            <label>Upload Image (optional)</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />

            {complaintData.imageUri && (
              <img
                src={complaintData.imageUri}
                alt="Complaint"
                className="preview-image"
              />
            )}

            <button type="submit" className="btn">
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Complaint;