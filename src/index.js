
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import dotenv from 'dotenv'

dotenv.config();
console.log("API_KEY", process.env.REACT_APP_API_KEY);


ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);