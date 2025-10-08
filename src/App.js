import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import WelcomePage from './component/WelcomePage';
import Login from './component/login';
import Service from './component/Service';
import Dashboard from './component/Dashboard';
import MyMealsOrderForm from './component/MyMealsOrderForm';
import RenewalForm from './component/RenewalForm';
import PauseResumeMeals from './component/PauseResumeMeals';
import FeedbackForm from './component/FeedbackForm';
import MenuModal from './component/MenuModal';
import CustomerForm from './component/CustomerForm';
import Success from './component/Success';
import Paycash from './component/Paycash';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/order" element={<MyMealsOrderForm />} />
        <Route path="/RenewalForm" element={<RenewalForm />} />
        <Route path="/PauseResumeMeals" element={<PauseResumeMeals />} />
        <Route path="/FeedbackForm" element={<FeedbackForm />} />
        <Route path="/MenuModal" element={<MenuModal />} />
        <Route path="/customer" element={<CustomerForm />} />
        <Route path="/success" element={<Success />} />
        <Route path="/pay" element={<Paycash />} />
        <Route path="/service" element={<Service />} />
      </Routes>
    </Router>
  );
}

export default App;