import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/WelcomePage.module.css"; // CSS Module
import logo from "../assets/images/logo.png";
import bg from "../assets/images/bg.png";

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleWelcomeClick = (action) => {
    if (action === "Service") navigate("/service");
    else if (action === "login") navigate("/login");
  };

  return (
    <div
      className={styles.welcomeContainer}
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Logo */}
      <div className={styles.logoContainer}>
        <img src={logo} alt="Logo" className={styles.logo} />
      </div>

      {/* Header */}
      <header className={styles.welcomeHeader}>
        <h1>Healthy Meal</h1>
        <h2>We say it's healthy ...</h2>
        <h2>We mean it ...</h2>
      </header>

      {/* Buttons */}
      <div className={styles.buttonContainer}>
        <button
          className={styles.signupBtn}
          onClick={() => handleWelcomeClick("Service")}
        >
          Sign Up
        </button>
        <button
          className={styles.loginBtn}
          onClick={() => handleWelcomeClick("login")}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
