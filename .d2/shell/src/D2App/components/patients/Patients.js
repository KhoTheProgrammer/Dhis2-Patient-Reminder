import React, { useEffect, useState } from "react";
import "./Patients.css";
import { patientsQuery } from "./api";
import { Table, TableHead, TableBody, TableRow, TableCell, Button, TableCellHead, CircularLoader, NoticeBox } from "@dhis2/ui";
import { useDataQuery } from "@dhis2/app-runtime";
import Card from "../../assets/NoPatientFound/Card/Card";
import Appointment from "../Appointment/Appointment";
import { addAppointment } from "../Appointment/api";
import { sendMessage, saveMessage } from "../Appointment/api";
const Patients = () => {
  const tableHeaders = ["First name", "Last name", "Date Registered", "Add Appointment"];
  const [patients, setPatients] = useState([]);
  const [showAppointmentPopup, setShowAppointmentPopup] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(10); // Number of patients per page
  const {
    loading,
    error,
    data
  } = useDataQuery(patientsQuery);
  const [loadingAppointments, setLoadingAppointments] = useState(new Set()); // Tracks loading per patient
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  useEffect(() => {
    if (data) {
      //console.log(data);

      const patientsData = data.trackedEntityInstances.trackedEntityInstances.map(instance => {
        var _attributes$find;
        const attributes = instance.attributes;
        const getAttributeValue = name => {
          const attribute = attributes.find(attr => attr.displayName === name);
          return attribute ? attribute.value : "";
        };
        const createdDate = (_attributes$find = attributes.find(attr => attr.displayName === "First name")) === null || _attributes$find === void 0 ? void 0 : _attributes$find.created;
        const formattedDate = createdDate ? new Date(createdDate).toLocaleDateString() : "";
        return {
          id: instance.trackedEntityInstance,
          firstName: getAttributeValue("First name"),
          lastName: getAttributeValue("Last name"),
          phoneNumber: getAttributeValue("Phone number"),
          address: getAttributeValue("Address"),
          gender: getAttributeValue("Gender"),
          created: formattedDate
        };
      });
      console.log(patientsData);
      setPatients(patientsData);
    }
  }, [data]);
  if (error) {
    return /*#__PURE__*/React.createElement("span", null, "ERROR: ", error.message);
  }
  if (loading) {
    return /*#__PURE__*/React.createElement("div", {
      className: "loader"
    }, /*#__PURE__*/React.createElement(CircularLoader, null), " ", /*#__PURE__*/React.createElement("p", null, "Getting patients. Please wait..."));
  }

  // Pagination logic
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = patients.slice(indexOfFirstPatient, indexOfLastPatient);
  const totalPages = Math.ceil(patients.length / patientsPerPage);
  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };
  const handleCloseAppointment = () => {
    setShowAppointmentPopup(false);
    setSelectedPatient(null); // Clear the selected patient correctly
  };
  const openAppointmentModal = patient => {
    setSelectedPatient(patient);
    setShowAppointmentPopup(true);
  };
  const handleAddAppointment = async appointmentData => {
    // Add the patient ID to the loading set
    setLoadingAppointments(prev => new Set(prev).add(selectedPatient.id));
    try {
      const result = await addAppointment({
        ...appointmentData,
        id: selectedPatient.id
      });
      if (result) {
        const message = {
          text: `Hello, ${selectedPatient.firstName} ${selectedPatient.lastName}! You have an appointment on ${appointmentData.date} at ${appointmentData.time}. Thank you!!`,
          number: selectedPatient.phoneNumber
        };
        await sendMessage(message);
        const messageData = {
          message: message.text,
          patientId: selectedPatient.id
        };
        const response = await saveMessage(messageData);
        console.log(response);
      }
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
      handleCloseAppointment();
    } catch (error) {
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 3000);
    } finally {
      // Remove the patient ID from the loading set
      setLoadingAppointments(prev => {
        const newSet = new Set(prev);
        newSet.delete(selectedPatient.id);
        return newSet; // Return a new set
      });
    }
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, patients.length > 0 ? /*#__PURE__*/React.createElement("div", {
    className: "table"
  }, /*#__PURE__*/React.createElement(Table, null, /*#__PURE__*/React.createElement(TableHead, {
    className: "tablehead"
  }, /*#__PURE__*/React.createElement(TableRow, null, tableHeaders.map((header, index) => /*#__PURE__*/React.createElement(TableCellHead, {
    key: index
  }, header)))), /*#__PURE__*/React.createElement(TableBody, null, currentPatients.map((person, index) => /*#__PURE__*/React.createElement(TableRow, {
    key: index,
    className: "tablerow"
  }, /*#__PURE__*/React.createElement(TableCell, null, person.firstName), /*#__PURE__*/React.createElement(TableCell, null, person.lastName), /*#__PURE__*/React.createElement(TableCell, null, person.created), /*#__PURE__*/React.createElement(TableCell, null, /*#__PURE__*/React.createElement(Button, {
    onClick: () => openAppointmentModal(person),
    disabled: loadingAppointments.has(person.id),
    loading: loadingAppointments.has(person.id)
  }, loadingAppointments.has(person.id) ? "Adding appointment" : "Add"))))))) : /*#__PURE__*/React.createElement(Card, null), showSuccessMessage && /*#__PURE__*/React.createElement(NoticeBox, {
    title: "Success",
    success: true
  }, "Appointment added successfully"), showErrorMessage && /*#__PURE__*/React.createElement(NoticeBox, {
    title: "Error",
    error: true
  }, "Failed to add the appointment. Patient not enrolled to any program."), /*#__PURE__*/React.createElement("div", {
    className: "pagination"
  }, /*#__PURE__*/React.createElement(Button, {
    disabled: currentPage === 1,
    onClick: () => handlePageChange(currentPage - 1)
  }, "Previous"), /*#__PURE__*/React.createElement("span", null, `Page ${currentPage} of ${totalPages}`), /*#__PURE__*/React.createElement(Button, {
    disabled: currentPage === totalPages,
    onClick: () => handlePageChange(currentPage + 1)
  }, "Next")), showAppointmentPopup && /*#__PURE__*/React.createElement("div", {
    className: "appointment-popup"
  }, /*#__PURE__*/React.createElement(Appointment, {
    onClose: handleCloseAppointment,
    onConfirm: handleAddAppointment,
    patient: selectedPatient
  }), /*#__PURE__*/React.createElement("div", {
    className: "popup-overlay",
    onClick: handleCloseAppointment
  })));
};
export default Patients;