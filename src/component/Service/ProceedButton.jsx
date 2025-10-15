import React from "react";
import styles from "../../css/Service.module.css";

const ProceedButton = ({ acknowledged, onClick }) => {
  return (
    <div className={styles.buttonContainer}>
      <button
        className={`${styles.proceedBtn} ${!acknowledged ? styles.disabledBtn : ""}`}
        onClick={onClick}
        disabled={!acknowledged}
      >
        Fill the Form
      </button>
    </div>
  );
};

export default ProceedButton;
