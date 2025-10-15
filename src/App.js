import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';

// Lazy load components (only load when visited)
const WelcomePage = lazy(() => import("./component/WelcomePage"));
const Login = lazy(() => import("./component/login"));
const Service = lazy(() => import("./component/Service"));
const Dashboard = lazy(() => import("./component/Dashboard"));
const MyMealsOrderForm = lazy(() => import("./component/MyMealsOrderForm/MyMealsOrderForm"));
const RenewalForm = lazy(() => import("./component/RenewalPayment/RenewalPayment"));
const PauseResumeMeals = lazy(() => import("./component/PauseResumeMeals/PauseResumeMeals"));
const FeedbackForm = lazy(() => import("./component/FeedbackForm/FeedbackForm"));
const MenuModal = lazy(() => import("./component/MenuModal"));
const CustomerForm = lazy(() => import("./component/CustomerForm/CustomerForm"));
const Success = lazy(() => import("./component/Success"));
const DeliveryLocationTable = lazy(() => import("./component/DeliveryLocationTable"));
const PauseResumeTable = lazy(() => import("./component/PauseResumeTable"));
const Paycash = lazy(() => import("./component/Paycash/Paycash"));
const UpdateContactForm = lazy(() => import("./component/UpdateContactForm/UpdateContactForm"));
const Complaint = lazy(() => import("./component/Complaint/Complaint"));
const MealPreferenceForm = lazy(() => import("./component/MealPreferenceForm/MealPreferenceForm"));
// Updated path: make sure folder and file names match exactly
const Changedeliverylocation = lazy(() => import("./component/ChangeDeliveryLocation/Changedeliverylocation"));
const  TransactionsTable = lazy(() => import("./component/TransactionsTable"));
const  ComplaintTable = lazy(() => import("./component/ComplaintTable"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/service" element={<Service />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/MyMealsOrderForm" element={<MyMealsOrderForm />} />
          <Route path="/RenewalPayment" element={<RenewalForm />} />
          <Route path="/PauseResumeMeals" element={<PauseResumeMeals />} />
          <Route path="/FeedbackForm" element={<FeedbackForm />} />
          <Route path="/menu" element={<MenuModal />} />
          <Route path="/CustomerForm" element={<CustomerForm />} />
          <Route path="/success" element={<Success />} />
          <Route path="/paycash" element={<Paycash />} />
          <Route path="/UpdateContactForm" element={<UpdateContactForm />} />
          <Route path="/complaint" element={<Complaint />} />
          <Route path="/MealPreferenceForm" element={<MealPreferenceForm />} />
          <Route path="/Changedeliverylocation" element={<Changedeliverylocation />} />
          <Route path="/TransactionsTable" element={<TransactionsTable />} />
          <Route path="/DeliveryLocationTable" element={<DeliveryLocationTable />} />
          <Route path="/PauseResumeTable" element={<PauseResumeTable />} />
           <Route path="/ComplaintTable" element={<ComplaintTable />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
