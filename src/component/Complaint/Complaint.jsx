import React, { useState } from "react";
import "../../css/Complaint.css";
import logo from "../../assets/images/logo.png";
import { IoArrowForward } from "react-icons/io5";

import OrderDetailsForm from "./OrderDetailsForm";
import ComplaintForm from "./ComplaintForm";
import ThankYou from "./ThankYou";

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

  return (
    <div className="form-wrapper">
      <div className="card">
        <div className="logo-container">
          <img src={logo} alt="mymeals logo" className="logo-img" />
        </div>

        {step === "order" && (
          <OrderDetailsForm
            orderData={orderData}
            setOrderData={setOrderData}
            setStep={setStep}
          />
        )}

        {step === "complaint" && (
          <ComplaintForm
            complaintData={complaintData}
            setComplaintData={setComplaintData}
            setStep={setStep}
          />
        )}

        {step === "thankyou" && <ThankYou />}
      </div>
    </div>
  );
};

export default Complaint;
