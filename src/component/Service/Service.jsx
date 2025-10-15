import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../css/Service.module.css";
import CarouselSlides from "./CarouselSlides";
import AcknowledgmentToggle from "./AcknowledgmentToggle";
import ProceedButton from "./ProceedButton";

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

      <AcknowledgmentToggle acknowledged={acknowledged} setAcknowledged={setAcknowledged} />

      <ProceedButton acknowledged={acknowledged} onClick={handleProceed} />
    </div>
  );
};

export default ServicePage;
