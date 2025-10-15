import React from "react";

const FeedbackHeader = ({ logo }) => (
  <div className="header">
    <img src={logo} alt="Logo" className="logo" />
    <h2 className="title">Customer Feedback Form</h2>
  </div>
);

export default FeedbackHeader;
