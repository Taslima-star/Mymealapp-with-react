import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';

// ===== Lazy load components =====
// Make sure all of these components use `export default`
const WelcomePage = lazy(() => import("./component/Welcome"));
const Login = lazy(() => import("./component/login"));
const Dashboard = lazy(() => import("./component/Dashboard"));
const RenewalForm = lazy(() => import("./component/RenewalPayment/RenewalPayment"));
const PauseResumeMeals = lazy(() => import("./component/PauseResumeMeals/PauseResumeMeals"));
const FeedbackForm = lazy(() => import("./component/FeedbackForm/FeedbackForm"));
const MenuModal = lazy(() => import("./component/MenuModal"));


const DeliveryLocationTable = lazy(() => import("./component/DeliveryLocationTable"));
const PauseResumeTable = lazy(() => import("./component/PauseResumeTable"));

const UpdateContactForm = lazy(() => import("./component/UpdateContactForm/UpdateContactForm"));
const Complaint = lazy(() => import("./component/Complaint/Complaint"));
const MealPreferenceForm = lazy(() => import("./component/MealPreferenceForm/MealPreferenceForm"));
const Changedeliverylocation = lazy(() => import("./component/ChangeDeliveryLocation/Changedeliverylocation"));
const TransactionsTable = lazy(() => import("./component/TransactionsTable"));
const ComplaintTable = lazy(() => import("./component/ComplaintTable"));
const RenewalPaymentTable = lazy(() => import("./component/RenewalPaymentTable"));
const MealPreferenceTable = lazy(() => import("./component/MealPreferenceTable"));
const UpdateContactTable = lazy(() => import("./component/UpdateContactTable"));
const FeedbackTable = lazy(() => import("./component/FeedbackTable"));

const App = () => {
  return (
    <Router>
      {/* Suspense fallback will show while lazy components load */}
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<Login />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Forms */}
          <Route path="/RenewalPayment" element={<RenewalForm />} />
          <Route path="/PauseResumeMeals" element={<PauseResumeMeals />} />
          <Route path="/FeedbackForm" element={<FeedbackForm />} />
          
          <Route path="/UpdateContactForm" element={<UpdateContactForm />} />
          <Route path="/MealPreferenceForm" element={<MealPreferenceForm />} />
          <Route path="/Changedeliverylocation" element={<Changedeliverylocation />} />
          

          {/* Tables */}
          <Route path="/TransactionsTable" element={<TransactionsTable />} />
          <Route path="/DeliveryLocationTable" element={<DeliveryLocationTable />} />
          <Route path="/PauseResumeTable" element={<PauseResumeTable />} />
          <Route path="/ComplaintTable" element={<ComplaintTable />} />
          <Route path="/RenewalPaymentTable" element={<RenewalPaymentTable />} />
          <Route path="/MealPreferenceTable" element={<MealPreferenceTable />} />
          <Route path="/UpdateContactTable" element={<UpdateContactTable />} />
          <Route path="/FeedbackTable" element={<FeedbackTable />} />

          {/* Other */}
          <Route path="/menu" element={<MenuModal />} />
       
          <Route path="/complaint" element={<Complaint />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
