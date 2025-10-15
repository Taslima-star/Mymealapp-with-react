import React, { useState } from "react";
import styles from "../../css/Changedeliverylocation.module.css";
import Header from "../Header";
import Sidebar from "../Sidebar";

import "../../css/dashboard.css";
import bgImage from "../../assets/images/bg.png";

import Step1BasicInfo from "./Step1BasicInfo";
import Step2EffectiveDate from "./Step2EffectiveDate";
import Step3Meals from "./Step3Meals";
import Step4ChangeFor from "./Step4ChangeFor";
import Step5Address from "./Step5Address";
import Step6Preview from "./Step6Preview";
import Step7ThankYou from "./Step7ThankYou";

const Changedeliverylocation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);

  const [formData, setFormData] = useState({
    orderNo: "",
    name: "",
    email: "",
    phone: "",
    plan: "",
    effectiveDate: "",
    meals: [],
    changeFor: "",
    addressType: "",
    primaryAddress: "",
    primaryCity: "",
    primaryLandmark: "",
    primaryState: "",
    primaryZip: "",
    secondaryAddress: "",
    secondaryCity: "",
    secondaryLandmark: "",
    secondaryState: "",
    secondaryZip: "",
  });

  // ✅ handle change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "meals") {
      setFormData((prev) => {
        const meals = checked
          ? [...prev.meals, value]
          : prev.meals.filter((m) => m !== value);
        return { ...prev, meals };
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ step navigation
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(7);
  };

  // ✅ main return (single clean structure)
  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Content */}
      <div className={`dashboard-main ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main
          className="dashboard-content"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="empty-dashboard">
            <div className={styles.formContainer}>
              

              {/* Step-based rendering */}
              {step === 1 && (
                <Step1BasicInfo
                  formData={formData}
                  handleChange={handleChange}
                  confirmed={confirmed}
                  setConfirmed={setConfirmed}
                  nextStep={nextStep}
                />
              )}
              {step === 2 && (
                <Step2EffectiveDate
                  formData={formData}
                  handleChange={handleChange}
                  nextStep={nextStep}
                  prevStep={prevStep}
                />
              )}
              {step === 3 && (
                <Step3Meals
                  formData={formData}
                  handleChange={handleChange}
                  nextStep={nextStep}
                  prevStep={prevStep}
                />
              )}
              {step === 4 && (
                <Step4ChangeFor
                  formData={formData}
                  handleChange={handleChange}
                  nextStep={nextStep}
                  prevStep={prevStep}
                />
              )}
              {step === 5 && (
                <Step5Address
                  formData={formData}
                  handleChange={handleChange}
                  nextStep={nextStep}
                  prevStep={prevStep}
                />
              )}
              {step === 6 && (
                <Step6Preview
                  formData={formData}
                  handleSubmit={handleSubmit}
                  prevStep={prevStep}
                />
              )}
              {step === 7 && <Step7ThankYou />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Changedeliverylocation;
