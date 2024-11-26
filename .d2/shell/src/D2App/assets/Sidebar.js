import React from 'react';
import { NavLink } from 'react-router-dom';
import './SideBar.css';
const Sidebar = () => /*#__PURE__*/React.createElement("div", {
  className: "sidebar"
}, /*#__PURE__*/React.createElement("nav", null, /*#__PURE__*/React.createElement(NavLink, {
  to: "/patients",
  activeClassName: "active"
}, /*#__PURE__*/React.createElement("i", {
  className: "fas fa-user"
}), " Patient"), /*#__PURE__*/React.createElement(NavLink, {
  to: "/register",
  activeClassName: "active"
}, /*#__PURE__*/React.createElement("i", {
  className: "fas fa-user-plus"
}), " Register Patient"), /*#__PURE__*/React.createElement(NavLink, {
  to: "/enroll",
  activeClassName: "active"
}, /*#__PURE__*/React.createElement("i", {
  className: "fas fa-user-plus"
}), " Enroll Patient"), /*#__PURE__*/React.createElement(NavLink, {
  to: "/messages",
  activeClassName: "active"
}, /*#__PURE__*/React.createElement("i", {
  className: "fas fa-envelope"
}), " Sent Messages"), /*#__PURE__*/React.createElement(NavLink, {
  to: "/follow-up",
  activeClassName: "active"
}, /*#__PURE__*/React.createElement("i", {
  className: "fas fa-calendar-check"
}), " Follow Up"), /*#__PURE__*/React.createElement(NavLink, {
  to: "/progress",
  activeClassName: "active"
}, /*#__PURE__*/React.createElement("i", {
  className: "fas fa-chart-line"
}), " Patient's Progress")));
export default Sidebar;