import React, { useState, useEffect } from "react";
import "./Message.css"; // Ensure you create this CSS file for styling
import { getMessage } from "./api";


function MessageTable() {
  const [sentmessages, setmessages] = useState([]);
  

  useEffect(() => {
    const result = getMessage();
    setmessages(result);
  }, []);

  const messages = [
    {
      name: "",
      text: "",
      date: "",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10; // Maximum of 10 rows (patients) per page

  // Calculate total pages
  const totalPages = Math.ceil(messages.length / rowsPerPage);

  // Get current page data
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentMessages = messages.slice(startIndex, startIndex + rowsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="message-table-container">
      <table className="message-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {sentmessages.map((msg, index) => (
            <tr key={index}>
              <td>
                {startIndex + index + 1}. {msg.patientId}
              </td>
              <td>{msg.text}</td>
              <td>{msg.dateCreated}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-controls">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <span className="page-indicator">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default MessageTable;
