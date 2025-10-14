import React, { useState } from "react";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import styles from "../css/MealPreference.module.css";
import logo from "../assets/images/logo.png";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleSwitch = (name) => {
    setToggles({ ...toggles, [name]: !toggles[name] });
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const handleFinalConfirm = () => {
    setSubmitted(true);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formCard}>
        {/* Logo Image */}
        <div className={styles.logoContainer}>
          <img src={logo} alt="Logo" className={styles.logoImage} />
        </div>

        {!submitted ? (
          <>
            <h2 className={styles.title}>Change Your Meal Preference</h2>

            {/* STEP 1 */}
            {step === 1 && (
              <form onSubmit={handleNext} className={styles.formStep}>
                {["orderNo", "name", "email", "phone"].map((field) => (
                  <div className={styles.inputGroup} key={field}>
                    <label>
                      {field === "orderNo" && "Order No *"}
                      {field === "name" && "Name *"}
                      {field === "email" && "Email *"}
                      {field === "phone" && "Phone *"}
                    </label>
                    <div
                      className={
                        field === "email" || field === "phone"
                          ? styles.iconInput
                          : ""
                      }
                    >
                      {field === "email" && <FaEnvelope className={styles.icon} />}
                      {field === "phone" && <FaPhoneAlt className={styles.icon} />}
                      <input
                        type={field === "email" ? "email" : "text"}
                        name={field}
                        placeholder={`Enter ${field.replace(/^\w/, (c) =>
                          c.toUpperCase()
                        )}`}
                        value={formData[field]}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                ))}

                <div className={styles.inputGroup}>
                  <label>Plan *</label>
                  <select
                    name="plan"
                    value={formData.plan}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select your plan</option>
                    <option value="Combo Lunch & Dinner">Combo Lunch & Dinner</option>
                    <option value="Lunch Only">Lunch Only</option>
                    <option value="Dinner Only">Dinner Only</option>
                    <option value="Breakfast Only">Breakfast Only</option>
                    <option value="Combo Lunch,Breakfast & Dinner">
                      Combo Lunch, Breakfast & Dinner
                    </option>
                  </select>
                </div>

                <button type="submit" className={styles.primaryBtn}>
                  Next →
                </button>
              </form>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <form onSubmit={handleFinalSubmit} className={styles.formStep}>
                <h3 className={styles.subtitle}>Effective From</h3>

                <div className={styles.inputGroup}>
                  <label>Date *</label>
                  <input
                    type="date"
                    name="effectiveFrom"
                    value={formData.effectiveFrom}
                    onChange={handleChange}
                    required
                  />
                  <p className={styles.helperText}>
                    Meals will be served as per changes from this date.
                  </p>
                </div>

                <div className={styles.toggleRow}>
                  <span>Veg or Non-Veg</span>
                  <label className={styles.toggleSwitch}>
                    <input
                      type="checkbox"
                      checked={toggles.vegNonveg}
                      onChange={() => toggleSwitch("vegNonveg")}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                {toggles.vegNonveg && (
                  <div className={styles.fadeIn}>
                    <div className={styles.inputGroup}>
                      <label>Meal Type</label>
                      <div className={styles.radioGroup}>
                        {["Veg", "Non Veg", "Both"].map((option) => (
                          <label key={option}>
                            <input
                              type="radio"
                              name="mealType"
                              value={option}
                              onChange={handleChange}
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <label>Any Non-Veg Item you would not prefer</label>
                      <input
                        type="text"
                        name="avoidNonVeg"
                        value={formData.avoidNonVeg}
                        onChange={handleChange}
                        placeholder="e.g. All dishes of Prawn or Egg tadka"
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <label>Any Veg Item you would not prefer</label>
                      <input
                        type="text"
                        name="avoidVeg"
                        value={formData.avoidVeg}
                        onChange={handleChange}
                        placeholder="e.g. Lauki or Tinda"
                      />
                    </div>
                  </div>
                )}

                {["lunch", "dinner", "dishChoice"].map((key) => (
                  <div key={key} className={styles.toggleRow}>
                    <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                    <label className={styles.toggleSwitch}>
                      <input
                        type="checkbox"
                        checked={toggles[key]}
                        onChange={() => toggleSwitch(key)}
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>
                ))}

                {toggles.dishChoice && (
                  <div className={`${styles.inputGroup} ${styles.fadeIn}`}>
                    <label>Dish Choice</label>
                    <input
                      type="text"
                      name="dishChoice"
                      value={formData.dishChoice}
                      onChange={handleChange}
                      placeholder="Please specify the dish name"
                    />
                  </div>
                )}

                <div className={styles.buttonRow}>
                  <button
                    type="button"
                    className={styles.secondaryBtn}
                    onClick={() => setStep(1)}
                  >
                    ← Back
                  </button>
                  <button type="submit" className={styles.primaryBtn}>
                    Submit →
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: Preview */}
            {step === 3 && (
              <div className={styles.formStep}>
                <h3 className={styles.subtitle}>Your Preferences</h3>
                <div className={styles.summaryBox}>
                  {Object.entries({
                    "Order No.": formData.orderNo,
                    Name: formData.name,
                    Email: formData.email,
                    Phone: formData.phone,
                    Plan: formData.plan,
                    "Effective From": formData.effectiveFrom,
                    "Meal Type": formData.mealType || "—",
                    Lunch: toggles.lunch ? "Yes" : "No",
                    Dinner: toggles.dinner ? "Yes" : "No",
                    "Dish Choice": toggles.dishChoice
                      ? formData.dishChoice || "Yes"
                      : "No",
                    "Avoid Veg Items": formData.avoidVeg || "—",
                    "Avoid Non-Veg Items": formData.avoidNonVeg || "—",
                  }).map(([label, value]) => (
                    <div key={label} className={styles.summaryItem}>
                      <span className={styles.summaryLabel}>{label}</span>
                      <span className={styles.summaryValue}>{value}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.buttonRow}>
                  <button
                    className={styles.secondaryBtn}
                    onClick={() => setStep(1)}
                  >
                    Edit Again
                  </button>
                  <button
                    className={styles.primaryBtn}
                    onClick={handleFinalConfirm}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className={styles.thankyouBox}>
            <h2 className={styles.title}>Thank You!</h2>
            <p>
              We’ve noted your changes in meal preference.
              <br />
              You’ll receive an email confirmation soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealPreferenceForm;
