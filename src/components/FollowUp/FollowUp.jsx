
import React, { useEffect, useState } from "react";
import "./FollowUp.css";
import { appointmentQuery, fetchPatientDetails } from "./api"; // API for fetching patient details
import { useDataQuery } from "@dhis2/app-runtime";
import { CircularLoader } from "@dhis2/ui";

const FollowUpTable = () => {
  const { loading, error, data } = useDataQuery(appointmentQuery);
  const [appointments, setAppointments] = useState([]);
  const [patientDetailsCache, setPatientDetailsCache] = useState({}); // Cache for patient details
  const [isFetchingDetails, setIsFetchingDetails] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (data) {
        const appointmentsData = data.events.events.map((instance) => {
          const dateDataValue = instance.dataValues.find(
            (dataValue) => dataValue.dataElement === "T0tg47LBsdW" 
          );
          const timeDataValue = instance.dataValues.find(
            (dataValue) => dataValue.dataElement === "I4v5kQouxxF" 
          );

  // Calculate the starting and ending index of rows for the current page
  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = appointmentData.slice(startIndex, endIndex);

  const handleNext = () => {
    if (endIndex < appointmentData.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Appointment Status</th>
            <th>Appointment Date</th>
            <th>Appointment Check</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((appointment, index) => (
            <tr key={index}>
              <td>{appointment.name}</td>
              <td>{appointment.status}</td>
              <td>{appointment.date}</td>
              <td>
                <input type="checkbox" disabled={appointment.isComplete} checked={appointment.isComplete} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-buttons">
        <button onClick={handlePrevious} disabled={currentPage === 0}>
          Previous
        </button>
        <button onClick={handleNext} disabled={endIndex >= appointmentData.length}>
          Next
        </button>
      </div>
    </div>
  );
};

export default FollowUpTable;
