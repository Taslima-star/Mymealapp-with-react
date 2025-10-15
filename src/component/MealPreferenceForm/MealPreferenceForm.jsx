import React, { useState } from "react";
import styles from "../../css/MealPreference.module.css";
import logo from "../../assets/images/logo.png";

import Step1UserInfo from "./Step1UserInfo";
import Step2MealDetails from "./Step2MealDetails";
import Step3Preview from "./Step3Preview";
import ThankYou from "./ThankYou";

const MealPreferenceForm = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [toggles, setToggles] = useState({
    vegNonveg: false,
    lunch: false,
    dinner: false,
    dishChoice: false,
  });
  const [formData, setFormData] = useState({
    orderNo: "",
    name: "",
    email: "",
    phone: "",
    plan: "",
    effectiveFrom: "",
    mealType: "",
    avoidNonVeg: "",
    avoidVeg: "",
    dishChoice: "",
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const toggleSwitch = (name) => setToggles({ ...toggles, [name]: !toggles[name] });
  const handleNext = (e) => { e.preventDefault(); setStep(2); };
  const handleFinalSubmit = (e) => { e.preventDefault(); setStep(3); };
  const handleFinalConfirm = () => setSubmitted(true);

  return (
    <div className={styles.formContainer}>
      <div className={styles.formCard}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="Logo" className={styles.logoImage} />
        </div>

        {!submitted ? (
          <>
            <h2 className={styles.title}>Change Your Meal Preference</h2>
            {step === 1 && <Step1UserInfo formData={formData} handleChange={handleChange} handleNext={handleNext} />}
            {step === 2 && <Step2MealDetails formData={formData} toggles={toggles} handleChange={handleChange} toggleSwitch={toggleSwitch} handleFinalSubmit={handleFinalSubmit} setStep={setStep} />}
            {step === 3 && <Step3Preview formData={formData} toggles={toggles} handleFinalConfirm={handleFinalConfirm} setStep={setStep} />}
          </>
        ) : (
          <ThankYou />
        )}
      </div>
    </div>
  );
};

export default MealPreferenceForm;
