import React from "react";
import styles from "../../css/Service.module.css";

const AcknowledgmentToggle = ({ acknowledged, setAcknowledged }) => {
  return (
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
  );
};

export default AcknowledgmentToggle;
