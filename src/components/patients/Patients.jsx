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

const Patients = () => {
  const tableHeaders = [
    "First name",
    "Last name",
    "Date Enrolled",
    "Add Appointment",
  ];

  const [patients, setPatients] = useState([]);
  const [showAppointmentPopup, setShowAppointmentPopup] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const { loading, error, data } = useDataQuery(patientsQuery);
  const [appointmentData, setAppointmentData] = useState({
    date: "",
    time: "",
    id: "",
  });

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
    setShowAppointmentPopup(false); // Hide the appointment popup
    setSelectedPatientId(null); // Reset selected patient
  };

  const openAppointmentModal = (patientId) => {
    setSelectedPatientId(patientId);
    setShowAppointmentPopup(true); // Only opens modal without creating an appointment
  };

  const handleAddAppointment = async (appointmentData) => {
    try {
      const result = await addAppointment({...appointmentData, id: selectedPatientId}); // Sends appointment to API
      console.log("Appointment Created: ", result);
      handleCloseAppointment(); // Close modal upon successful appointment creation
    } catch (error) {
      console.error("Error creating appointment:", error);
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
                      onClick={() => openAppointmentModal(person.id)}
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
          />
          <div className="popup-overlay" onClick={handleCloseAppointment}></div>
        </div>
      )}
    </>
  );
};

export default Patients;
