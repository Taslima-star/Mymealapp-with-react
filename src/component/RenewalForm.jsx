import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import style from "../css/Renewal.module.css";
import logo from "../assets/images/logo.png";
import qrCode from "../assets/images/qrcode.png";

const RenewalPayment = () => {
  const [step, setStep] = useState(1);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      orderNo: "",
      location: "Old",
      locationConfirmed: false,
      name: "",
      email: "",
      phone: "",
      address: "",
      plan: "",
      renewalMonth: "",
      amountPaid: "",
      screenshot: null,
      transactionId: "",
      cashPaid: false,
      paymentMode: "", // Delivery Boy / At Office
      deliveryBoyName: "",
      deliveryBoyPhone: "",
      deliveryDate: "",
      deliveryTime: "",
      officeDate: "",
      officeTime: "",
      note: "",
      agree: false,
    },
  });

  const watchLocation = watch("location");
  const watchPlan = watch("plan");
  const watchCashPaid = watch("cashPaid");
  const watchPaymentMode = watch("paymentMode");
  const watchAgree = watch("agree");

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const onSubmitPayment = (data) => {
    console.log("Payment Data:", data);
    setPaymentConfirmed(true);
    reset();
    setStep(1);
  };

  if (paymentConfirmed) {
    return (
      <div className={style.thankYouContainer}>
        <div className={style.thankYouBox}>
          <img src={logo} alt="MYMEALS Logo" className={style.logo} />
          <h2 className={style.thankYouTitle}>Thank You! 🎉</h2>
          <p className={style.thankYouText}>
            Your payment has been received successfully.
          </p>
          <div className={style.reminder}>
            <strong>Important Reminder 🔔</strong>
            <p>Partial payments may result in non-activation of your subscription.</p>
            <p>Ensure that the amount paid matches the total to avoid issues.</p>
            <p>We will review your payment and contact you via email shortly.</p>
          </div>
          <button
            className={style.backBtn}
            onClick={() => setPaymentConfirmed(false)}
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={style.pageContainer}>
      {/* Steps 1–3 */}
      {step >= 1 && step <= 3 && (
        <form className={style.formBox} onSubmit={(e) => e.preventDefault()}>
          <div className={style.logoContainer}>
            <img src={logo} alt="MYMEALS Logo" className={style.logo} />
          </div>
          <h2 className={style.heading}>Renewal Form</h2>

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <label className={style.label}>Order No.</label>
              <Controller
                name="orderNo"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    className={style.input}
                    placeholder="Enter Order Number"
                    required
                  />
                )}
              />

              <label className={style.label}>Location *</label>
              <p className={style.subtext}>
                Proceed only if continuing with the same location or confirmed new
                location with <span className={style.brand}>MYMEALS Team</span>.
              </p>

              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <div className={style.radioGroup}>
                    <label className={style.radioOption}>
                      <input
                        type="radio"
                        value="Old"
                        checked={field.value === "Old"}
                        onChange={() => field.onChange("Old")}
                      />
                      Old
                    </label>
                    <label className={style.radioOption}>
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

              {watchLocation === "New" ? (
                <Controller
                  name="locationConfirmed"
                  control={control}
                  render={({ field }) => (
                    <div className={style.checkboxGroup}>
                      <label className={style.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                        I have confirmed the delivery location
                      </label>
                      {field.value && (
                        <button
                          type="button"
                          className={style.nextBtn}
                          onClick={handleNext}
                        >
                          Next
                        </button>
                      )}
                    </div>
                  )}
                />
              ) : (
                <button
                  type="button"
                  className={style.nextBtn}
                  onClick={handleNext}
                >
                  Next
                </button>
              )}
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              {["name", "email", "phone", "address"].map((fieldName, idx) => (
                <Controller
                  key={idx}
                  name={fieldName}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) =>
                    fieldName === "address" ? (
                      <textarea
                        {...field}
                        className={style.input}
                        placeholder="Address *"
                        required
                      />
                    ) : (
                      <input
                        {...field}
                        type={
                          fieldName === "email"
                            ? "email"
                            : fieldName === "phone"
                            ? "tel"
                            : "text"
                        }
                        className={style.input}
                        placeholder={
                          fieldName.charAt(0).toUpperCase() +
                          fieldName.slice(1) +
                          " *"
                        }
                        required
                      />
                    )
                  }
                />
              ))}
              <div className={style.stepBtns}>
                <button
                  type="button"
                  className={style.backBtn}
                  onClick={handleBack}
                >
                  Back
                </button>
                <button
                  type="button"
                  className={style.nextBtn}
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <label className={style.label}>Select Plan *</label>
              <p className={style.subtext}>
                Select your Existing plan or select plan you want to continue
                further.
              </p>
              <Controller
                name="plan"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <select {...field} className={style.select}>
                    <option value="">-- Choose Plan --</option>
                    <option value="comboLunchDinnerBreakfast">
                      Combo Lunch, Dinner & Breakfast
                    </option>
                    <option value="comboLunchDinner">Combo Lunch & Dinner</option>
                    <option value="monthlyLunch">Monthly Lunch</option>
                    <option value="monthlyDinner">Monthly Dinner</option>
                    <option value="monthlyBreakfast">Monthly Breakfast</option>
                  </select>
                )}
              />

              {watchPlan && (
                <>
                  <p className={style.subtext}>
                    If it is your 2nd month payment then its your 1st renewal or
                    for 3rd month payment its your 2nd renewal and so on
                  </p>
                  <Controller
                    name="renewalMonth"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className={style.input}
                        placeholder="Renewal Info *"
                        required
                      />
                    )}
                  />
                </>
              )}

              <div className={style.stepBtns}>
                <button
                  type="button"
                  className={style.backBtn}
                  onClick={handleBack}
                >
                  Back
                </button>
                {watchPlan && (
                  <button
                    type="button"
                    className={style.nextBtn}
                    onClick={handleNext}
                  >
                    Proceed to Payment
                  </button>
                )}
              </div>
            </>
          )}
        </form>
      )}

      {/* STEP 4: PAYMENT */}
      {step === 4 && (
        <form className={style.formBox} onSubmit={handleSubmit(onSubmitPayment)}>
          <Controller
            name="cashPaid"
            control={control}
            render={({ field }) => (
              <div className={style.checkboxGroup}>
                <input type="checkbox" {...field} checked={field.value} id="cashPaid" />
                <label htmlFor="cashPaid">Cash Paid</label>
              </div>
            )}
          />

          {!watchCashPaid && (
            <div className={style.paymentContainer}>
              <div className={style.paymentHeader}>QR Payment</div>
              <div className={style.merchantCard}>
                <div>PATR FOOD AND BEVERAGES</div>
                <div className={style.account}>36152201</div>
                <img src={qrCode} alt="Scan QR" className={style.qrCode} />
                <div>Scan & Pay</div>
              </div>

              <Controller
                name="amountPaid"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    placeholder="Amount Paid"
                    className={style.input}
                    required
                  />
                )}
              />
              <Controller
                name="transactionId"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Transaction ID *"
                    className={style.input}
                    required
                  />
                )}
              />
              <Controller
                name="note"
                control={control}
                render={({ field }) => (
                  <input {...field} type="text" placeholder="Note" className={style.input} />
                )}
              />
              <Controller
                name="screenshot"
                control={control}
                render={({ field }) => (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => field.onChange(e.target.files[0])}
                    className={style.inputFile}
                  />
                )}
              />
            </div>
          )}

          {watchCashPaid && (
            <div className={style.paymentContainer}>
              <Controller
                name="paymentMode"
                control={control}
                render={({ field }) => (
                  <div className={style.radioGroup}>
                    <label className={style.radioOption}>
                      <input
                        type="radio"
                        value="Delivery Boy"
                        checked={field.value === "Delivery Boy"}
                        onChange={() => field.onChange("Delivery Boy")}
                      />
                      Delivery Boy
                    </label>
                    <label className={style.radioOption}>
                      <input
                        type="radio"
                        value="At Office"
                        checked={field.value === "At Office"}
                        onChange={() => field.onChange("At Office")}
                      />
                      At Office
                    </label>
                  </div>
                )}
              />

              {watchPaymentMode === "Delivery Boy" && (
                <>
                  <Controller
                    name="deliveryBoyName"
                    control={control}
                    render={({ field }) => (
                      <input {...field} type="text" placeholder="Delivery Boy Name" className={style.input} />
                    )}
                  />
                  <Controller
                    name="deliveryBoyPhone"
                    control={control}
                    render={({ field }) => (
                      <input {...field} type="tel" placeholder="Delivery Boy Phone" className={style.input} />
                    )}
                  />
                  <Controller
                    name="deliveryDate"
                    control={control}
                    render={({ field }) => (
                      <input {...field} type="date" className={style.input} />
                    )}
                  />
                  <Controller
                    name="deliveryTime"
                    control={control}
                    render={({ field }) => (
                      <input {...field} type="time" className={style.input} />
                    )}
                  />
                  <Controller
                    name="amountPaid"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <input {...field} type="number" placeholder="Amount Paid" className={style.input} required />
                    )}
                  />
                  <Controller
                    name="note"
                    control={control}
                    render={({ field }) => (
                      <input {...field} type="text" placeholder="Note" className={style.input} />
                    )}
                  />
                </>
              )}

              {watchPaymentMode === "At Office" && (
                <>
                  <Controller
                    name="officeDate"
                    control={control}
                    render={({ field }) => (
                      <input {...field} type="date" className={style.input} />
                    )}
                  />
                  <Controller
                    name="officeTime"
                    control={control}
                    render={({ field }) => (
                      <input {...field} type="time" className={style.input} />
                    )}
                  />
                  <Controller
                    name="note"
                    control={control}
                    render={({ field }) => (
                      <input {...field} type="text" placeholder="Note" className={style.input} />
                    )}
                  />
                </>
              )}
            </div>
          )}

          <div className={style.checkboxGroup}>
            <Controller
              name="agree"
              control={control}
              render={({ field }) => (
                <>
                  <input type="checkbox" {...field} checked={field.value} id="agree" />
                  <label htmlFor="agree">Yes I Agree</label>
                </>
              )}
            />
          </div>

          <div className={style.stepBtns}>
            <button type="button" className={style.backBtn} onClick={handleBack}>
              Back
            </button>
            <button type="submit" className={style.submitBtn} disabled={!watchAgree}>
              Submit Payment
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default RenewalPayment;
