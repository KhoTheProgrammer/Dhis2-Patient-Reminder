import React from 'react';
import { NavLink } from 'react-router-dom';
import PatientIcon from '../../icons/patient.png';
import RegisterIcon from '../../icons/register.png';
import EnrollIcon from '../../icons/enroll.png';
import EmailIcon from '../../icons/email.png';
import FollowUpIcon from '../../icons/followup.png';
import ProgressIcon from '../../icons/progress.png';
import './SideBar.css';
const Sidebar = () => /*#__PURE__*/React.createElement("div", {
  className: "sidebar"
}, /*#__PURE__*/React.createElement("nav", null, /*#__PURE__*/React.createElement(NavLink, {
  to: "/patients",
  activeClassName: "active"
}, /*#__PURE__*/React.createElement("img", {
  src: PatientIcon,
  alt: "Patient",
  className: "icon"
}), " Patient"), /*#__PURE__*/React.createElement(NavLink, {
  to: "/register",
  activeClassName: "active"
}, /*#__PURE__*/React.createElement("img", {
  src: RegisterIcon,
  alt: "Register Patient",
  className: "icon"
}), " Register Patient"), /*#__PURE__*/React.createElement(NavLink, {
  to: "/enroll",
  activeClassName: "active"
}, /*#__PURE__*/React.createElement("img", {
  src: EnrollIcon,
  alt: "Enroll Patient",
  className: "icon"
}), " Enroll Patient"), /*#__PURE__*/React.createElement(NavLink, {
  to: "/messages",
  activeClassName: "active"
}, /*#__PURE__*/React.createElement("img", {
  src: EmailIcon,
  alt: "Sent Messages",
  className: "icon"
}), " Sent Messages"), /*#__PURE__*/React.createElement(NavLink, {
  to: "/follow-up",
  activeClassName: "active"
}, /*#__PURE__*/React.createElement("img", {
  src: FollowUpIcon,
  alt: "Follow Up",
  className: "icon"
}), " Follow Up"), /*#__PURE__*/React.createElement(NavLink, {
  to: "/progress",
  activeClassName: "active"
}, /*#__PURE__*/React.createElement("img", {
  src: ProgressIcon,
  alt: "Patient's Progress",
  className: "icon"
}), " Patient's Progress")));
export default Sidebar;