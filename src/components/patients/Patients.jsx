import React, { useEffect, useState } from "react";
import "./Patients.css";
import { patientsQuery } from "./api";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TableCellHead,
  CircularLoader
} from "@dhis2/ui";
import { useDataQuery } from "@dhis2/app-runtime";
import Card from "../../assets/NoPatientFound/Card/Card";
import Appointment from "../Appointment/Appointment";
import { addAppointment } from "../Appointment/api";
import { sendMessage, saveMessage } from "../Appointment/api";
import { fetchPatientDetails } from "../FollowUp/api";

const Patients = () => {
  const tableHeaders = [
    "First name",
    "Last name",
    "Date Registered",
    "Add Appointment",
  ];

  const [patients, setPatients] = useState([]);
  const [showAppointmentPopup, setShowAppointmentPopup] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(9); // Number of patients per page
  const { loading, error, data } = useDataQuery(patientsQuery);
<<<<<<< HEAD
=======
  const [loadingAppointments, setLoadingAppointments] = useState(new Set()); // Tracks loading per patient
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
>>>>>>> 8d20d4ef676c76dd842111010fd07ebb8b3e246e

  useEffect(() => {
    if (data) {
      const patientsData =
        data.trackedEntityInstances.trackedEntityInstances.map((instance) => {
          const attributes = instance.attributes;

          const getAttributeValue = (name) => {
            const attribute = attributes.find(
              (attr) => attr.displayName === name
            );
            return attribute ? attribute.value : "";
          };

          const createdDate = attributes.find(
            (attr) => attr.displayName === "First name"
          )?.created;
          const formattedDate = createdDate
            ? new Date(createdDate).toLocaleDateString()
            : "";

          return {
            id: instance.trackedEntityInstance,
            firstName: getAttributeValue("First name"),
            lastName: getAttributeValue("Last name"),
            created: formattedDate,
          };
        });

      setPatients(patientsData);
      console.log(patientsData);
    }
  }, [data]);

  if (error) {
    return <span>ERROR: {error.message}</span>;
  }

  if (loading) {
    return <div className="loader"><CircularLoader></CircularLoader></div>;
  }

  // Pagination logic
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = patients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );

  const totalPages = Math.ceil(patients.length / patientsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCloseAppointment = () => {
    setShowAppointmentPopup(false);
    setSelectedPatient(null); // Clear the selected patient correctly
  };

<<<<<<< HEAD
  const openAppointmentModal = (patientId) => {
    setSelectedPatientId(patientId);
=======
  const openAppointmentModal = (patient) => {
    setSelectedPatient(patient);
>>>>>>> 8d20d4ef676c76dd842111010fd07ebb8b3e246e
    setShowAppointmentPopup(true);
  };

  const handleAddAppointment = async (appointmentData) => {
<<<<<<< HEAD
=======
    // Check if the selected patient already has an appointment
    const existingAppointment = await fetchPatientDetails(selectedPatient.id); // Implement this function to fetch appointments
    console.log(existingAppointment, selectedPatient.id);
    
    if (existingAppointment) {
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 3000); // Hide error message after 3 seconds
      return; // Exit the function if an appointment already exists
    }

    const newLoadingAppointments = new Set(loadingAppointments);
    newLoadingAppointments.add(selectedPatient.id);
    setLoadingAppointments(newLoadingAppointments);

>>>>>>> 8d20d4ef676c76dd842111010fd07ebb8b3e246e
    try {
      const result = await addAppointment({
        ...appointmentData,
        id: selectedPatient.id,
      });
<<<<<<< HEAD
      window.alert("Appointment Created Successfully");
      handleCloseAppointment();
    } catch (error) {
      window.alert("Patient not enrolled to a program");
=======

      if (result) {
        const message = {
          text: `Hello, ${selectedPatient.firstName} ${selectedPatient.lastName}! You have an appointment on ${appointmentData.date} at ${appointmentData.time}. Thank you!!`,
          number: selectedPatient.phoneNumber,
        };
        await sendMessage(message);

        const messageData = {
          message: message.text,
          patientId: selectedPatient.id,
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
      newLoadingAppointments.delete(selectedPatient.id);
      setLoadingAppointments(new Set(newLoadingAppointments));
>>>>>>> 8d20d4ef676c76dd842111010fd07ebb8b3e246e
    }
  };

  return (
    <>
      {patients.length > 0 ? (
        <div className="table">
          <Table>
            <TableHead className="tablehead">
              <TableRow>
                {tableHeaders.map((header, index) => (
                  <TableCellHead key={index}>{header}</TableCellHead>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {currentPatients.map((person, index) => (
                <TableRow key={index} className="tablerow">
                  <TableCell>{person.firstName}</TableCell>
                  <TableCell>{person.lastName}</TableCell>
                  <TableCell>{person.created}</TableCell>
                  <TableCell>
                    <Button onClick={() => openAppointmentModal(person.id)}>
                      Add
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <Card />
      )}

      {/* Pagination controls */}
      <div className="pagination">
        <Button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </Button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>

      {/* Appointment popup */}
      {showAppointmentPopup && (
        <div className="appointment-popup">
          <Appointment
            onClose={handleCloseAppointment}
            onConfirm={handleAddAppointment}
<<<<<<< HEAD
=======
            patient={selectedPatient}
>>>>>>> 8d20d4ef676c76dd842111010fd07ebb8b3e246e
          />
          <div className="popup-overlay" onClick={handleCloseAppointment}></div>
        </div>
      )}
    </>
  );
};

export default Patients;
