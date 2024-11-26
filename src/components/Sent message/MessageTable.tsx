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
                {startIndex + index + 1}. {extractName(msg.text)}{" "}
                {/* Extracted name */}
              </td>
              <td>{msg.text}</td>
              <td>{formatDate(msg.dateCreated)}</td> {/* Formatted date */}
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
