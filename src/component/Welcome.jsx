import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import welcomeStyles from "../css/WelcomePage.module.css";
import serviceStyles from "../css/Service.module.css";
import "../css/MyMealsOrderForm.css";
import "../css/Customerform.css";
import "../css/Paycash.css";
import "../css/Success.css";

// Images
import logo from "../assets/images/logo.png";
import bg from "../assets/images/bg.png";
import meal1 from "../assets/images/meal.png";
import service1 from "../assets/images/service.png";
import delivery1 from "../assets/images/delivery.png";
import roll1 from "../assets/images/roll.png";
import features1 from "../assets/images/features.png";
import plan1 from "../assets/images/plan.png";
import menu1 from "../assets/images/menu.png";
import lunch1 from "../assets/images/lunch.png";
import dinner1 from "../assets/images/dinner.png";

/* ===== Carousel Data ===== */
const carouselData = [
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

/* ===== Helper Components ===== */
function InputGroup({ label, type = "text", value, onChange, placeholder, isTextarea }) {
  return (
    <div className="mymeals-input-group">
      <label>{label}</label>
      {isTextarea ? (
        <textarea value={value} onChange={onChange} placeholder={placeholder} />
      ) : (
        <input type={type} value={value} onChange={onChange} placeholder={placeholder} />
      )}
    </div>
  );
}

function MapPreview({ deliveryAddress }) {
  return (
    <div className={`mymeals-map-container ${deliveryAddress ? "active" : ""}`}>
      {deliveryAddress ? (
        <iframe
          title="Delivery Location"
          frameBorder="0"
          src={`https://www.google.com/maps?q=${encodeURIComponent(deliveryAddress)}&output=embed`}
          allowFullScreen
        />
      ) : (
        <p className="mymeals-map-placeholder">🗺️ Enter delivery address to preview map</p>
      )}
    </div>
  );
}

function PlanSelector({ plan, setPlan }) {
  return (
    <div className="mymeals-input-group">
      <label>Select Plan *</label>
      <select value={plan} onChange={(e) => setPlan(e.target.value)}>
        <option value="">Select Plan</option>
        <option value="combo-lunch-dinner">Combo Lunch and Dinner</option>
        <option value="monthly-lunch">Monthly Lunch</option>
        <option value="monthly-dinner">Monthly Dinner</option>
        <option value="combo-all">Combo Lunch, Dinner, Breakfast</option>
      </select>
    </div>
  );
}

/* ===== QR Payment Form ===== */
function QRPaymentForm({
  amount,
  setAmount,
  planName,
  setPlanName,
  transactionId,
  setTransactionId,
  note,
  setNote,
  screenshot,
  setScreenshot,
  handleSubmit,
}) {
  const handlePick = (e) => {
    const file = e.target.files[0];
    if (file) setScreenshot(file);
  };

  return (
    <div className="formContainer">
      <h3 className="subTitle">PATRI FOOD AND BEVERAGES</h3>
      <h4 className="subTitle">36152201</h4>

      <img
        src="https://api.qrserver.com/v1/create-qr-code/?data=36152201&size=200x200"
        alt="QR Code"
        className="qr"
      />

      <InputGroup label="Amount Paid" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <InputGroup label="Plan Name" value={planName} onChange={(e) => setPlanName(e.target.value)} placeholder="Enter your plan name" />

      <div>
        <label className="label">Share the Screenshot *</label>
        <input type="file" className="uploadBox" onChange={handlePick} />
        {screenshot && <p>{screenshot.name}</p>}
      </div>

      <InputGroup label="Transaction ID *" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} />
      <InputGroup label="Note" value={note} onChange={(e) => setNote(e.target.value)} />

      <button className="submitBtn" onClick={handleSubmit}>Submit</button>
    </div>
  );
}

/* ===== Pay Cash Components ===== */
const InputField = ({ label, type = "text", value, onChange, required = false }) => (
  <div className="form-group">
    <label>{label}</label>
    <input type={type} value={value} onChange={onChange} required={required} />
  </div>
);

const TextareaField = ({ label, value, onChange }) => (
  <div className="form-group">
    <label>{label}</label>
    <textarea value={value} onChange={onChange} />
  </div>
);

