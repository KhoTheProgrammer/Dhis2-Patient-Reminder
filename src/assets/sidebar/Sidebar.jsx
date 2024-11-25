import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

// Import custom icons from the assets folder
import OpenIcon from '../../assets/icons/sidebar(3).png'; // Sidebar open icon
import CloseIcon from '../../assets/icons/sidebar(2).png'; // Sidebar close icon
import PatientIcon from '../../icons/patient.png';
import RegisterIcon from '../../icons/register.png';
import EnrollIcon from '../../icons/enroll.png';
import EmailIcon from '../../icons/email.png';
import FollowUpIcon from '../../icons/followup.png';
import ProgressIcon from '../../icons/progress.png';
import './SideBar.css';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <button className="toggle-button" onClick={toggleSidebar}>
                {isOpen ? (
                    <img src={CloseIcon} alt="Close Sidebar" className="toggle-icon" />
                ) : (
                    <img src={OpenIcon} alt="Open Sidebar" className="toggle-icon" />
                )}
            </button>
            <nav className={isOpen ? 'visible' : 'hidden'}>
                <NavLink to="/patients" activeClassName="active">
                    <img src={PatientIcon} alt="Patient" className="icon" /> {isOpen && 'Patient'}
                </NavLink>
                <NavLink to="/register" activeClassName="active">
                    <img src={RegisterIcon} alt="Register Patient" className="icon" /> {isOpen && 'Register Patient'}
                </NavLink>
                <NavLink to="/enroll" activeClassName="active">
                    <img src={EnrollIcon} alt="Enroll Patient" className="icon" /> {isOpen && 'Enroll Patient'}
                </NavLink>
                <NavLink to="/messages" activeClassName="active">
                    <img src={EmailIcon} alt="Sent Messages" className="icon" /> {isOpen && 'Sent Messages'}
                </NavLink>
                <NavLink to="/follow-up" activeClassName="active">
                    <img src={FollowUpIcon} alt="Follow Up" className="icon" /> {isOpen && 'Follow Up'}
                </NavLink>
                <NavLink to="/progress" activeClassName="active">
                    <img src={ProgressIcon} alt="Patient's Progress" className="icon" /> {isOpen && "Patient's Progress"}
                </NavLink>
            </nav>
        </div>
    );
};

export default Sidebar;
