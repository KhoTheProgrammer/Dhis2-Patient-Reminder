
import React, { useEffect, useState } from "react";
import "./FollowUp.css";
import { appointmentQuery, fetchPatientDetails } from "./api"; // API for fetching patient details
import { useDataQuery } from "@dhis2/app-runtime";
import { CircularLoader } from "@dhis2/ui";

const appointmentData = [
  { name: "Victor Nangwiya", status: "Rescheduled", date: "10/12/2024", isComplete: false },
  { name: "Adam Meja", status: "Scheduled", date: "01/12/2024", isComplete: false },
  { name: "Kondwani Padyera", status: "Complete", date: "01/12/2024", isComplete: true },
  { name: "Sarah Lee", status: "Scheduled", date: "15/12/2024", isComplete: false },
  { name: "John Doe", status: "Complete", date: "20/12/2024", isComplete: false },
  { name: "John Adam", status: "Complete", date: "20/12/2024", isComplete: false },
  // Add more data as needed...
];

const FollowUpTable = () => {
  const rowsPerPage = 5; // Number of rows per page
  const [currentPage, setCurrentPage] = useState(0);

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
