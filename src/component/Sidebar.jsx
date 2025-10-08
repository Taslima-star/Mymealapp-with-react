import React from 'react';
import { FaHome, FaUserLock, FaExclamationTriangle, FaPuzzlePiece, FaChartBar,FaWpforms, FaTable, FaIcons, FaMapMarkedAlt, FaThLarge } from 'react-icons/fa';
import '../css/sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="logo">Darkone</div>
      <nav className="sidebar-nav">
        <ul>
          <li className="active"><FaHome /> Dashboard</li>
          <li><FaUserLock /> Authentication</li>
          <li><FaExclamationTriangle /> Error Pages</li>
          <li><FaPuzzlePiece /> Base UI</li>
          <li><FaChartBar /> Apex Charts</li>
          <li><FaWpforms /> Forms</li>
          <li><FaTable /> Tables</li>
          <li><FaIcons /> Icons</li>
          <li><FaMapMarkedAlt /> Maps</li>
          <li><FaThLarge /> Layouts</li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
