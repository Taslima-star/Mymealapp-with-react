import React, { useState } from "react";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import styles from "../css/MealPreference.module.css"; 

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
        {/* Logo */}
        <div className={styles.logoContainer}>
          <div className={styles.logoCircle}>
            <h2 className={styles.logoText}>mymeals</h2>
          </div>
        </div>

        {!submitted ? (
          <>
            <h2 className={styles.title}>Change your Meal Preference</h2>

            {/* STEP 1 */}
            {step === 1 && (
              <form onSubmit={handleNext}>
                <div className={styles.inputGroup}>
                  <label>Order no. *</label>
                  <input
                    type="text"
                    name="orderNo"
                    value={formData.orderNo}
                    onChange={handleChange}
                    placeholder="Enter order number"
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>Email *</label>
                  <div className={styles.iconInput}>
                    <FaEnvelope className={styles.icon} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label>Phone number *</label>
                  <div className={styles.iconInput}>
                    <FaPhoneAlt className={styles.icon} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      required
                    />
                  </div>
                </div>

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
              <form onSubmit={handleFinalSubmit}>
                <h3 className={styles.title}>Effective</h3>

                <div className={styles.inputGroup}>
                  <label>
                    From <span>*</span>
                  </label>
                  <p>Meals will be served as per changes from mentioned date.</p>
                  <input
                    type="date"
                    name="effectiveFrom"
                    value={formData.effectiveFrom}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Veg/Non-Veg */}
                <div className={styles.toggleRow}>
                  <label>Veg or Nonveg</label>
                  <label className={styles.toggleSwitch}>
                    <input
                      type="checkbox"
                      checked={toggles.vegNonveg}
                      onChange={() => toggleSwitch("vegNonveg")}
                    />
                    <span></span>
                  </label>
                </div>

                {toggles.vegNonveg && (
                  <div>
                    <div className={styles.inputGroup}>
                      <label>Meal type</label>
                      <div>
                        <label>
                          <input
                            type="radio"
                            name="mealType"
                            value="Veg"
                            onChange={handleChange}
                          />{" "}
                          Veg
                        </label>{" "}
                        <label>
                          <input
                            type="radio"
                            name="mealType"
                            value="Non Veg"
                            onChange={handleChange}
                          />{" "}
                          Non Veg
                        </label>{" "}
                        <label>
                          <input
                            type="radio"
                            name="mealType"
                            value="Both"
                            onChange={handleChange}
                          />{" "}
                          Both
                        </label>
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <label>Any Non-veg Item you would not prefer</label>
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

                {/* Lunch Toggle */}
                <div className={styles.toggleRow}>
                  <label>Lunch</label>
                  <label className={styles.toggleSwitch}>
                    <input
                      type="checkbox"
                      checked={toggles.lunch}
                      onChange={() => toggleSwitch("lunch")}
                    />
                    <span></span>
                  </label>
                </div>

                {/* Dinner Toggle */}
                <div className={styles.toggleRow}>
                  <label>Dinner</label>
                  <label className={styles.toggleSwitch}>
                    <input
                      type="checkbox"
                      checked={toggles.dinner}
                      onChange={() => toggleSwitch("dinner")}
                    />
                    <span></span>
                  </label>
                </div>

                {/* Dish Choice Toggle */}
                <div className={styles.toggleRow}>
                  <label>Dish Choice</label>
                  <label className={styles.toggleSwitch}>
                    <input
                      type="checkbox"
                      checked={toggles.dishChoice}
                      onChange={() => toggleSwitch("dishChoice")}
                    />
                    <span></span>
                  </label>
                </div>

                {toggles.dishChoice && (
                  <div className={styles.inputGroup}>
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

            {/* STEP 3 - SUMMARY */}
            {step === 3 && (
              <div>
                <h3 className={styles.title}>Your Preferences</h3>
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
                    Submit
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          // ✅ FINAL THANK YOU MESSAGE
          <div className={styles.thankyouBox}>
            <h2 className={styles.title}>Thank You!</h2>
            <p>
              We have noted your changes in meal preference.
              <br />
              Will revert you back through mail.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealPreferenceForm;
