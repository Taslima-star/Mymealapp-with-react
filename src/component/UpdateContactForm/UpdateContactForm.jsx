import React, { useState } from "react";
import "../../css/UpdateContactForm.css";
import logo from "../../assets/images/logo.png";

import UpdateForm from "./UpdateForm";
import ThankYouMessage from "./ThankYouMessage";

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

  return (
    <div className="update-form-container">
      <div className="update-card">
        <div className="update-logo-circle">
          <img src={logo} alt="MyMeals Logo" className="update-logo-img" />
        </div>

        {step === "form" ? (
          <UpdateForm
            formData={formData}
            setFormData={setFormData}
            setStep={setStep}
          />
        ) : (
          <ThankYouMessage />
        )}
      </div>
    </div>
  );
};

export default UpdateContactForm;
