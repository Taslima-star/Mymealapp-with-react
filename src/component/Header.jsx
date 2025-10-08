import React from 'react';
import { FaBars, FaBell, FaMoon } from 'react-icons/fa';
import '../css/header.css';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="dashboard-header">
      <div className="left-section">
        <button className="menu-toggle" onClick={toggleSidebar}>
          <FaBars />
        </button>
      </div>
      <div className="header-right">
        <button className="dark-mode-toggle">
          <FaMoon />
        </button>
        <div className="notification-bell">
          <FaBell />
          <span className="badge">0</span>
        </div>
        <div className="profile-avatar">
          <img src="https://i.pravatar.cc/40" alt="User Avatar" />
        </div>
      </div>
    </header>
  );
};

export default Header;
