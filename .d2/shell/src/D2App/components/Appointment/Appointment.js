import React, { useState } from "react";
import "./Appointment.css";
const Appointment = _ref => {
  let {
    onClose,
    onConfirm,
    patient
  } = _ref;
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [error, setError] = useState(null);
  const handleDateChange = event => {
    setSelectedDate(event.target.value);
    setError(null);
  };
  const handleTimeChange = event => {
    setSelectedTime(event.target.value);
    setError(null);
  };
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
      if (selectedHour < 9 || selectedHour > 17) {
        setError("Please select a time between 09:00 and 17:00.");
        return;
      }
      onConfirm({
        date: selectedDate,
        time: selectedTime
      });
      onClose();
    } catch (error) {
      console.error(error);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "appointment"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: selectedDate,
    onChange: handleDateChange,
    className: "input",
    required: true
  }), /*#__PURE__*/React.createElement("input", {
    type: "time",
    value: selectedTime,
    onChange: handleTimeChange,
    className: "input",
    required: true
  })), error && /*#__PURE__*/React.createElement("div", {
    className: "error"
  }, error), /*#__PURE__*/React.createElement("div", {
    className: "buttons-container"
  }, /*#__PURE__*/React.createElement("button", {
    className: "buttons ok-btn",
    onClick: handleConfirm,
    disabled: !selectedDate || !selectedTime
  }, "Confirm"), /*#__PURE__*/React.createElement("button", {
    className: "buttons cancel-btn",
    onClick: onClose
  }, "Cancel")));
};
export default Appointment;