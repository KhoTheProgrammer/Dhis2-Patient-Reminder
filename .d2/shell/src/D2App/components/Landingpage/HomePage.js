import React from 'react';
import "./homepage.css";
import Home from '../../assets/pictures/home.jpg';
const HomePage = () => {
  return /*#__PURE__*/React.createElement("div", {
    className: "main-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pic"
  }, /*#__PURE__*/React.createElement("img", {
    src: Home,
    alt: ""
  })));
};
export default HomePage;