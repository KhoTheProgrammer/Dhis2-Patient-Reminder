<<<<<<< HEAD
import React from 'react';
import "./Message.css" // Ensure you create this CSS file for styling

function MessageTable() {
  const messages = [
    { name: 'Kondwani Padyera', message: 'You have an appointment...', date: ' 10/11/2024' },
    { name: 'Kondwani Padyera', message: 'You have an appointment...', date: '12/11/2024' },
    { name: 'Kondwani Padyera', message: 'You have an appointment...', date: '12/11/2024' },
    { name: 'Kondwani Padyera', message: 'You have an appointment...', date: '13/11/2024' },
    { name: 'Kondwani Padyera', message: 'You have an appointment...', date: '13/11/2024' },
    { name: 'Justice Khaira', message: 'You have an appointment...', date: '13/11/2024' },
    { name: 'Kondwan  Thuto', message: 'You have an appointment...', date: '13/11/2024' },
    { name: 'Adamz Major', message: 'You have an appointment...', date: '13/11/2024' },
    { name: 'Victor Nangwile', message: 'You have an appointment...', date: '13/11/2024' },
    
  ];
=======
import React, { useState, useEffect } from "react";
import "./Message.css"; // Ensure you create this CSS file for styling
import { getMessage } from "./api";

function MessageTable() {
  const [sentmessages, setMessages] = useState([]); // State to hold fetched messages
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10; // Maximum of 10 rows (patients) per page

  useEffect(() => {
    const fetchMessages = async () => {
      const result = await getMessage(); // Await the fetch
      setMessages(result); // Set the messages state with the fetched data
    };
    fetchMessages();
  }, []);

  // Function to extract the patient's name from the message
  const extractName = (message) => {
    const nameStart = message.indexOf("Hello, ") + "Hello, ".length;
    const nameEnd = message.indexOf("!", nameStart);
    return message.substring(nameStart, nameEnd).trim();
  };

  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Get only the date part (YYYY-MM-DD)
  };

  // Calculate total pages
  const totalPages = Math.ceil(sentmessages.length / rowsPerPage);

  // Get current page data
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentMessages = sentmessages.slice(
    startIndex,
    startIndex + rowsPerPage
  );

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
>>>>>>> 8d20d4ef676c76dd842111010fd07ebb8b3e246e

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
          {messages.map((msg, index) => (
            <tr key={index}>
<<<<<<< HEAD
              <td>{index + 1}. {msg.name}</td>
              <td>{msg.message}</td>
              <td>{msg.date}</td>
=======
              <td>
                {startIndex + index + 1}. {extractName(msg.text)}{" "}
                {/* Extracted name */}
              </td>
              <td>{msg.text}</td>
              <td>{formatDate(msg.dateCreated)}</td> {/* Formatted date */}
>>>>>>> 8d20d4ef676c76dd842111010fd07ebb8b3e246e
            </tr>
          ))}
        </tbody>
      </table>
<<<<<<< HEAD
=======

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
>>>>>>> 8d20d4ef676c76dd842111010fd07ebb8b3e246e
    </div>
  );
}

export default MessageTable;