const RadioGroup = ({ name, options, selected, onChange }) => (
  <div className="form-group">
    <label>Cash Paid</label>
    <div className="radio-group">
      {options.map((opt) => (
        <label key={opt.value}>
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={selected === opt.value}
            onChange={onChange}
          />
          {opt.label}
        </label>
      ))}
    </div>
  </div>
);

const DeliveryBoyDetails = ({ deliveryBoyName, setDeliveryBoyName, deliveryBoyMobile, setDeliveryBoyMobile, date, setDate, time, setTime, note, setNote }) => (
  <>
    <InputField label="Delivery Boy Name *" value={deliveryBoyName} onChange={(e) => setDeliveryBoyName(e.target.value)} required />
    <InputField label="Delivery Boy Mobile *" type="tel" value={deliveryBoyMobile} onChange={(e) => setDeliveryBoyMobile(e.target.value)} required />
    <InputField label="Select Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
    <InputField label="Select Time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
    <TextareaField label="Note" value={note} onChange={(e) => setNote(e.target.value)} />
  </>
);

const OfficeDetails = ({ date, setDate, time, setTime, note, setNote }) => (
  <>
    <InputField label="Select Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
    <InputField label="Select Time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
    <TextareaField label="Note" value={note} onChange={(e) => setNote(e.target.value)} />
  </>
);

/* ===== Payment Options ===== */
function PaymentOptions({ payByQR, setPayByQR, payByCash, setPayByCash, onNext }) {
  return (
    <div className="mymeals-payment-container">
      <h2 className="mymeals-payment-title">Choose Payment Method</h2>

      <div className="mymeals-option-row">
        <input
          type="checkbox"
          checked={payByQR}
          onChange={(e) => {
            setPayByQR(e.target.checked);
            if (e.target.checked) setPayByCash(false);
          }}
        />
        <span className="mymeals-option-text">Pay through QR code</span>
      </div>

      <div className="mymeals-option-row">
        <input
          type="checkbox"
          checked={payByCash}
          onChange={(e) => {
            setPayByCash(e.target.checked);
            if (e.target.checked) setPayByQR(false);
          }}
        />
        <span className="mymeals-option-text">Pay Cash</span>
      </div>

      {(payByQR || payByCash) && (
        <button className="mymeals-btn" onClick={onNext}>Next</button>
      )}
    </div>
  );
}

/* ===== Success Section (integrated) ===== */
function SuccessSection({ onDone }) {
  const [agree, setAgree] = useState(false);
  const [step, setStep] = useState("reminder");

  const handleAgree = () => {
    if (!agree) {
      alert("Please agree before proceeding.");
      return;
    }
    setStep("thankyou");
  };

  return (
    <div className="success-container" style={{ backgroundImage: `url(${bg})` }}>
      {step === "reminder" ? (
        <div className="card">
          <h1 className="title">Thank you for your payment!</h1>
          <p className="subtitle">and for sharing the screenshot 📸</p>

          <h2 className="reminderTitle">Important Reminder ⚠️</h2>

          <p className="paragraph">
            Please note that <span className="bold">not making the full payment</span> or
            making only a <span className="bold">partial payment</span> will result in
            <span className="bold"> no refund</span> and your subscription <span className="bold">will not be activated.</span>
          </p>

          <p className="paragraph">
            Kindly ensure that the amount paid matches the
            <span className="bold"> “Amount Paid”</span> section to avoid any issues.
          </p>

          <p className="paragraph">We appreciate your understanding! 🙏</p>

          <div className="checkboxContainer">
            <input
              type="checkbox"
              checked={agree}
              onChange={() => setAgree(!agree)}
              id="agree"
            />
            <label htmlFor="agree" className="agreeText">Yes, I Agree</label>
          </div>

          <button
            className={`button ${agree ? "active" : ""}`}
            onClick={handleAgree}
            disabled={!agree}
          >
            Continue
          </button>
        </div>
      ) : (
        <div className="thankyou-card">
          <img src={logo} alt="Logo" className="logo" />
          <div className="check">✔</div>
          <h1 className="thankyou">Thank You!</h1>
          <p className="note">
            We will review your payment and get back to you via email shortly.
          </p>
          <button className="mymeals-btn" onClick={onDone}>Back to Home</button>
        </div>
      )}
    </div>
  );
}

