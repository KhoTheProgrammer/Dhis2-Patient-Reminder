import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './assets/sidebar/Sidebar';
import NoPatientFound from './assets/NoPatientFound/NoPatientFound';
import PatientEnrollment from './components/enrollPatient/PatientEnrollment';
//import Messages from './assets/Messages';
//import FollowUp from './assets/FollowUp';
//.d2/shell/src/D2App/components/Landingpageimport Progress from './assets/Progress';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Register from './components/register/Register';
import FollowUpTable from './components/FollowUp/FollowUp';
import Patients from './components/patients/Patients';
import MessageTable from './components/Sent message/MessageTable';
import HomePage from './components/Landingpage/HomePage';
<<<<<<< HEAD
=======
import 'font-awesome/css/font-awesome.min.css';
import Progress from './components/PatientProgress/Progress';
>>>>>>> 0634aeb6987d0942f9133cb49237c698d840118e

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
          <Route path="/follow-up" element={<FollowUpTable />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="*" element={<NoPatientFound />} />
        </Routes>
      </div>
    </div>
  </Router>
);

export default App;
