import React from 'react';
import StatsCards from './StatsCards';
import RevenueChart from './RevenueChart';
import SalesByCategory from './SalesByCategory';
import SessionsMap from './SessionsMap';
import NewAccountsTable from './NewAccountsTable';
import TransactionsTable from './TransactionsTable';
import Sidebar from './Sidebar';
import '../css/dashboard.css';

const Dashboard = () => {
  return (
    <>
      <Sidebar />
      <div className="dashboard-container">
        <h2>Dashboard</h2>
        <StatsCards />

        <div className="dashboard-grid">
          <RevenueChart />
          <SalesByCategory />
          <SessionsMap />
        </div>

        <div className="dashboard-grid">
          <NewAccountsTable />
          <TransactionsTable />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
