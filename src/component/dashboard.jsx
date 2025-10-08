
import React, { useState } from 'react';
import StatsCards from './StatsCards';
import RevenueChart from './RevenueChart';
import SalesByCategory from './SalesByCategory';
import SessionsMap from './SessionsMap';
import NewAccountsTable from './NewAccountsTable';
import TransactionsTable from './TransactionsTable';
import Header from './Header';
import Sidebar from './Sidebar';
import '../css/dashboard.css';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className={`dashboard-main ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="dashboard-content">
          <h1 className="dashboard-title">Dashboard</h1>
          <div className="cards-container">
            <div className="card">
              <StatsCards />
            </div>
            <div className="card">
              <RevenueChart />
            </div>
            <div className="card">
              <SalesByCategory />
            </div>
            <div className="card">
              <SessionsMap />
            </div>
          </div>
          <div className="data-tables-container">
            <div className="card">
              <NewAccountsTable />
            </div>
            <div className="card">
              <TransactionsTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
