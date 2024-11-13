import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './assets/sidebar/Sidebar';
import NoPatientFound from './assets/NoPatientFound/NoPatientFound'
import PatientEnrollment from './components/enrollPatient/PatientEnrollment';
import Messages from './assets/Messages';
import FollowUp from './assets/FollowUp';
import Progress from './assets/Progress';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Register from './components/register/Register';
import FollowUpTable from './components/FollowUp/FollowUp'
import Patients from './components/patients/Patients';
import MessageTable from './components/Sent message/MessageTable';
<<<<<<< HEAD
import Homepage from './components/homepage/HomePage';
import PatientProgress from "./components/PatientProgress/patientProgress"
=======
import Homepage from './components/Landingpage/HomePage';
>>>>>>> a9ac6ba06943a3804eaa62e26c858dcf1316f1d0

const App = () => (
  <Router>
    <div className="app-container">
      <Sidebar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/register" element={<Register />} />
          <Route path="/enroll" element={<PatientEnrollment />} />
          <Route path="/messages" element={<MessageTable />} />
<<<<<<< HEAD
          <Route path="/follow-up" element={<FollowUp />} />
          <Route path="/progress" element={<PatientProgress />} />
          <Route exact path='/' Component={HomePage} />
=======
          <Route path="/follow-up" element={<FollowUpTable />} />
          <Route path="/progress" element={<Progress />} />
>>>>>>> a9ac6ba06943a3804eaa62e26c858dcf1316f1d0
          <Route path="/patients" component={NoPatientFound} />
          <Route path='/register' Component={Register} />
          <Route path="/enroll" component={PatientEnrollment} />
          <Route path="/messages" component={Messages} />
          <Route path="/follow-up" component={FollowUp} />
          <Route path="/progress" component={Progress} />
        </Routes>
      </div>
    </div>
  </Router>
);

export default App;
