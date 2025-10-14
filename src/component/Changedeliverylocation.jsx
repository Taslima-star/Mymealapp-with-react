import React, { useState } from "react";
import styles from "../css/Changedeliverylocation.module.css";
import logo from "../assets/images/logo.png";

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

  const plans = [
    "Combo (Lunch, Dinner & Breakfast)",
    "Combo (Lunch & Dinner)",
    "Monthly Lunch",
    "Monthly Dinner",
    "Monthly Breakfast",
  ];

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

        {/* STEP 1 */}
        {step === 1 && (
          <div className={styles.step}>
            <p className={styles.infoText}>
              Please share your location through WhatsApp for confirmation
              before proceeding.
            </p>

            {["orderNo", "name", "email", "phone"].map((field) => (
              <label key={field}>
                {field === "orderNo" && "Order No *"}
                {field === "name" && "Name *"}
                {field === "email" && "Email *"}
                {field === "phone" && "Phone *"}
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  placeholder={`Enter ${field.replace(/^\w/, (c) => c.toUpperCase())}`}
                  value={formData[field]}
                  onChange={handleChange}
                  className={styles.inputField}
                  required
                />
              </label>
            ))}

            <label>
              Plan *
              <select
                name="plan"
                value={formData.plan}
                onChange={handleChange}
                className={styles.inputField}
                required
              >
                <option value="">-- Select Plan --</option>
                {plans.map((p, idx) => (
                  <option key={idx} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </label>

            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={confirmed}
                onChange={() => setConfirmed(!confirmed)}
              />
              Yes, I have confirmed the location from the official team.
            </label>
            <p className={styles.infoText}>
              ⚠️ Make sure you proceed only after getting confirmation from
              the official team.
            </p>

            {confirmed && (
              <button onClick={nextStep} className={styles.nextBtn}>
                Next
              </button>
            )}
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className={styles.step}>
            <h3>Effective Date</h3>
            <input
              type="date"
              name="effectiveDate"
              value={formData.effectiveDate}
              onChange={handleChange}
              className={styles.inputField}
              required
            />
            <div className={styles.btnGroup}>
              <button onClick={prevStep}>Back</button>
              <button onClick={nextStep}>Next</button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className={styles.step}>
            <h3>Select Meal(s)</h3>
            <div className={styles.checkboxGroup}>
              {["Lunch", "Dinner", "Breakfast"].map((meal) => (
                <label key={meal} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="meals"
                    value={meal}
                    checked={formData.meals.includes(meal)}
                    onChange={handleChange}
                  />
                  {meal}
                </label>
              ))}
            </div>
            <div className={styles.btnGroup}>
              <button onClick={prevStep}>Back</button>
              <button onClick={nextStep}>Next</button>
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <div className={styles.step}>
            <h3>For</h3>
            <div className={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  name="changeFor"
                  value="1-meal"
                  checked={formData.changeFor === "1-meal"}
                  onChange={handleChange}
                />
                Change for 1 meal
              </label>
              <label>
                <input
                  type="radio"
                  name="changeFor"
                  value="all-meals"
                  checked={formData.changeFor === "all-meals"}
                  onChange={handleChange}
                />
                Change for all meals
              </label>
            </div>
            <div className={styles.btnGroup}>
              <button onClick={prevStep}>Back</button>
              <button onClick={nextStep}>Next</button>
            </div>
          </div>
        )}

        {/* STEP 5 */}
        {step === 5 && (
          <div className={styles.step}>
            <h3>Address Section</h3>

            {formData.changeFor === "1-meal" && (
              <>
                <input
                  type="text"
                  name="primaryAddress"
                  placeholder="Address"
                  value={formData.primaryAddress}
                  onChange={handleChange}
                  className={styles.inputField}
                />
                <input
                  type="text"
                  name="primaryCity"
                  placeholder="City"
                  value={formData.primaryCity}
                  onChange={handleChange}
                  className={styles.inputField}
                />
                <input
                  type="text"
                  name="primaryLandmark"
                  placeholder="Landmark"
                  value={formData.primaryLandmark}
                  onChange={handleChange}
                  className={styles.inputField}
                />
                <input
                  type="text"
                  name="primaryState"
                  placeholder="State"
                  value={formData.primaryState}
                  onChange={handleChange}
                  className={styles.inputField}
                />
                <input
                  type="text"
                  name="primaryZip"
                  placeholder="ZIP Code"
                  value={formData.primaryZip}
                  onChange={handleChange}
                  className={styles.inputField}
                />
              </>
            )}

            {formData.changeFor === "all-meals" && (
              <>
                <div className={styles.radioGroup}>
                  {["primary", "secondary", "both"].map((type) => (
                    <label key={type}>
                      <input
                        type="radio"
                        name="addressType"
                        value={type}
                        checked={formData.addressType === type}
                        onChange={handleChange}
                      />
                      {type.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    </label>
                  ))}
                </div>

                {["primary", "both"].includes(formData.addressType) && (
                  <>
                    <input
                      type="text"
                      name="primaryAddress"
                      placeholder="Primary Address"
                      value={formData.primaryAddress}
                      onChange={handleChange}
                      className={styles.inputField}
                    />
                    <input
                      type="text"
                      name="primaryCity"
                      placeholder="Primary City"
                      value={formData.primaryCity}
                      onChange={handleChange}
                      className={styles.inputField}
                    />
                    <input
                      type="text"
                      name="primaryLandmark"
                      placeholder="Primary Landmark"
                      value={formData.primaryLandmark}
                      onChange={handleChange}
                      className={styles.inputField}
                    />
                    <input
                      type="text"
                      name="primaryState"
                      placeholder="Primary State"
                      value={formData.primaryState}
                      onChange={handleChange}
                      className={styles.inputField}
                    />
                    <input
                      type="text"
                      name="primaryZip"
                      placeholder="Primary ZIP"
                      value={formData.primaryZip}
                      onChange={handleChange}
                      className={styles.inputField}
                    />
                  </>
                )}

                {["secondary", "both"].includes(formData.addressType) && (
                  <>
                    <input
                      type="text"
                      name="secondaryAddress"
                      placeholder="Secondary Address"
                      value={formData.secondaryAddress}
                      onChange={handleChange}
                      className={styles.inputField}
                    />
                    <input
                      type="text"
                      name="secondaryCity"
                      placeholder="Secondary City"
                      value={formData.secondaryCity}
                      onChange={handleChange}
                      className={styles.inputField}
                    />
                    <input
                      type="text"
                      name="secondaryLandmark"
                      placeholder="Secondary Landmark"
                      value={formData.secondaryLandmark}
                      onChange={handleChange}
                      className={styles.inputField}
                    />
                    <input
                      type="text"
                      name="secondaryState"
                      placeholder="Secondary State"
                      value={formData.secondaryState}
                      onChange={handleChange}
                      className={styles.inputField}
                    />
                    <input
                      type="text"
                      name="secondaryZip"
                      placeholder="Secondary ZIP"
                      value={formData.secondaryZip}
                      onChange={handleChange}
                      className={styles.inputField}
                    />
                  </>
                )}
              </>
            )}

            <div className={styles.btnGroup}>
              <button onClick={prevStep}>Back</button>
              <button onClick={nextStep}>Next</button>
            </div>
          </div>
        )}

        {/* STEP 6 */}
        {step === 6 && (
          <div className={styles.step}>
            <h3>Preview</h3>
            <pre className={styles.previewBox}>
              {JSON.stringify(formData, null, 2)}
            </pre>
            <div className={styles.btnGroup}>
              <button onClick={prevStep}>Back</button>
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        )}

        {/* STEP 7 */}
        {step === 7 && (
          <div className={styles.thankYou}>
            <h2>🎉 Thank You!</h2>
            <p>Your response has been submitted successfully.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Changedeliverylocation;
