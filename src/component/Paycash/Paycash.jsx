import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import RadioGroup from "./RadioGroup";
import DeliveryBoyDetails from "./DeliveryBoyDetails";
import OfficeDetails from "./OfficeDetails";
import "../../css/Paycash.css";

import backgroundImage from "../../assets/images/bg.png";

const Paycash = () => {
  const navigate = useNavigate();

  const [amountPaid, setAmountPaid] = useState("");
  const [cashPaidOption, setCashPaidOption] = useState("");
  const [deliveryBoyName, setDeliveryBoyName] = useState("");
  const [deliveryBoyMobile, setDeliveryBoyMobile] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/success");
  };

  return (
    <div
      className="paycash-bg"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="paycash-card">
        <h1 className="paycash-title">Pay Cash</h1>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Amount Paid *"
            type="number"
            value={amountPaid}
            onChange={(e) => setAmountPaid(e.target.value)}
            required
          />

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
              date={date}
              setDate={setDate}
              time={time}
              setTime={setTime}
              note={note}
              setNote={setNote}
            />
          )}

          {cashPaidOption === "office" && (
            <OfficeDetails
              date={date}
              setDate={setDate}
              time={time}
              setTime={setTime}
              note={note}
              setNote={setNote}
            />
          )}

          <button type="submit" className="paycash-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Paycash;
