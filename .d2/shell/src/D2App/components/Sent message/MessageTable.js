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
  return /*#__PURE__*/React.createElement("div", {
    className: "outbox"
  }, /*#__PURE__*/React.createElement("h2", null, "Outbox"), messages.length > 0 ? /*#__PURE__*/React.createElement(Table, null, /*#__PURE__*/React.createElement(TableHead, null, /*#__PURE__*/React.createElement(TableRow, null, /*#__PURE__*/React.createElement(TableCellHead, null, "Patient Name"), /*#__PURE__*/React.createElement(TableCellHead, null, "Message"), /*#__PURE__*/React.createElement(TableCellHead, null, "Status"), /*#__PURE__*/React.createElement(TableCellHead, null, "Timestamp"))), /*#__PURE__*/React.createElement(TableBody, null, messages.map((msg, index) => /*#__PURE__*/React.createElement(TableRow, {
    key: index
  }, /*#__PURE__*/React.createElement(TableCell, null, msg.patientName), /*#__PURE__*/React.createElement(TableCell, null, msg.message), /*#__PURE__*/React.createElement(TableCell, null, msg.status), /*#__PURE__*/React.createElement(TableCell, null, msg.timestamp))))) : /*#__PURE__*/React.createElement("p", null, "No messages have been sent yet."));
};
export default Outbox;