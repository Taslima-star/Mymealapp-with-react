import React, { useState } from "react";
import "../css/PauseResumeMeals.css";

const planToMeals = (plan) => {
  switch (plan) {
    case "1":
      return ["Lunch", "Dinner"];
    case "2":
      return ["Breakfast", "Lunch", "Dinner"];
    case "3":
      return ["Lunch"];
    case "4":
      return ["Dinner"];
    case "5":
      return ["Breakfast"];
    default:
      return [];
  }
};

const initialMealState = () => ({
  Breakfast: { checked: false, pause: false, resume: false, dates: { pause: null, resume: null } },
  Lunch: { checked: false, pause: false, resume: false, dates: { pause: null, resume: null } },
  Dinner: { checked: false, pause: false, resume: false, dates: { pause: null, resume: null } },
});

export default function PauseResumeMeals() {
  const [step, setStep] = useState(1);
  const [orderNo, setOrderNo] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("");
  const [meals, setMeals] = useState(initialMealState());

  const handleNextFromInfo = () => {
    if (!plan) {
      alert("Please select a plan.");
      return;
    }
    const enabledMeals = planToMeals(plan);
    const copy = initialMealState();
    enabledMeals.forEach((m) => (copy[m].checked = true));
    setMeals(copy);
    setStep(2);
  };

  const handleSubmitMeals = () => {
    const anyChecked = Object.values(meals).some((m) => m.checked);
    if (!anyChecked) {
      alert("Please select at least one meal (per your plan).");
      return;
    }
    setStep(3);
  };

  const handleFinalSubmit = () => setStep(4);

  const setMealField = (meal, key, value) => {
    setMeals((prev) => ({
      ...prev,
      [meal]: { ...prev[meal], [key]: value },
    }));
  };

  const setMealDate = (meal, type, date) => {
    setMeals((prev) => ({
      ...prev,
      [meal]: {
        ...prev[meal],
        dates: { ...prev[meal].dates, [type]: date },
      },
    }));
  };

  return (
    <div className="pause-container">
      <img src="/logo192.png" alt="logo" className="pause-logo" />
      {step === 1 && (
        <div className="pause-card">
          <h2>PAUSE AND RESUME YOUR MEAL</h2>
          <input
            type="text"
            placeholder="Order No. *"
            value={orderNo}
            onChange={(e) => setOrderNo(e.target.value)}
          />
          <input
            type="text"
            placeholder="Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone Number *"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Select Plan *</label>
          <select value={plan} onChange={(e) => setPlan(e.target.value)}>
            <option value="">Select a plan</option>
            <option value="1">Combo Lunch & Dinner</option>
            <option value="2">Combo Lunch, Dinner & Breakfast</option>
            <option value="3">Monthly Lunch</option>
            <option value="4">Monthly Dinner</option>
            <option value="5">Monthly Breakfast</option>
          </select>

          <button onClick={handleNextFromInfo}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div className="pause-card">
          <h3>Select Meals to Pause / Resume</h3>
          {["Breakfast", "Lunch", "Dinner"].map((meal) => {
            const m = meals[meal];
            if (!planToMeals(plan).includes(meal) && !m.checked) return null;
            return (
              <div key={meal} className="meal-section">
                <label>
                  <input
                    type="checkbox"
                    checked={m.checked}
                    onChange={() => setMealField(meal, "checked", !m.checked)}
                  />
                  {meal}
                </label>

                {m.checked && (
                  <div className="switches">
                    <label>
                      <input
                        type="checkbox"
                        checked={m.pause}
                        onChange={(e) => setMealField(meal, "pause", e.target.checked)}
                      />
                      Pause
                    </label>
                    {m.pause && (
                      <input
                        type="date"
                        value={m.dates.pause ? m.dates.pause : ""}
                        onChange={(e) => setMealDate(meal, "pause", e.target.value)}
                      />
                    )}

                    <label>
                      <input
                        type="checkbox"
                        checked={m.resume}
                        onChange={(e) => setMealField(meal, "resume", e.target.checked)}
                      />
                      Resume
                    </label>
                    {m.resume && (
                      <input
                        type="date"
                        value={m.dates.resume ? m.dates.resume : ""}
                        onChange={(e) => setMealDate(meal, "resume", e.target.value)}
                      />
                    )}
                  </div>
                )}
              </div>
            );
          })}

          <button onClick={handleSubmitMeals}>Submit</button>
          <button className="back-btn" onClick={() => setStep(1)}>
            Back to Info
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="pause-card">
          <h3>Review Your Submission</h3>
          <p><b>Order No:</b> {orderNo}</p>
          <p><b>Name:</b> {name}</p>
          <p><b>Phone:</b> {phone}</p>
          <p><b>Email:</b> {email}</p>
          <p><b>Plan:</b> {plan}</p>

          <h4>Meals & Dates</h4>
          {["Breakfast", "Lunch", "Dinner"].map((meal) => {
            const m = meals[meal];
            if (!m.checked) return null;
            return (
              <div key={meal} className="review-box">
                <strong>{meal}</strong>
                <p>Action: {m.pause ? "Pause" : m.resume ? "Resume" : "No Change"}</p>
                <p>Pause Date: {m.dates.pause || "N/A"}</p>
                <p>Resume Date: {m.dates.resume || "N/A"}</p>
              </div>
            );
          })}

          <button onClick={handleFinalSubmit}>Submit Final Request</button>
          <button className="back-btn" onClick={() => setStep(2)}>
            Back & Edit Meals
          </button>
        </div>
      )}

      {step === 4 && (
        <div className="pause-card thankyou">
          <h2>Thank you!</h2>
          <p>We have noted your request.</p>
          <button onClick={() => window.location.reload()}>Make another request</button>
        </div>
      )}
    </div>
  );
}
