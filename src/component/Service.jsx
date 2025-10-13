import React, { useState } from "react";
import { CCarousel, CCarouselItem, CImage } from "@coreui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../css/Service.module.css";

import service from "../assets/images/service.png";
import delivery from "../assets/images/delivery.png";
import features from "../assets/images/features.png";
import dinner from "../assets/images/dinner.png";
import lunch from "../assets/images/lunch.png";
import meal from "../assets/images/meal.png";
import menu from "../assets/images/menu.png";
import plan from "../assets/images/plan.png";
import roll from "../assets/images/roll.png";
import { useNavigate } from "react-router-dom";

/* ✅ Carousel Component */
const CarouselSlides = () => {
  const images = [dinner, delivery, features, service, lunch, meal, menu, plan, roll];

  return (
    <CCarousel controls indicators interval={2500} className={styles.carouselCustom}>
      {images.map((img, i) => (
        <CCarouselItem key={i}>
          <CImage className={styles.carouselImg} src={img} alt={`slide ${i + 1}`} />
        </CCarouselItem>
      ))}
    </CCarousel>
  );
};

/* ✅ Main Service Page */
const ServicePage = () => {
  const [acknowledged, setAcknowledged] = useState(false);
  const navigate = useNavigate();

  const handleProceed = () => {
    if (acknowledged) {
      navigate("/MyMealsOrderForm");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>Our Services</h1>

      <CarouselSlides />

      <p className={styles.warning}>
        ⚠️ Please proceed only if you have confirmed the Delivery Location with{" "}
        <span className={styles.brand}>MYMEALS Team</span>.
      </p>

      <div className={styles.toggleSection}>
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={acknowledged}
            onChange={(e) => setAcknowledged(e.target.checked)}
          />
          <span className={styles.slider}></span>
        </label>

        <p className={styles.note}>
          Proceeding without confirmation may lead to a <b>NON-REFUND</b> if payment is made. If not
          confirmed, please send your Delivery Location to{" "}
          <a
            href="tel:+917606006111"
            className={styles.phoneLink}
            onContextMenu={(e) => {
              e.preventDefault();
              window.open(
                "https://wa.me/917606006111?text=Hello%20I%20want%20to%20confirm%20my%20delivery%20location"
              );
            }}
          >
            +91 7606006111
          </a>
        </p>
      </div>

      <div className={styles.buttonContainer}>
        <button
          className={`${styles.proceedBtn} ${!acknowledged ? styles.disabledBtn : ""}`}
          onClick={handleProceed}
          disabled={!acknowledged}
        >
          Fill the Form
        </button>
      </div>
    </div>
  );
};

export default ServicePage;
