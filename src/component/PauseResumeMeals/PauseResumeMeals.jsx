import React, { useState } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import '../../css/dashboard.css';
import "../../css/PauseResumeMeals.css";

import bgImage from "../../assets/images/bg.png"; // <-- double-check this path

import Step1Info from "./Step1Info";
import Step2Meals from "./Step2Meals";
import Step3Review from "./Step3Review";
import Step4ThankYou from "./Step4ThankYou";

// Map plan to available meals
export const planToMeals = (plan) => {
  switch (plan) {
    case "1": return ["Lunch", "Dinner"];
    case "2": return ["Breakfast", "Lunch", "Dinner"];
    case "3": return ["Lunch"];
    case "4": return ["Dinner"];
    case "5": return ["Breakfast"];
    default: return [];
  }
};

// Initialize meal state
export const initialMealState = () => ({
  Breakfast: { checked: false, pause: false, resume: false, dates: { pause: null, resume: null } },
  Lunch: { checked: false, pause: false, resume: false, dates: { pause: null, resume: null } },
  Dinner: { checked: false, pause: false, resume: false, dates: { pause: null, resume: null } },
});

export default function PauseResumeMeals() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [step, setStep] = useState(1);

  // User info
  const [orderNo, setOrderNo] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("");
  const [meals, setMeals] = useState(initialMealState());

  // Step handlers
  const handleNextFromInfo = () => {
    if (!plan) return alert("Please select a plan.");
    const enabledMeals = planToMeals(plan);
    const copy = initialMealState();
    enabledMeals.forEach((m) => (copy[m].checked = true));
    setMeals(copy);
    setStep(2);
  };

  const handleSubmitMeals = () => {
    if (!Object.values(meals).some((m) => m.checked)) {
      return alert("Please select at least one meal (per your plan).");
    }
    setStep(3);
  };

  const handleFinalSubmit = () => setStep(4);

  // Update meal checkbox / pause / resume
  const setMealField = (meal, key, value) => {
    setMeals(prev => ({ ...prev, [meal]: { ...prev[meal], [key]: value } }));
  };

  // Update meal pause/resume dates
  const setMealDate = (meal, type, date) => {
    setMeals(prev => ({
      ...prev,
      [meal]: { ...prev[meal], dates: { ...prev[meal].dates, [type]: date } }
    }));
  };
const mealRows = Object.entries(meals).filter(([meal, data]) => data.checked);

  // Local state for dynamic blank rows
  const [blankRows, setBlankRows] = useState([
    {
      orderNo: "",
      name: "",
      email: "",
      phone: "",
      plan: "",
      meal: "",
      pause: "",
      resume: "",
      pauseDate: "",
      resumeDate: "",
    },
  ]);
  
  // Handle input change for blank rows
  const handleInputChange = (index, field, value) => {
    const updated = [...blankRows];
    updated[index][field] = value;
    setBlankRows(updated);
  };
  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main content */}
      <div className={`dashboard-main ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main
          className="dashboard-content "
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container-fluid pause-content row ">
            {step === 1 && (
              <Step1Info
                orderNo={orderNo} setOrderNo={setOrderNo}
                name={name} setName={setName}
                phone={phone} setPhone={setPhone}
                email={email} setEmail={setEmail}
                plan={plan} setPlan={setPlan}
                handleNext={handleNextFromInfo}
              />
            )}

            {step === 2 && (
              <Step2Meals
                plan={plan} meals={meals}
                setMealField={setMealField} setMealDate={setMealDate}
                handleSubmit={handleSubmitMeals}
                handleBack={() => setStep(1)}
              />
            )}

            {step === 3 && (
              <Step3Review
                orderNo={orderNo} name={name} phone={phone} email={email}
                plan={plan} meals={meals}
                handleFinalSubmit={handleFinalSubmit}
                handleBack={() => setStep(2)}
              />
            )}

            {step === 4 && <Step4ThankYou />}
            <div className="pause-card col-md-7" style={{marginLeft: `20px`, }}>
              <div >
      <h3 >Pause / Resume Summary</h3>

      <table >
        <thead>
          <tr>
            <th>Order No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Plan</th>
            <th>Meal</th>
            <th>Pause</th>
            <th>Resume</th>
            <th>Pause Date</th>
            <th>Resume Date</th>
          </tr>
        </thead>

        <tbody>
          {/* Existing meal rows */}
          {mealRows.length > 0 ? (
            mealRows.map(([meal, data], index) => (
              <tr key={index}>
                {index === 0 ? (
                  <>
                    <td rowSpan={mealRows.length}>{orderNo || "-"}</td>
                    <td rowSpan={mealRows.length}>{name || "-"}</td>
                    <td rowSpan={mealRows.length}>{email || "-"}</td>
                    <td rowSpan={mealRows.length}>{phone || "-"}</td>
                    <td rowSpan={mealRows.length}>{plan || "-"}</td>
                  </>
                ) : null}

                <td>{meal}</td>
                <td>{data.pause ? "Yes" : "No"}</td>
                <td>{data.resume ? "Yes" : "No"}</td>
                <td>{data.dates.pause || "-"}</td>
                <td>{data.dates.resume || "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" >
                No meal data found.
              </td>
            </tr>
          )}

          {/* Dynamic blank input rows */}
          {blankRows.map((row, index) => (
            <tr key={`blank-${index}`} >
              <td>
                <input
                  type="text"
                  placeholder="Enter Order No"
                  value={row.orderNo}
                  onChange={(e) => handleInputChange(index, "orderNo", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Enter Name"
                  value={row.name}
                  onChange={(e) => handleInputChange(index, "name", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="email"
                  placeholder="Enter Email"
                  value={row.email}
                  onChange={(e) => handleInputChange(index, "email", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="tel"
                  placeholder="Enter Phone"
                  value={row.phone}
                  onChange={(e) => handleInputChange(index, "phone", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Plan"
                  value={row.plan}
                  onChange={(e) => handleInputChange(index, "plan", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Meal"
                  value={row.meal}
                  onChange={(e) => handleInputChange(index, "meal", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Pause (Yes/No)"
                  value={row.pause}
                  onChange={(e) => handleInputChange(index, "pause", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Resume (Yes/No)"
                  value={row.resume}
                  onChange={(e) => handleInputChange(index, "resume", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="date"
                  value={row.pauseDate}
                  onChange={(e) => handleInputChange(index, "pauseDate", e.target.value)}
                />
              </td>
              <td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
