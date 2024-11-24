import axios from "axios";
import { ids } from "../../assets/Ids";

const api = axios.create({
  baseURL: "https://data.research.dhis2.org/in5320/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Basic " + btoa("admin:district"),
  },
});

const smsapi = axios.create({
  baseURL: "https://telcomw.com/api-v2",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Basic " + btoa("admin:district"),
  },
});

// Sends sms to a patient upon successful adding of appointment
export const sendMessage = async (messageData) => {
  const response = await smsapi.post("/send", messageData);
  return response;
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
    return response.data;
  } catch (error) {
    console.error("Error registering patient:", error);
    throw error;
  }
};
