import React from 'react';
import { NavLink } from 'react-router-dom';
import './SideBar.css';

const Sidebar = () => (
    <div className="sidebar">
        <nav>
            <NavLink to="/patients" activeClassName="active">
                <i className="fas fa-user"></i> Patient
            </NavLink>
            <NavLink to="/register" activeClassName="active">
                <i className="fas fa-user-plus"></i> Register Patient
            </NavLink>
            <NavLink to="/enroll" activeClassName="active">
                <i className="fas fa-user-plus"></i> Enroll Patient
            </NavLink>
            <NavLink to="/messages" activeClassName="active">
                <i className="fas fa-envelope"></i> Sent Messages
            </NavLink>
            <NavLink to="/follow-up" activeClassName="active">
                <i className="fas fa-calendar-check"></i> Follow Up
            </NavLink>
            <NavLink to="/progress" activeClassName="active">
                <i className="fas fa-chart-line"></i> Patient's Progress
            </NavLink>
        </nav>
    </div>
);

export default Sidebar;