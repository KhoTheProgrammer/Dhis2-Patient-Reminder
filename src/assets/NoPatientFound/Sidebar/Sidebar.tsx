import React from "react";
import "./SideBar.css";

const Sidebar = () => {
  return (
    <div>
      <div className="sidebar">
        <p className="sidebar-item" id="sidebar-patient">PATIENT</p>
        <p className="sidebar-item">ENROLL PATIENT</p>
        <p className="sidebar-item">SENT MESSAGES</p>
        <p className="sidebar-item">FOLLOW UP</p>
        <p className="sidebar-item">PATIENTS PROGRESS</p>
      </div>
    </div>
  );
};

export default Sidebar;

