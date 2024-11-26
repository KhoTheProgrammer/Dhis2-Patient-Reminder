import React, { useState, useEffect } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, TableCellHead } from "@dhis2/ui";
import { getMessageLogs } from "../Appointment/api";

const Outbox = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch the logs on component mount
    const logs = getMessageLogs();
    setMessages(logs);
  }, []);

  return (
    <div className="outbox">
      <h2>Outbox</h2>
      {messages.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCellHead>Patient Name</TableCellHead>
              <TableCellHead>Message</TableCellHead>
              <TableCellHead>Status</TableCellHead>
              <TableCellHead>Timestamp</TableCellHead>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages.map((msg, index) => (
              <TableRow key={index}>
                <TableCell>{msg.patientName}</TableCell>
                <TableCell>{msg.message}</TableCell>
                <TableCell>{msg.status}</TableCell>
                <TableCell>{msg.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>No messages have been sent yet.</p>
      )}
    </div>
  );
};

export default Outbox;