/* ===== Main WelcomePage Component ===== */
export default function WelcomePage() {
  const navigate = useNavigate();

  // --- Welcome & Service Carousel States
  const [showService, setShowService] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showOrderForm, setShowOrderForm] = useState(false);

  // --- Order Form States
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [primaryAddress, setPrimaryAddress] = useState("Bomikhal, Jharapada, Bhubaneswar, Odisha, India");
  const [secondaryAddress, setSecondaryAddress] = useState("");
  const [pickupFrom, setPickupFrom] = useState("mymeals");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [plan, setPlan] = useState("");

  // --- Payment States
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [payByCash, setPayByCash] = useState(false);
  const [payByQR, setPayByQR] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // --- QR Payment States
  const [amount, setAmount] = useState("2100");
  const [planName, setPlanName] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [note, setNote] = useState("");
  const [screenshot, setScreenshot] = useState(null);

  // --- Cash Payment States
  const [amountPaid, setAmountPaid] = useState("");
  const [cashPaidOption, setCashPaidOption] = useState("");
  const [deliveryBoyName, setDeliveryBoyName] = useState("");
  const [deliveryBoyMobile, setDeliveryBoyMobile] = useState("");
  const [cashDate, setCashDate] = useState("");
  const [cashTime, setCashTime] = useState("");
  const [cashNote, setCashNote] = useState("");

  /* ===== Handlers ===== */
  const handleWelcomeClick = (action) => {
    if (action === "signup") setShowService(true);
    else if (action === "login") navigate("/login");
  };

  const handleDotClick = (index) => setCurrentIndex(index);

  const handleProceedToPayment = () => {
    if (!plan) {
      alert("Please select a plan to continue.");
      return;
    }
    setShowPaymentOptions(true);
  };

  const handleNext = () => {
    if (payByQR || payByCash) setSelectedPayment(true);
    else alert("Please select a payment method.");
  };

  const handleQRSubmit = () => {
    if (!screenshot || !transactionId || !planName) {
      alert("Please fill all required fields and upload a screenshot.");
      return;
    }
    setShowSuccess(true);
  };

  const handleCashSubmit = () => {
    if (!amountPaid || !cashPaidOption) {
      alert("Please fill all required fields.");
      return;
    }
    setShowSuccess(true);
  };

  const handleSuccessDone = () => {
    // Reset all states and go back to welcome
    setShowService(false);
    setShowOrderForm(false);
    setShowPaymentOptions(false);
    setSelectedPayment(false);
    setShowSuccess(false);
  };

  /* ===== Render ===== */
  if (showSuccess) {
    return <SuccessSection onDone={handleSuccessDone} />;
  }

  return (
    <div style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center", minHeight: "100vh" }}>
      {/* Welcome Screen */}
      {!showService && !showOrderForm && (
        <div className={welcomeStyles.welcomeContainer}>
          <div className={welcomeStyles.logoContainer}>
            <img src={logo} alt="Logo" className={welcomeStyles.logo} />
          </div>
          <header className={welcomeStyles.welcomeHeader}>
            <h1>Healthy Meal</h1>
            <h2>We say it's healthy ...</h2>
            <h2>We mean it ...</h2>
          </header>
          <div className={welcomeStyles.buttonContainer}>
            <button className={welcomeStyles.signupBtn} onClick={() => handleWelcomeClick("signup")}>Sign Up</button>
            <button className={welcomeStyles.loginBtn} onClick={() => handleWelcomeClick("login")}>Login</button>
          </div>
        </div>
      )}

      {/* Services Carousel */}
      {showService && !showOrderForm && (
        <div className={serviceStyles.pageWrapper}>
          <div className={serviceStyles.formCard}>
            <h1 className={serviceStyles.title}>Our Services</h1>
            <div className={serviceStyles.carouselWrapper}>
              <div className={serviceStyles.carouselInner} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {carouselData.map((item) => (
                  <div key={item.id} className={serviceStyles.carouselItem}>
                    <img src={item.image} alt={item.title} className={serviceStyles.carouselImg} />
                    <p className={serviceStyles.imageText}>{item.title}</p>
                  </div>
                ))}
              </div>
              <div className={serviceStyles.indicatorContainer}>
                {carouselData.map((_, index) => (
                  <span key={index} className={`${serviceStyles.dot} ${currentIndex === index ? serviceStyles.activeDot : ""}`} onClick={() => handleDotClick(index)} />
                ))}
              </div>
            </div>

            <p className={serviceStyles.warningText}>
              Please proceed only if you have confirmed the Delivery Location by MYMEALS Team
            </p>

            <div className={serviceStyles.checkboxContainer}>
              <label className={serviceStyles.switch}>
                <input type="checkbox" checked={acknowledged} onChange={(e) => setAcknowledged(e.target.checked)} />
                <span className={serviceStyles.slider}></span>
              </label>
              <p className={serviceStyles.checkboxText}>
                Not confirming the location and proceeding would lead to NON-REFUND if payment is made.
                <br />
                If not confirmed, send your Delivery location to{" "}
                <a href="tel:+917606006111" className={serviceStyles.phoneLink}>+917606006111</a>
              </p>
            </div>

            <button className={`${serviceStyles.button} ${!acknowledged ? serviceStyles.buttonDisabled : ""}`} disabled={!acknowledged} onClick={() => setShowOrderForm(true)}>
              Fill the form
            </button>
          </div>
        </div>
      )}

      {/* Order Form */}
      {showOrderForm && (
        <div className="mymeals-page-bg" style={{ backgroundImage: `url(${bg})` }}>
          <div className="mymeals-form-card">
            <h1 className="mymeals-form-title">MyMeals Order Form</h1>

            <InputGroup label="Name *" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" />
            <InputGroup label="Phone No *" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter phone number" />
            <InputGroup label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email (optional)" />
            <InputGroup label="Pickup From *" value={pickupFrom} onChange={(e) => setPickupFrom(e.target.value)} />
            <InputGroup label="Primary Address *" isTextarea value={primaryAddress} onChange={(e) => setPrimaryAddress(e.target.value)} />
            <MapPreview deliveryAddress={primaryAddress} />
            <InputGroup label="Secondary Address *" isTextarea value={secondaryAddress} onChange={(e) => setSecondaryAddress(e.target.value)} />
            <MapPreview deliveryAddress={secondaryAddress} />
            <InputGroup label="Delivery Time *" type="time" value={deliveryTime} onChange={(e) => setDeliveryTime(e.target.value)} />
            <PlanSelector plan={plan} setPlan={setPlan} />

            {!showPaymentOptions && (
              <button className="mymeals-btn" onClick={handleProceedToPayment}>
                Proceed to Payment
              </button>
            )}

            {showPaymentOptions && !selectedPayment && (
              <PaymentOptions
                payByQR={payByQR}
                setPayByQR={setPayByQR}
                payByCash={payByCash}
                setPayByCash={setPayByCash}
                onNext={handleNext}
              />
            )}

            {selectedPayment && payByQR && (
              <QRPaymentForm
                amount={amount}
                setAmount={setAmount}
                planName={planName}
                setPlanName={setPlanName}
                transactionId={transactionId}
                setTransactionId={setTransactionId}
                note={note}
                setNote={setNote}
                screenshot={screenshot}
                setScreenshot={setScreenshot}
                handleSubmit={handleQRSubmit}
              />
            )}

            {selectedPayment && payByCash && (
              <div className="paycash-card">
                <h1 className="paycash-title">Pay Cash</h1>

                <InputField label="Amount Paid *" type="number" value={amountPaid} onChange={(e) => setAmountPaid(e.target.value)} required />

                <RadioGroup
                  name="cashPaidOption"
                  options={[
                    { value: "deliveryBoy", label: "Delivery Boy" },
                    { value: "office", label: "At Office" },
                  ]}
                  selected={cashPaidOption}
                  onChange={(e) => setCashPaidOption(e.target.value)}
                />

                {cashPaidOption === "deliveryBoy" && (
                  <DeliveryBoyDetails
                    deliveryBoyName={deliveryBoyName}
                    setDeliveryBoyName={setDeliveryBoyName}
                    deliveryBoyMobile={deliveryBoyMobile}
                    setDeliveryBoyMobile={setDeliveryBoyMobile}
                    date={cashDate}
                    setDate={setCashDate}
                    time={cashTime}
                    setTime={setCashTime}
                    note={cashNote}
                    setNote={setCashNote}
                  />
                )}

                {cashPaidOption === "office" && (
                  <OfficeDetails
                    date={cashDate}
                    setDate={setCashDate}
                    time={cashTime}
                    setTime={setCashTime}
                    note={cashNote}
                    setNote={setCashNote}
                  />
                )}

                <button className="mymeals-btn" onClick={handleCashSubmit}>
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
