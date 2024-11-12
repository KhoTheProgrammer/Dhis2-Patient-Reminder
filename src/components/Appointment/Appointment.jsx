import React, { useState } from "react";
import "./Appointment.css";

const Appointment = ({ onClose, onConfirm }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [error, setError] = useState("");

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setError(""); 
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
    setError(""); 
  };

  const handleConfirm = () => {
    const today = new Date().toISOString().split("T")[0];

    if (!selectedDate) {
      setError("Please select a date.");
      return;
    }
    if (!selectedTime) {
      setError("Please select a time.");
      return;
    }
    if (selectedDate < today) {
      setError("The appointment date cannot be in the past.");
      return;
    }

    
    const selectedHour = parseInt(selectedTime.split(":")[0], 10);
    if (selectedHour < 9 || selectedHour > 17) {
      setError("Please select a time between 09:00 and 17:00.");
      return;
    }

    
    onConfirm({ date: selectedDate, time: selectedTime });
    onClose();
  };

  return (
    <div className="appointment">
      <div>
        <input type="date" value={selectedDate} onChange={handleDateChange} className="input"/>
        <input type="time" value={selectedTime} onChange={handleTimeChange} className="input"/>
      </div>
      {error && <div className="error">{error}</div>}{" "}
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
