import React, { useState } from 'react';
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

          {/* You can add your dashboard widgets or content here later */}
          <div className="empty-dashboard">
            <p></p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
