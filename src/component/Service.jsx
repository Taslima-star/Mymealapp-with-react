import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/Service.module.css";

import meal1 from "../assets/images/meal.png";
import service1 from "../assets/images/service.png";
import delivery1 from "../assets/images/delivery.png";
import roll1 from "../assets/images/roll.png";
import features1 from "../assets/images/features.png";
import plan1 from "../assets/images/plan.png";
import menu1 from "../assets/images/menu.png";
import lunch1 from "../assets/images/lunch.png";
import dinner1 from "../assets/images/dinner.png";
import bgImage from "../assets/images/bg.png";

const data = [
  { id: "1", title: "Item", image: meal1 },
  { id: "2", title: "Our Services", image: service1 },
  { id: "3", title: "Delivery", image: delivery1 },
  { id: "4", title: "Rollover", image: roll1 },
  { id: "5", title: "Some More Features", image: features1 },
  { id: "6", title: "Plan", image: plan1 },
  { id: "7", title: "Menu", image: menu1 },
  { id: "8", title: "Lunch", image: lunch1 },
  { id: "9", title: "Dinner", image: dinner1 },
];

const Service = () => {
  const navigate = useNavigate();
  const [acknowledged, setAcknowledged] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDotClick = (index) => setCurrentIndex(index);

  return (
    <div
      className={styles.pageWrapper}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className={styles.formCard}>
        <h1 className={styles.title}>Our Services</h1>

        {/* Carousel */}
        <div className={styles.carouselWrapper}>
          <div
            className={styles.carouselInner}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {data.map((item) => (
              <div key={item.id} className={styles.carouselItem}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.carouselImg}
                />
                <p className={styles.imageText}>{item.title}</p>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className={styles.indicatorContainer}>
            {data.map((_, index) => (
              <span
                key={index}
                className={`${styles.dot} ${
                  currentIndex === index ? styles.activeDot : ""
                }`}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </div>
        </div>

        {/* Warning */}
        <p className={styles.warningText}>
          Please proceed only if you have confirmed the Delivery Location by
          MYMEALS Team
        </p>

        {/* Acknowledgment */}
        <div className={styles.checkboxContainer}>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={acknowledged}
              onChange={(e) => setAcknowledged(e.target.checked)}
            />
            <span className={styles.slider}></span>
          </label>
          <p className={styles.checkboxText}>
            Not confirming the location and proceeding would lead to NON-REFUND
            if payment is made.
            <br />
            If not confirmed, send your Delivery location to{" "}
            <a href="tel:+917606006111" className={styles.phoneLink}>
              +917606006111
            </a>
          </p>
        </div>

        {/* Proceed Button */}
        <button
          className={`${styles.button} ${
            !acknowledged ? styles.buttonDisabled : ""
          }`}
          disabled={!acknowledged}
          onClick={() => navigate("/MyMealsOrderForm")}
        >
          Fill the form
        </button>
      </div>
    </div>
  );
};

export default Service;
