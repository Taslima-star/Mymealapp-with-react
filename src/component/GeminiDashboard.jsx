
import React, { useState } from 'react';
import StatsCards from './StatsCards';
import RevenueChart from './RevenueChart';
import SalesByCategory from './SalesByCategory';
import SessionsMap from './SessionsMap';
import NewAccountsTable from './NewAccountsTable';
import TransactionsTable from './TransactionsTable';
import Header from './Header';
import GeminiSidebar from './GeminiSidebar';
import '../css/gemini-dashboard.css';

const GeminiDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-layout">
      <GeminiSidebar isOpen={isSidebarOpen} />
      <div className="dashboard-main">
        <Header toggleSidebar={toggleSidebar} />
        <main className="dashboard-content">
          <StatsCards />
          <div className="grid-2-cols">
            <RevenueChart />
            <SalesByCategory />
          </div>
          <div className="my-6">
            <SessionsMap />
          </div>
          <div className="grid-2-cols">
            <NewAccountsTable />
            <TransactionsTable />
          </div>
        </main>
      </div>
    </div>
  );
};

export default GeminiDashboard;
