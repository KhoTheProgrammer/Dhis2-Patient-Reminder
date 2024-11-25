import React from 'react';
import { NavLink } from 'react-router-dom';

// Import custom icons from the assets folder
//import OpenIcon from '../../assets/icons/sidebar(3).png'; // Sidebar open icon
//import CloseIcon from '../../assets/icons/sidebar(2).png'; // Sidebar close icon
import PatientIcon from '../../icons/patient.png';
import RegisterIcon from '../../icons/register.png';
import EnrollIcon from '../../icons/enroll.png';
import EmailIcon from '../../icons/email.png';
import FollowUpIcon from '../../icons/followup.png';
import ProgressIcon from '../../icons/progress.png';
import './SideBar.css';

const Sidebar = () => (
    <div className="sidebar">
        <nav>
            <NavLink to="/patients" activeClassName="active">
                <img src={PatientIcon} alt="Patient" className="icon" /> Patient
            </NavLink>
            <NavLink to="/register" activeClassName="active">
                <img src={RegisterIcon} alt="Register Patient" className="icon" /> Register Patient
            </NavLink>
            <NavLink to="/enroll" activeClassName="active">
                <img src={EnrollIcon} alt="Enroll Patient" className="icon" /> Enroll Patient
            </NavLink>
            <NavLink to="/messages" activeClassName="active">
                <img src={EmailIcon} alt="Sent Messages" className="icon" /> Sent Messages
            </NavLink>
            <NavLink to="/follow-up" activeClassName="active">
                <img src={FollowUpIcon} alt="Follow Up" className="icon" /> Follow Up
            </NavLink>
            <NavLink to="/progress" activeClassName="active">
                <img src={ProgressIcon} alt="Patient's Progress" className="icon" /> Patient's Progress
            </NavLink>
        </nav>
    </div>
);

export default Sidebar;
