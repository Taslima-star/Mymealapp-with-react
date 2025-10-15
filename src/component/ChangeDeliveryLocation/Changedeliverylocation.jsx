import React, { useState } from "react";
import styles from "../../css/Changedeliverylocation.module.css";
import logo from "../../assets/images/logo.png";

import Step1BasicInfo from "./Step1BasicInfo";
import Step2EffectiveDate from "./Step2EffectiveDate";
import Step3Meals from "./Step3Meals";
import Step4ChangeFor from "./Step4ChangeFor";
import Step5Address from "./Step5Address";
import Step6Preview from "./Step6Preview";
import Step7ThankYou from "./Step7ThankYou";

const Changedeliverylocation = () => {
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

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(7);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formCard}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <h2 className={styles.formTitle}>Change Delivery Location</h2>

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
  );
};

export default Changedeliverylocation;
