import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import dotenv from 'dotenv';
dotenv.config();
ReactDOM.render(/*#__PURE__*/React.createElement(BrowserRouter, null, /*#__PURE__*/React.createElement(App, null)), document.getElementById('root'));