import axios from "axios";
import { ids } from "../../assets/Ids";
const password = process.env.REACT_APP_DHIS_PASSWORD;
const username = process.env.REACT_APP_DHIS_USERNAME;
const api = axios.create({
  baseURL: "https://data.research.dhis2.org/in5320/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${btoa(`${username}:${password}`)}`
  }
});
const smsapi = axios.create({
  baseURL: "https://api.twilio.com/2010-04-01/Accounts",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${btoa("AC799d52ff569652209cd117506bcc3502:1d2ba077549bd1a2b20e78d804583574")}`
  }
});
let messageLogs = []; // Temporary in-memory storage for messages

export const sendSMS = async messageData => {
  const logMessage = {
    patientName: messageData.name,
    message: messageData.text,
    status: "Sending",
    // Initial status
    timestamp: new Date().toLocaleString()
  };
  try {
    // Add the log to the messageLogs
    messageLogs.push(logMessage);

    // Bypassing CORS error by using corsproxy.io
    const response = await fetch("https://corsproxy.io/?https://telcomw.com/api-v2/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        to: messageData.number,
        message: messageData.text
      })
    });
    if (response.ok) {
      logMessage.status = "Sent";
    } else {
      logMessage.status = "Failed";
    }
    return response;
  } catch (error) {
    console.error("Error sending SMS:", error);
    logMessage.status = "Failed"; // Update status in case of error
    throw error;
  }
};

// Export the message logs for the Outbox component
export const getMessageLogs = () => messageLogs;
export const addAppointment = async appointmentData => {
  const data = {
    program: ids.program,
    programStage: ids.programstage,
    orgUnit: ids.orgUnit,
    eventDate: appointmentData.date,
    trackedEntityInstance: appointmentData.id,
    status: "SCHEDULE",
    dataValues: [{
      dataElement: ids.date,
      value: appointmentData.date
    }, {
      dataElement: ids.time,
      value: appointmentData.time
    }]
  };
  try {
    const response = await api.post("/events", data);
    await sendSMS({
      to: appointmentData.phoneNumber,
      message: `Appointment scheduled for ${appointmentData.date} at ${appointmentData.time}`
    });
    console.log("I'm running");
    return response.data;
  } catch (error) {
    console.error("Error registering patient:", error);
    throw error;
  }
};
export const saveMessage = messageData => {
  const response = fetch("https://dhis2-messages-backend.onrender.com/api/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(messageData)
  });
  return response;
};