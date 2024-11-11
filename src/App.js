import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './assets/sidebar/Sidebar';
import Patients from './assets/Patients';
import HomePage from './assets/HomePage';
import PatientEnrollment from './components/enrollPatient/PatientEnrollment';
import Messages from './assets/Messages';
import FollowUp from './assets/FollowUp';
import Progress from './assets/Progress';
import Register from './components/register/Register';
import './App.css';
import Message from './components/SentMessages/Message';

const App = () => (
  <Router>
    <div className="app-container">
      <Sidebar />
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/register" element={<Register />} />
          <Route path="/enroll" element={<PatientEnrollment />} />
          <Route path="/messages" element={<Message />} />
          <Route path="/follow-up" element={<FollowUp />} />
          <Route path="/progress" element={<Progress />} />
        </Routes>
      </div>
    </div>
  </Router>
);

export default App;
