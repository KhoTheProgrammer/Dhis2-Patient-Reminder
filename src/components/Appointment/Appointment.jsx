import React from "react";
import "./Appointment.css";
import { Button } from "@dhis2/ui";

const handleSave = () => {
  onClose();
};

if (!isVisible) return null;
const Appointment = ({ isVisible, onClose }) => {
  return (
    <div className="appointment">
      <div>
        <input type="date" name="" className="input" />
      </div>
      <div className="buttons-container">
        <button className="buttons ok-btn">OK</button>
        <button className="buttons cancel-btn">Cancel</button>
      </div>
    </div>
  );
};

export default Appointment;
