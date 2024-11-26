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

// Sends sms to a patient upon successful adding of appointment
export const sendMessage = async (messageData) => {
  const formdata = new FormData();
  formdata.append("api_key", process.env.REACT_APP_API_KEY);
  formdata.append("password", process.env.REACT_APP_API_PASSWORD);
  formdata.append("text", messageData.text);
  formdata.append("numbers", messageData.number);
  formdata.append("from", "WGIT");

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

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
    console.error("Error sending message:", error);
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
    return response.data;
  } catch (error) {
    console.error("Error registering patient:", error);
    throw error;
  }
};
