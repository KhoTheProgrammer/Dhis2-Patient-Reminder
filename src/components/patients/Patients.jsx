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

  const handleAddAppointment = (patientId) => {
    setSelectedPatientId(patientId);
    setShowAppointmentPopup(true); // Show the appointment popup
  };

  const handleCloseAppointment = () => {
    setShowAppointmentPopup(false);
    setSelectedPatient(null); // Clear the selected patient correctly
  };

  const openAppointmentModal = (patient) => {
    setSelectedPatient(patient);
    setShowAppointmentPopup(true);
  };

  const handleAddAppointment = async (appointmentData) => {
    const newLoadingAppointments = new Set(loadingAppointments);
    newLoadingAppointments.add(selectedPatient.id); // Use selectedPatient.id
    setLoadingAppointments(newLoadingAppointments);

    try {
      const result = await addAppointment({
        ...appointmentData,
        id: selectedPatient.id, // Use selectedPatient.id here
      });

      // Success
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000); // Hide success message after 3 seconds
      handleCloseAppointment();
    } catch (error) {
      // Failure
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 3000); // Hide error message after 3 seconds
    } finally {
      newLoadingAppointments.delete(selectedPatient.id); // Use selectedPatient.id here
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