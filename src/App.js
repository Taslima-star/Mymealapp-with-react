import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';

// Lazy load components (only load when visited)
const WelcomePage = lazy(() => import("./component/WelcomePage"));
const Login = lazy(() => import("./component/login"));
const Service = lazy(() => import("./component/Service"));
const Dashboard = lazy(() => import("./component/Dashboard"));
const MyMealsOrderForm = lazy(() => import("./component/MyMealsOrderForm"));
const RenewalForm = lazy(() => import("./component/RenewalForm"));
const PauseResumeMeals = lazy(() => import("./component/PauseResumeMeals"));
const FeedbackForm = lazy(() => import("./component/FeedbackForm"));
const MenuModal = lazy(() => import("./component/MenuModal"));
const CustomerForm = lazy(() => import("./component/CustomerForm"));
const Success = lazy(() => import("./component/Success"));
const Paycash = lazy(() => import("./component/Paycash"));
const UpdateContactForm = lazy(() => import("./component/UpdateContactForm"));
const Complaint = lazy(() => import("./component/Complaint"));
const MealPreferenceForm= lazy(() => import("./component/MealPreferenceForm"));

const App = () => {
  return (
    <Router>
      {/* Suspense ensures components load on demand with fallback */}
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/service" element={<Service />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/MyMealsOrderForm" element={<MyMealsOrderForm />} />
          <Route path="/RenewalForm" element={<RenewalForm />} />
          <Route path="/PauseResumeMeals" element={<PauseResumeMeals />} />
          <Route path="/FeedbackForm" element={<FeedbackForm />} />
          <Route path="/menu" element={<MenuModal />} />
          <Route path="/CustomerForm" element={<CustomerForm />} />
          <Route path="/success" element={<Success />} />
          <Route path="/paycash" element={<Paycash />} />
          <Route path="/UpdateContactForm" element={<UpdateContactForm />} />
          <Route path="/complaint" element={<Complaint />} />
          <Route path="/MealPreferenceForm" element={<MealPreferenceForm />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;