import axios from "axios";
import { ids } from "../../assets/Ids";

const password = process.env.REACT_APP_DHIS_PASSWORD;
const username = process.env.REACT_APP_DHIS_USERNAME;

const api = axios.create({
  baseURL: "https://data.research.dhis2.org/in5320/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Basic " + btoa(`${username}:${password}`),
  },
});

const smsapi = axios.create({
  baseURL: "https://api.twilio.com/2010-04-01/Accounts",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: "Basic " + btoa("AC799d52ff569652209cd117506bcc3502:1d2ba077549bd1a2b20e78d804583574"),
  },
});

export const sendSMS = async (messageData) => {
  try {
    // Bypassing cors error by using corsproxy.io
    const response = await fetch(
      "https://corsproxy.io/?https://telcomw.com/api-v2/send",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    return response;
  } catch (error) {
    console.error("Error sending SMS:", error);
    throw error;
  }
};

export const addAppointment = async (appointmentData) => {
  const data = {
    program: ids.program,
    programStage: ids.programstage,
    orgUnit: ids.orgUnit,
    eventDate: appointmentData.date,
    trackedEntityInstance: appointmentData.id,
    status: "SCHEDULE",
    dataValues: [
      { dataElement: ids.date, value: appointmentData.date },
      { dataElement: ids.time, value: appointmentData.time },
    ],
  };

  try {
    const response = await api.post("/events", data);
    await sendSMS({
      to: appointmentData.phoneNumber,
      message: `Appointment scheduled for ${appointmentData.date} at ${appointmentData.time}`,
    });
    console.log("Im running");
    
    return response.data;
  } catch (error) {
    console.error("Error registering patient:", error);
    throw error;
  }
};