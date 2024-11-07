import React from "react";
import "./Appointment.css";



const Appointment = () => {
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
