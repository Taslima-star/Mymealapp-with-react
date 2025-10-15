import React from "react";
import InputField from "./InputField";
import TextareaField from "./TextareaField";

const DeliveryBoyDetails = ({ deliveryBoyName, setDeliveryBoyName, deliveryBoyMobile, setDeliveryBoyMobile, date, setDate, time, setTime, note, setNote }) => {
  return (
    <>
      <InputField label="Delivery Boy Name *" value={deliveryBoyName} onChange={(e) => setDeliveryBoyName(e.target.value)} required />
      <InputField label="Delivery Boy Mobile *" type="tel" value={deliveryBoyMobile} onChange={(e) => setDeliveryBoyMobile(e.target.value)} required />
      <InputField label="Select Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <InputField label="Select Time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      <TextareaField label="Note" value={note} onChange={(e) => setNote(e.target.value)} />
    </>
  );
};

export default DeliveryBoyDetails;
