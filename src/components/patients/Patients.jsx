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
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(9); // Number of patients per page
  const { loading, error, data } = useDataQuery(patientsQuery);

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
    }
  }, [data]);

  if (error) {
    return <span>ERROR: {error.message}</span>;
  }

  if (loading) {
    return <span>Loading...</span>;
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
    setSelectedPatientId(null); 
  };

  const openAppointmentModal = (patientId) => {
    setSelectedPatientId(patientId);
    setShowAppointmentPopup(true); 
  };

  const handleAddAppointment = async (appointmentData) => {
    try {
      const result = await addAppointment({
        ...appointmentData,
        id: selectedPatientId,
      }); 
      window.alert("Appointment Created Successfully");
      handleCloseAppointment(); 
    } catch (error) {
      window.alert("Patient not enrolled to a program")
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
                    <Button
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
          />
          <div className="popup-overlay" onClick={handleCloseAppointment}></div>
        </div>
      )}
    </>
  );
};

export default Patients;
