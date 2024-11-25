import React from 'react';
import "./homepage.css";
import Home from '../../assets/pictures/home.jpg' 

const HomePage = () => {
  return (
    <div className="main-container">
      <div className="pic">
      <img src={Home} alt="" />
      </div>
    </div>
  );
};

export default HomePage;