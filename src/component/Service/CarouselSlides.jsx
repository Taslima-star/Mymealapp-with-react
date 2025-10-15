import React from "react";
import { CCarousel, CCarouselItem, CImage } from "@coreui/react";
import styles from "../../css/Service.module.css";

import service from "../../assets/images/service.png";
import delivery from "../../assets/images/delivery.png";
import features from "../../assets/images/features.png";
import dinner from "../../assets/images/dinner.png";
import lunch from "../../assets/images/lunch.png";
import meal from "../../assets/images/meal.png";
import menu from "../../assets/images/menu.png";
import plan from "../../assets/images/plan.png";
import roll from "../../assets/images/roll.png";

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

export default CarouselSlides;
