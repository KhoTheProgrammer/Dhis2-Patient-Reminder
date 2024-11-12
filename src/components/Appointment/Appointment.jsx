import React, { useState } from "react";
import "./Appointment.css";

const Appointment = ({ onClose, onConfirm }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      onConfirm({ date: selectedDate, time: selectedTime, id: "" });
    } else {
      alert("Please select both date and time.");
    }
    onClose();
  };

  return (
    <div className="appointment">
      <div>
        <input type="date" value={selectedDate} onChange={handleDateChange} className="input"/>
        <input type="time" value={selectedTime} onChange={handleTimeChange} />
      </div>
      <div className="buttons-container">
        <button className="buttons ok-btn" onClick={handleConfirm}>
          Confirm
        </button>
        <button className="buttons cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Appointment;
