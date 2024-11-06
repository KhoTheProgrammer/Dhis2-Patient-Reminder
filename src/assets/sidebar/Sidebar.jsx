import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as PatientIcon } from '../../icons/patient.svg';
import { ReactComponent as RegisterIcon } from '../../icons/register.svg';
import { ReactComponent as EnrollIcon } from '../../icons/enroll.svg';
import { ReactComponent as Email } from '../../icons/email.svg';
import { ReactComponent as FollowUpIcon } from '../../icons/followup.svg';
import { ReactComponent as ProgressIcon } from '../../icons/progress.svg';
import './SideBar.css';

const Sidebar = () => (
    <div className="sidebar">
        <nav>
            <NavLink to="/patients" activeClassName="active">
                <PatientIcon /> Patient
            </NavLink>
            <NavLink to="/register" activeClassName="active">
                <RegisterIcon /> Register Patient
            </NavLink>
            <NavLink to="/enroll" activeClassName="active">
                <EnrollIcon /> Enroll Patient
            </NavLink>
            <NavLink to="/messages" activeClassName="active">
                <Email /> Sent Messages
            </NavLink>
            <NavLink to="/follow-up" activeClassName="active">
                <FollowUpIcon /> Follow Up
            </NavLink>
            <NavLink to="/progress" activeClassName="active">
                <ProgressIcon /> Patient's Progress
            </NavLink>
        </nav>
    </div>
);

export default Sidebar;
