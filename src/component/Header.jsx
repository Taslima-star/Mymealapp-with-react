import React, { useState } from 'react';
import { FaSearch, FaBell, FaUserCircle, FaBars, FaSun, FaMoon } from 'react-icons/fa';
import '../css/header.css';

const Header = ({ toggleSidebar }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    // Logic to toggle dark mode class on body
    if (isDarkTheme) {
      document.body.classList.remove('dark');
    } else {
      document.body.classList.add('dark');
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="header-container">
      <div className="header-left">
        <button onClick={toggleSidebar} className="menu-button">
          <FaBars className="w-6 h-6" />
        </button>
        <div className="search-container">
          <span className="search-icon">
            <FaSearch className="w-5 h-5" />
          </span>
          <input
            className="search-input"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>

      <div className="header-right">
        <button onClick={toggleTheme} className="theme-toggle-button">
          {isDarkTheme ? <FaSun className="w-6 h-6" /> : <FaMoon className="w-6 h-6" />}
        </button>

        <div className="relative">
          <button className="notification-button">
            <FaBell className="w-6 h-6" />
          </button>
        </div>

        <div className="dropdown-container">
          <button
            onClick={toggleDropdown}
            className="dropdown-button"
          >
            <FaUserCircle className="w-full h-full object-cover" />
          </button>

          {isDropdownOpen && (
            <div className="dropdown-menu">
              <a
                href="#"
                className="dropdown-item"
              >
                Profile
              </a>
              <a
                href="#"
                className="dropdown-item"
              >
                Settings
              </a>
              <a
                href="#"
                className="dropdown-item"
              >
                Log out
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;