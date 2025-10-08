import React from "react";
import "../css/WelcomePage.css";
import logo from "../assets/images/logo.png";
import bg from "../assets/images/bg.png"; // ✅ import background

const WelcomePage = () => {
  const handleWelcomeClick = () => {
    alert("Welcome! Redirecting to login...");
  };

  return (
    <div
      className="welcome-container"
      style={{
        backgroundImage: `url(${bg})`, // ✅ use imported bg
      }}
    >
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <header className="welcome-header">
        <h1><b>Healthy Meal</b></h1>
        <h2>We say it's healthy ...</h2>
        <h2><b>We mean it ...</b></h2>
      </header>

      <div className="welcome-button-container">
        <button className="welcome-btn" onClick={handleWelcomeClick}>
          Welcome
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
