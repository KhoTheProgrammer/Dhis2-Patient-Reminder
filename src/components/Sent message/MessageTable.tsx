import React, { useState } from "react";
import "./Message.css"; // Ensure you create this CSS file for styling

function MessageTable() {
  const messages = [
    {
      name: "Kondwani Padyera",
      message: "You missed an appointment on...",
      date: "12/11/2024",
    },
    {
      name: "Justice Khaira",
      message: "You have an appointment...",
      date: "13/11/2024",
    },
    {
      name: "Kondwan  Thuto",
      message: "Thank you for completing...",
      date: "13/11/2024",
    },
    {
      name: "Kondwani Padyera",
      message: "You missed an appointment on...",
      date: "12/11/2024",
    },
    {
      name: "Adamz Major",
      message: "You have an appointment...",
      date: "13/11/2024",
    },
    {
      name: "Victor Nangwile",
      message: "You have an appointment...",
      date: "13/11/2024",
    },
    {
      name: "Justice Khaira",
      message: "You have an appointment...",
      date: "13/11/2024",
    },
    {
      name: "Kondwan  Thuto",
      message: "Thank you for completing...",
      date: "13/11/2024",
    },
    {
      name: "Adamz Major",
      message: "You have an appointment...",
      date: "13/11/2024",
    },
    {
      name: "Kondwani Padyera",
      message: "You missed an appointment on...",
      date: "13/11/2024",
    },
    {
      name: "Victor Nangwile",
      message: "You have an appointment...",
      date: "13/11/2024",
    },
    {
      name: "Kondwani Padyera",
      message: "You missed an appointment on...",
      date: "10/11/2024",
    },
    {
      name: "Kondwan  Thuto",
      message: "Thank you for completing...",
      date: "13/11/2024",
    },
    {
      name: "Kondwani Padyera",
      message: "You missed an appointment on...",
      date: "13/11/2024",
    },
    {
      name: "Adamz Major",
      message: "You have an appointment...",
      date: "13/11/2024",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const totalPages = useMemo(() => Math.ceil(messages.length / rowsPerPage), [messages, rowsPerPage]);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentMessages = useMemo(() => messages.slice(startIndex, startIndex + rowsPerPage), [messages, startIndex]);

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
          {currentMessages.map((msg, index) => (
            <tr key={index}>
              <td>
                {startIndex + index + 1}. {msg.name}
              </td>
              <td>{msg.message}</td>
              <td>{msg.date}</td>
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