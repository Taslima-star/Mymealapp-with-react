import React from "react";
import InputField from "./InputField";
import TextareaField from "./TextareaField";

const OfficeDetails = ({ date, setDate, time, setTime, note, setNote }) => {
  return (
    <>
      <InputField label="Select Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <InputField label="Select Time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      <TextareaField label="Note" value={note} onChange={(e) => setNote(e.target.value)} />
    </>
  );
};

export default OfficeDetails;
