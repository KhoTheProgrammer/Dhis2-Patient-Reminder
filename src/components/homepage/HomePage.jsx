import React from 'react';
import "./homepage.css";
import Home from '../../assets/pictures/home.jpg' 

const home = () => {
  return (
    <div className="main-container">
      <div className="app-title">
      <img src={Home} alt="" />
      </div>
    </div>
  );
};

export default home;
