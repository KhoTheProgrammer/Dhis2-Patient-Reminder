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
    "Date Enrolled",
    "Add Appointment",
  ];

  const [patients, setPatients] = useState([]);
  const [showAppointmentPopup, setShowAppointmentPopup] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(10); // Number of patients per page
  const { loading, error, data } = useDataQuery(patientsQuery);
  const [loadingAppointments, setLoadingAppointments] = useState(new Set()); // Tracks loading per patient
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

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

          // Extract the created date and format it
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
    return <span>Loading...</span>;
  }


  const handleCloseAppointment = () => {
    setShowAppointmentPopup(false);
    setSelectedPatient(null); // Clear the selected patient correctly
  };

  const openAppointmentModal = (patient) => {
    setSelectedPatient(patient);
    setShowAppointmentPopup(true);
  };

  const handleAddAppointment = async (appointmentData) => {
    // Check if the selected patient already has an appointment
    const existingAppointment = await fetchPatientDetails(selectedPatient.id); // Implement this function to fetch appointments
    if (existingAppointment) {
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 3000); // Hide error message after 3 seconds
      return; // Exit the function if an appointment already exists
    }

    const newLoadingAppointments = new Set(loadingAppointments);
    newLoadingAppointments.add(selectedPatient.id);
    setLoadingAppointments(newLoadingAppointments);

    try {
      const result = await addAppointment({
        ...appointmentData,
        id: selectedPatient.id,
      });

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
              {patients.map((person, index) => (
                <TableRow key={index} className="tablerow">
                  <TableCell>{person.firstName}</TableCell>
                  <TableCell>{person.lastName}</TableCell>
                  <TableCell>{person.created}</TableCell>
                  <TableCell>
                    <Button
                      className="button"
                      onClick={() => handleAddAppointment(person.id)}
                    >
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

      {/* Appointment popup */}
      {showAppointmentPopup && (
        <div className="appointment-popup">
          <Appointment
            onClose={handleCloseAppointment}
            onConfirm={handleAddAppointment}
            patient={selectedPatient}
          />
          <div className="popup-overlay" onClick={handleCloseAppointment}></div>
        </div>
      )}
    </>
  );
};

export default Patients;
