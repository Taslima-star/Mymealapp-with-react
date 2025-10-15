import React from "react";
import {
  FaHome,
  FaUserAlt,
  FaRedoAlt,
  FaUtensils,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaExclamationCircle,
  FaCommentDots,
} from "react-icons/fa";
import "../css/sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="logo">MyMeal</div>
      <nav className="sidebar-nav">
        <ul>
          <li className="active">
            <FaHome /> Dashboard
          </li>
          <li>
            <FaUserAlt /> <a href="PauseResumeMeals">Pause and Resume</a>
          </li>
          <li>
            <FaRedoAlt /> <a href="RenewalPayment">Renewal</a>
          </li>
          <li>
            <FaUtensils /> Change Your Meal Preference
          </li>
          <li>
            <FaMapMarkerAlt /> Change Your Delivery Location
          </li>
          <li>
            <FaPhoneAlt /> Update Contact No.
          </li>
          <li>
            <FaExclamationCircle /> Raise a Complaint
          </li>
          <li>
            <FaCommentDots /> Feedback
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
