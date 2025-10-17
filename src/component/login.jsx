import React, { useState } from "react";
import "../css/login.css";
import bg from "../assets/images/bg.png";
import axios from "axios";

const Form = () => {
  const [step, setStep] = useState("email"); // "email" | "otp"
  const [formData, setFormData] = useState({ email: "", password: "", otp: "" });

  // Step 1: Send OTP
  const sendOTP = async (e) => {
    e.preventDefault();
    if (formData.email === "") {
      alert("Please enter your email");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/send-otp", {
        email: formData.email,
      });
      alert(res.data.message);
      setStep("otp");
    } catch (err) {
      alert(err.response?.data?.error || "Failed to send OTP");
    }
  };

  // Step 2: Verify OTP
  const verifyOTP = async (e) => {
    e.preventDefault();
    if (formData.otp === "") {
      alert("Please enter OTP");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/verify-otp", {
        email: formData.email,
        otp: formData.otp,
      });
      alert(res.data.message);
      // You can now navigate to dashboard or home
      setStep("success");
    } catch (err) {
      alert(err.response?.data?.error || "Invalid OTP");
    }
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 className="login-title">My Meals</h1>
      <div className="form-area">
        <p className="form-title">
          {step === "email" ? "SIGN UP / LOGIN" : step === "otp" ? "ENTER OTP" : "SUCCESS"}
        </p>

        {step === "email" && (
          <form>
            <div className="form-group">
              <label className="sub-title" htmlFor="email">Email</label>
              <input
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                id="email"
                className="form-style"
                type="email"
              />
            </div>

            <div className="form-group">
              <label className="sub-title" htmlFor="password">Password</label>
              <input
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                id="password"
                className="form-style"
                type="password"
              />
            </div>

            <button className="btn" onClick={sendOTP}>
              Get OTP
            </button>
          </form>
        )}

        {step === "otp" && (
          <form>
            <div className="form-group">
              <label className="sub-title" htmlFor="otp">Enter OTP</label>
              <input
                placeholder="Enter the OTP sent to your email"
                value={formData.otp}
                onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                id="otp"
                className="form-style"
                type="text"
              />
            </div>
            <button className="btn" onClick={verifyOTP}>Verify OTP</button>
          </form>
        )}

        {step === "success" && (
          <div style={{ textAlign: "center" }}>
            <h2>🎉 Login Successful!</h2>
            <p>Welcome back to My Meals</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
