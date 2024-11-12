import React from 'react';
import "./Message.css" // Ensure you create this CSS file for styling

function MessageTable() {
  const messages = [
    { name: 'Kondwani Padyera', message: 'You have an appointment...', date: '13/11/2024' },
    { name: 'Kondwani Padyera', message: 'You have an appointment...', date: '13/11/2024' },
    { name: 'Kondwani Padyera', message: 'You have an appointment...', date: '13/11/2024' },
    { name: 'Kondwani Padyera', message: 'You have an appointment...', date: '13/11/2024' },
    { name: 'Kondwani Padyera', message: 'You have an appointment...', date: '13/11/2024' },
  ];

  return (
    <div className="message-table-container">
      <div className="header-bar">Sent Messages</div>;
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
              <td>{index + 1}. {msg.name}</td>
              <td>{msg.message}</td>
              <td>{msg.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MessageTable;