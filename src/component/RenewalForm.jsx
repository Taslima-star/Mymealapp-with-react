import React, { useState } from "react";
import "../css/RenewalForm.css";
import logo from "../assets/images/logo.png";


const RenewalForm = () => {
  const [orderNo, setOrderNo] = useState("");
  const [location, setLocation] = useState("Old");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!orderNo.trim()) newErrors.orderNo = "Order number is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const formData = { orderNo, location };
      console.log("Form Data:", formData);

      // You can replace this with your API call logic
      alert("Form submitted successfully!");
      setOrderNo("");
      setLocation("Old");
    }
  };

  return (
    <div className="renewal-container">
      <div className="form-wrapper">
        {/* Logo */}
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />

        </div>

        <h2 className="heading">Renewal</h2>

        <form onSubmit={handleSubmit}>
          {/* Order No */}
          <div className="form-group">
            <label htmlFor="orderNo">Order No *</label>
            <input
              type="number"
              id="orderNo"
              className="input"
              value={orderNo}
              onChange={(e) => setOrderNo(e.target.value)}
              placeholder="Enter order number"
            />
            {errors.orderNo && <p className="error-text">{errors.orderNo}</p>}
          </div>

          {/* Location Selection */}
          <label className="label">Location *</label>
          <p className="subtext">
            Please proceed only if you are continuing with the same delivery
            location or have confirmed the new delivery location with the
            MYMEALS team.
          </p>

          <div className="radio-group">
            <label className="radio-row">
              <input
                type="radio"
                name="location"
                value="Old"
                checked={location === "Old"}
                onChange={(e) => setLocation(e.target.value)}
              />
              Old
            </label>
            <label className="radio-row">
              <input
                type="radio"
                name="location"
                value="New"
                checked={location === "New"}
                onChange={(e) => setLocation(e.target.value)}
              />
              New
            </label>
          </div>

          {/* Submit */}
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RenewalForm;
