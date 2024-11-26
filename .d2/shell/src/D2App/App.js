import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./assets/sidebar/Sidebar";
import PatientEnrollment from "./components/enrollPatient/PatientEnrollment";
import "./App.css";
import Register from "./components/register/Register";
import Patients from "./components/patients/Patients";
import MessageTable from "./components/Sent message/MessageTable";
import HomePage from "./components/Landingpage/HomePage";
import FollowUpPage from "./components/FollowUp/FollowUp";
import ProgressReport from "./components/progressReport/ProgressReport";
const App = () => /*#__PURE__*/React.createElement(Router, null, /*#__PURE__*/React.createElement("div", {
  className: "app-container"
}, /*#__PURE__*/React.createElement(Sidebar, null), /*#__PURE__*/React.createElement("div", {
  className: "content"
}, /*#__PURE__*/React.createElement(Routes, null, /*#__PURE__*/React.createElement(Route, {
  path: "/",
  element: /*#__PURE__*/React.createElement(HomePage, null)
}), /*#__PURE__*/React.createElement(Route, {
  path: "/patients",
  element: /*#__PURE__*/React.createElement(Patients, null)
}), /*#__PURE__*/React.createElement(Route, {
  path: "/register",
  element: /*#__PURE__*/React.createElement(Register, null)
}), /*#__PURE__*/React.createElement(Route, {
  path: "/enroll",
  element: /*#__PURE__*/React.createElement(PatientEnrollment, null)
}), /*#__PURE__*/React.createElement(Route, {
  path: "/messages",
  element: /*#__PURE__*/React.createElement(MessageTable, null)
}), /*#__PURE__*/React.createElement(Route, {
  path: "/follow-up",
  element: /*#__PURE__*/React.createElement(FollowUpPage, null)
}), /*#__PURE__*/React.createElement(Route, {
  path: "/progress",
  element: /*#__PURE__*/React.createElement(ProgressReport, null)
})))));
export default App;