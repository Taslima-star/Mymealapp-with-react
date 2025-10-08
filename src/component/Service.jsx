// Service.jsx
import React, { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useNavigate } from "react-router-dom";
import "../css/Service.css";

// Import images from src/assets/images
import meal from "../assets/images/meal.png";
import service from "../assets/images/service.png";
import delivery from "../assets/images/delivery.png";
import roll from "../assets/images/roll.png";
import features from "../assets/images/features.png";
import plan from "../assets/images/plan.png";
import menu from "../assets/images/menu.png";
import lunch from "../assets/images/lunch.png";
import dinner from "../assets/images/dinner.png";

const data = [
  { id: "1", title: "Item", image: meal },
  { id: "2", title: "Our Services", image: service },
  { id: "3", title: "Delivery", image: delivery },
  { id: "4", title: "Rollover", image: roll },
  { id: "5", title: "Some More Features", image: features },
  { id: "6", title: "Plan", image: plan },
  { id: "7", title: "Menu", image: menu },
  { id: "8", title: "Lunch", image: lunch },
  { id: "9", title: "Dinner", image: dinner },
];

export default function Service() {
  const navigate = useNavigate();
  const [acknowledgedRefund, setAcknowledgedRefund] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="service-container">
      <h1>Our Services</h1>

      <div className="carousel-wrapper">
        <button className="carousel-btn" onClick={handlePrev}>
          ◀
        </button>

        <div className="service-card">
          <Zoom>
            <img
              src={data[currentIndex].image}
              alt={data[currentIndex].title}
              className="carousel-image"
            />
          </Zoom>
          <p>{data[currentIndex].title}</p>
        </div>

        <button className="carousel-btn" onClick={handleNext}>
          ▶
        </button>
      </div>

      <div className="indicator-container">
        {data.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentIndex === index ? "activeDot" : ""}`}
          />
        ))}
      </div>

      <p className="warning-text">
        Please proceed only if you have confirmed the Delivery Location by
        MYMEALS Team
      </p>

      <div className="switch-container">
        <label className="switch">
          <input
            type="checkbox"
            checked={acknowledgedRefund}
            onChange={(e) => setAcknowledgedRefund(e.target.checked)}
          />
          <span className="slider"></span>
        </label>
        <p style={{ color: "#fff", maxWidth: "400px" }}>
          Not confirming the location and proceeding would lead to NON-REFUND
          if payment is made. <br />
          If not confirmed, send your Delivery location to{" "}
          <a href="tel:+917606006111" style={{ color: "#FFD700" }}>
            +917606006111
          </a>{" "}
          or{" "}
          <a
            href="https://wa.me/917606006111?text=Hello%20I%20want%20to%20confirm%20my%20delivery%20location"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#FFD700" }}
          >
            WhatsApp
          </a>
        </p>
      </div>

      <button
        className={`fill-form-btn ${!acknowledgedRefund ? "disabled" : ""}`}
        disabled={!acknowledgedRefund}
        onClick={() => navigate("/myMealsOrderForm")}
      >
        Fill the form
      </button>
    </div>
  );
}
