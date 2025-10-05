// src/components/Sidebar.jsx
import React from 'react';
import { FaHome, FaUser, FaBug, FaTable, FaChartBar, FaMapMarkedAlt } from 'react-icons/fa';
import '../css/sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">Darkone</div>
      <ul className="menu">
        <li><FaHome /> Dashboard <span className="badge">03</span></li>
        <li><FaUser /> Authentication</li>
        <li><FaBug /> Error Pages</li>
        <li><FaChartBar /> Charts</li>
        <li><FaTable /> Tables</li>
        <li><FaMapMarkedAlt /> Maps</li>
      </ul>
    </div>
  );
};

export default Sidebar;
