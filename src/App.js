import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './assets/sidebar/Sidebar';
import PatientEnrollment from './components/enrollPatient/PatientEnrollment';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Register from './components/register/Register';
import Patients from './components/patients/Patients';
import MessageTable from './components/Sent message/MessageTable';
import HomePage from './components/Landingpage/HomePage';
import FollowUpPage from './components/FollowUp/FollowUp';

const App = () => (
  <Router>
    <div className="app-container">
      <Sidebar />
      <div className="content">
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path="/patients" element={<Patients />} />
          <Route path="/register" element={<Register />} />
          <Route path="/enroll" element={<PatientEnrollment />} />
          <Route path="/messages" element={<MessageTable />} />
          <Route path="/follow-up" element={<FollowUpPage />} />
        </Routes>
      </div>
    </div>
  </Router>
);

export default App;
