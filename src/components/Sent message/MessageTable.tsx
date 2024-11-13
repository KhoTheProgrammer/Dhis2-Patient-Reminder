import React, { useState } from 'react';
import "./Message.css"; // Ensure this CSS is properly styled

function MessageTable() {
  const dataPerPage = 5; // Set how many data rows should appear per page
  const [currentPage, setCurrentPage] = useState(1);

  const messages = [
    { name: 'Kondwani Padyera', message: 'You missed an appointment on...', date: '12/11/2024' },
    { name: 'Justice Khaira', message: 'You have an appointment...', date: '13/11/2024' },
    { name: 'Kondwan Thuto', message: 'Thank you for completing...', date: '13/11/2024' },
    { name: 'Kondwani Padyera', message: 'You missed an appointment on...', date: '12/11/2024' },
    { name: 'Adamz Major', message: 'You have an appointment...', date: '13/11/2024' },
    { name: 'Victor Nangwile', message: 'You have an appointment...', date: '13/11/2024' },
    { name: 'Justice Khaira', message: 'You have an appointment...', date: '13/11/2024' },
    { name: 'Kondwan Thuto', message: 'Thank you for completing...', date: '13/11/2024' },
    { name: 'Adamz Major', message: 'You have an appointment...', date: '13/11/2024' },
    { name: 'Kondwani Padyera', message: 'You missed an appointment on...', date: '13/11/2024' },
    { name: 'Victor Nangwile', message: 'You have an appointment...', date: '13/11/2024' },
    { name: 'Kondwani Padyera', message: 'You missed an appointment on...', date: '10/11/2024' },
    { name: 'Kondwan Thuto', message: 'Thank you for completing...', date: '13/11/2024' },
    { name: 'Kondwani Padyera', message: 'You missed an appointment on...', date: '13/11/2024' },
    { name: 'Adamz Major', message: 'You have an appointment...', date: '13/11/2024' },
  ];

  const totalPages = Math.ceil(messages.length / dataPerPage);
  const startIndex = (currentPage - 1) * dataPerPage;
  const displayedData = messages.slice(startIndex, startIndex + dataPerPage);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
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
          {displayedData.map((msg, index) => (
            <tr key={startIndex + index}>
              <td>{startIndex + index + 1}. {msg.name}</td>
              <td>{msg.message}</td>
              <td>{msg.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            className={currentPage === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default MessageTable;
