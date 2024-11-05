import React from 'react';
import { NavLink } from 'react-router-dom';
import './SideBar.css';

const Sidebar = () => (
    <div className="sidebar">
        <nav>
            <NavLink to="/patients" activeClassName="active">Patient</NavLink>
            <NavLink to="/enroll" activeClassName="active">Enroll Patient</NavLink>
            <NavLink to="/messages" activeClassName="active">Sent Messages</NavLink>
            <NavLink to="/follow-up" activeClassName="active">Follow Up</NavLink>
            <NavLink to="/progress" activeClassName="active">Patient's Progress</NavLink>
        </nav>
    </div>
);

export default Sidebar;