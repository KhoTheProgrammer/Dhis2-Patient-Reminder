import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import Card from './Card/Card';
import "./NoPatientFound.css";
const NoPatientFound = () => {
  return /*#__PURE__*/React.createElement("div", {
    className: "big-container"
  }, /*#__PURE__*/React.createElement(Sidebar, null), /*#__PURE__*/React.createElement(Card, null));
};
export default NoPatientFound;