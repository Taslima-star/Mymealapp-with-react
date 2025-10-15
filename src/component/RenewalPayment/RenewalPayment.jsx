import { useState } from "react";
import { useForm } from "react-hook-form";

import Header from "../Header";
import Sidebar from "../Sidebar";

import "../../css/dashboard.css";
import bgImage from "../../assets/images/bg.png"; 

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import ThankYou from "./ThankYou";

const RenewalPayment = () => {
  const [step, setStep] = useState(1);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
      paymentMode: "",
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

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const onSubmitPayment = (data) => {
    console.log("Payment Data:", data);
    setPaymentConfirmed(true);
    reset();
    setStep(1);
  };

  // Payment confirmation view
  if (paymentConfirmed) {
    return (
      <div className="dashboard-layout">
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <div className={`dashboard-main ${isSidebarOpen ? "sidebar-open" : ""}`}>
          <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          <main className="dashboard-content">
            <ThankYou setPaymentConfirmed={setPaymentConfirmed} />
          </main>
        </div>
      </div>
    );
  }

  // Main step-based form
  return (
    <div className="dashboard-layout">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className={`dashboard-main ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main
          className="dashboard-content"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="empty-dashboard">
            {step === 1 && <StepOne control={control} watch={watch} handleNext={handleNext} />}
            {step === 2 && (
              <StepTwo control={control} handleNext={handleNext} handleBack={handleBack} />
            )}
            {step === 3 && (
              <StepThree
                control={control}
                watch={watch}
                handleNext={handleNext}
                handleBack={handleBack}
              />
            )}
            {step === 4 && (
              <StepFour
                control={control}
                handleSubmit={handleSubmit}
                onSubmitPayment={onSubmitPayment}
                watch={watch}
                handleBack={handleBack}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default RenewalPayment;
