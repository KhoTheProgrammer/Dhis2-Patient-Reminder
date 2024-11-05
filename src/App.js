import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Sidebar from './assets/Sidebar';
import Patients from './assets/Patients';
import HomePage from './assets/HomePage';
import PatientEnrollment from './assets/PatientEnrollment';
import Messages from './assets/Messages';
import FollowUp from './assets/FollowUp';
import Progress from './assets/Progress';
import '@fortawesome/fontawesome-free/css/all.min.css';


const App = () => (
  <div>
      <BrowserRouter>
      <PatientEnrollment />
        <Routes>
          <Route exact path='/' Component={HomePage} />
          <Route path="/patients" component={Patients} />
          <Route path="/enroll" component={PatientEnrollment} />
          <Route path="/messages" component={Messages} />
          <Route path="/follow-up" component={FollowUp} />
          <Route path="/progress" component={Progress} />
        </Routes>
      </BrowserRouter>
  </div>
);

export default App;