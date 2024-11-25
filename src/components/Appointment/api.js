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
  baseURL: "https://api.twilio.com/2010-04-01/Accounts",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: "Basic " + btoa("your_account_sid:your_auth_token"),
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
    const response = await fetch(
      "https://telcomw.com/api-v2/send",
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
  const response = await smsapi.post("/Messages.json", {
    From: "your_twilio_phone_number",
    To: messageData.to,
    Body: messageData.message,
  });
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