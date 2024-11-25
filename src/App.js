import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './assets/sidebar/Sidebar';
import PatientEnrollment from './components/enrollPatient/PatientEnrollment';
import './App.css';
import Register from './components/register/Register';
import FollowUpTable from './components/FollowUp/FollowUp';
import Patients from './components/patients/Patients';
import MessageTable from './components/Sent message/MessageTable';
import HomePage from './components/Landingpage/HomePage';
import FollowUp from './components/FollowUp/FollowUp';
import Progress from './components/PatientProgress/Progress'
import Patients from './components/patients/Patients';
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
