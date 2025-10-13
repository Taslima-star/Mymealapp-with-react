import React, { useState } from "react";
import logo from "../assets/images/logo.png";
import "../css/RenewalForm.css"; // component-specific CSS

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

      alert("Form submitted successfully!");
      setOrderNo("");
      setLocation("Old");
    }
  };

  return (
    <div className="renewalForm-container">
      <div className="renewalForm-wrapper">
        <div className="renewalForm-logoContainer">
          <img src={logo} alt="Logo" className="renewalForm-logo" />
        </div>

        <h2 className="renewalForm-heading">Renewal</h2>

        <form onSubmit={handleSubmit}>
          <div className="renewalForm-group">
            <label htmlFor="orderNo" className="renewalForm-label">
              Order No *
            </label>
            <input
              type="number"
              id="orderNo"
              className="renewalForm-input"
              value={orderNo}
              onChange={(e) => setOrderNo(e.target.value)}
              placeholder="Enter order number"
            />
            {errors.orderNo && (
              <p className="renewalForm-error">{errors.orderNo}</p>
            )}
          </div>

          <label className="renewalForm-label">Location *</label>
          <p className="renewalForm-subtext">
            Please proceed only if you are continuing with the same delivery
            location or have confirmed the new delivery location with the
            MYMEALS team.
          </p>

          <div className="renewalForm-radioGroup">
            <label className="renewalForm-radioRow">
              <input
                type="radio"
                name="location"
                value="Old"
                checked={location === "Old"}
                onChange={(e) => setLocation(e.target.value)}
              />
              Old
            </label>
            <label className="renewalForm-radioRow">
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

          <button type="submit" className="renewalForm-submitBtn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RenewalForm;
