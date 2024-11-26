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
  CircularLoader,
  NoticeBox,
} from "@dhis2/ui";
import { useDataQuery } from "@dhis2/app-runtime";
import Card from "../../assets/NoPatientFound/Card/Card";
import Appointment from "../Appointment/Appointment";
import { addAppointment, sendSMS } from "../Appointment/api";

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
  const [patientsPerPage] = useState(10); // Number of patients per page
  const { loading, error, data } = useDataQuery(patientsQuery);
  const [loadingAppointments, setLoadingAppointments] = useState(new Set()); // Tracks loading per patient
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    if (data) {
      //console.log(data);

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
            phoneNumber: getAttributeValue("Phone number"),
            address: getAttributeValue("Address"),
            gender: getAttributeValue("Gender"),
            created: formattedDate,
          };
        });
      console.log(patientsData);

      setPatients(patientsData);
    }
  }, [data]);

  if (error) {
    return <span>ERROR: {error.message}</span>;
  }

  if (loading) {
    return (
      <div className="loader">
        <CircularLoader></CircularLoader>{" "}
        <p>Getting patients. Please wait...</p>
      </div>
    );
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

      if (result) {
        // Send SMS after successful appointment creation
        const message = {
          text: `Hello, ${selectedPatient.firstName} ${selectedPatient.lastName}! You have an appointment on ${appointmentData.date} at ${appointmentData.time}. Thank you!!`,
          number: selectedPatient.phoneNumber,
        };
        const response = await sendSMS(message);
        console.log(response);
      }
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
              {currentPatients.map((person, index) => (
                <TableRow key={index} className="tablerow">
                  <TableCell>{person.firstName}</TableCell>
                  <TableCell>{person.lastName}</TableCell>
                  <TableCell>{person.created}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => openAppointmentModal(person)}
                      disabled={loadingAppointments.has(person.id)}
                      loading={loadingAppointments.has(person.id)}
                    >
                      {loadingAppointments.has(person.id)
                        ? "Adding appointment"
                        : "Add"}
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

      {/* Success NoticeBox */}
      {showSuccessMessage && (
        <NoticeBox title="Success" success>
          Appointment added successfully
        </NoticeBox>
      )}

      {/* Error NoticeBox */}
      {showErrorMessage && (
        <NoticeBox title="Error" error>
          Failed to add the appointment. Patient not enrolled to any program.
        </NoticeBox>
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
            patient={selectedPatient}
          />
          <div className="popup-overlay" onClick={handleCloseAppointment}></div>
        </div>
      )}
    </>
  );
};

export default Patients;
