import React, { useState } from 'react';
import '../css/login.css';
import bg from '../assets/images/bg.png'; 
import axios from 'axios';

const Form = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

 
  const loginchk = async (e) => {
    e.preventDefault();

    if (formData.email === '' || formData.password === '') {
      alert('Please fill in all fields');
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/users", formData);
      alert(res.data.message);
      setFormData({ email: "", password: "" }); 
    } catch (err) {
      alert(err.response?.data?.error || "Error submitting form");
    }
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${bg})`,   
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1 className="login-title">My Meals</h1>
      <div className="form-area">
        <p className="form-title">SIGN UP</p>
        <form>
          {/* Email */}
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

          {/* Password */}
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

          {/* Submit */}
          <div>
            <button className="btn" onClick={loginchk}>SIGN UP</button>
            <p>
              Have an Account? <a className="link" href="#">Login Here!</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
