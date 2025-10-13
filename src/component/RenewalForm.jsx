import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import styles from "../css/RenewalForm.module.css";
import logo from "../assets/images/logo.png";

const RenewalForm = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      orderNo: "",
      location: "Old",
    },
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    setIsSubmitted(true);
    reset();
  };

  const handleBack = () => {
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className={styles.thankYouContainer}>
        <div className={styles.thankYouBox}>
          <img src={logo} alt="MYMEALS Logo" className={styles.logo} />
          <h2 className={styles.thankYouTitle}>Thank You! 🎉</h2>
          <p className={styles.thankYouText}>
            Thank you for showing concern. Your renewal request has been received.
            <br />
            You’ll get a confirmation via email shortly.
          </p>
          <button className={styles.backBtn} onClick={handleBack}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formBox}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <img src={logo} alt="MYMEALS Logo" className={styles.logo} />
        </div>

        <h2 className={styles.heading}>Renewal</h2>

        {/* Order No */}
        <label className={styles.label}>Order No.</label>
        <Controller
          name="orderNo"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              className={styles.input}
              placeholder="Enter your Order Number"
              required
            />
          )}
        />

        {/* Location */}
        <label className={styles.label}>Location *</label>
        <p className={styles.subtext}>
          Please proceed only if you are continuing with the same delivery
          location or have confirmed the new Delivery Location with the{" "}
          <span className={styles.brand}>MYMEALS Team</span>.
        </p>

        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <div className={styles.radioGroup}>
              <label className={styles.radioOption}>
                <input
                  type="radio"
                  value="Old"
                  checked={field.value === "Old"}
                  onChange={() => field.onChange("Old")}
                />
                Old
              </label>
              <label className={styles.radioOption}>
                <input
                  type="radio"
                  value="New"
                  checked={field.value === "New"}
                  onChange={() => field.onChange("New")}
                />
                New
              </label>
            </div>
          )}
        />

        {/* Submit Button */}
        <button type="submit" className={styles.submitBtn}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default RenewalForm;
