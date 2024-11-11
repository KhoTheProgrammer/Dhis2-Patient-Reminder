import React, { useState } from "react";
import "./Appointment.css";

const Appointment = ({ onClose, onConfirm }) => {
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleConfirm = () => {
    onConfirm(selectedDate); // Pass selected date to parent on confirmation
  };

  return (
    <div className="appointment">
      <div>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="input"
        />
      </div>
      <div className="buttons-container">
        <button className="buttons ok-btn" onClick={handleConfirm}>
          OK
        </button>
        <button className="buttons cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Appointment;
