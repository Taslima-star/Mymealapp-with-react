import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaBug, FaTable, FaChartBar, FaMapMarkedAlt } from 'react-icons/fa';
import '../css/gemini-sidebar.css';

const GeminiSidebar = ({ isOpen }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleSubmenu = (submenu) => {
    setOpenSubmenu(openSubmenu === submenu ? null : submenu);
  };

  return (
    <div
      className={`sidebar-container ${isOpen ? 'open' : ''}`}
    >
      <div className="sidebar-header">
        <h1>Darkone</h1>
      </div>
      <nav className="sidebar-nav">
        <Link
          to="/gemini-dashboard"
          className="sidebar-nav-item"
        >
          <FaHome />
          <span className="mx-3">Dashboard</span>
          <span className="badge">03</span>
        </Link>
        <div
          onClick={() => toggleSubmenu('auth')}
          className="sidebar-nav-item cursor-pointer"
        >
          <FaUser />
          <span className="mx-3">Authentication</span>
        </div>
        {openSubmenu === 'auth' && (
          <div className="sidebar-submenu">
            <Link
              to="/login"
              className="sidebar-submenu-item"
            >
              Login
            </Link>
          </div>
        )}
        <Link
          to="/error"
          className="sidebar-nav-item"
        >
          <FaBug />
          <span className="mx-3">Error Pages</span>
        </Link>
        <Link
          to="/charts"
          className="sidebar-nav-item"
        >
          <FaChartBar />
          <span className="mx-3">Charts</span>
        </Link>
        <Link
          to="/tables"
          className="sidebar-nav-item"
        >
          <FaTable />
          <span className="mx-3">Tables</span>
        </Link>
        <Link
          to="/maps"
          className="sidebar-nav-item"
        >
          <FaMapMarkedAlt />
          <span className="mx-3">Maps</span>
        </Link>
      </nav>
    </div>
  );
};

export default GeminiSidebar;