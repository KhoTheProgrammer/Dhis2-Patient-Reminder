import React, { useState } from "react";
import "./Appointment.css";
import { sendMessage } from "./api";
const Appointment = ({ onClose, onConfirm, patientsData }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [error, setError] = useState(null);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setError(null);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
    setError(null);
  };

  console.log(patientsData);
  

  const handleConfirm = async () => {
    try {
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
      if (selectedHour < 0 || selectedHour > 23) {
        setError("Please select a time between 09:00 and 17:00.");
        return;
      }

      onConfirm({ date: selectedDate, time: selectedTime });
      onClose();
      const message = {
        api_key: "XWS7bIpDQoaYlOLhSQlF",
        password: "2003kondwani",
        text: `Hello, ${patientsData.firstName} ${patientsData.lastName}! You have an appointment on ${selectedDate} at ${selectedTime}. Thank you!!`,
        numbers: patientsData.phoneNumber,
        from: "WGIT",
      };
      console.log(message);
      
      const response = await sendMessage(message);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="appointment">
      <div>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="input"
          required
        />
        <input
          type="time"
          value={selectedTime}
          onChange={handleTimeChange}
          className="input"
          required
        />
      </div>
      {error && <div className="error">{error}</div>}
      <div className="buttons-container">
        <button
          className="buttons ok-btn"
          onClick={handleConfirm}
          disabled={!selectedDate || !selectedTime}
        >
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
