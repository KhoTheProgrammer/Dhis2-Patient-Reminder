import axios from "axios";
import { ids } from "../../assets/Ids";

const api = axios.create({
  baseURL: "https://data.research.dhis2.org/in5320/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Basic " + btoa("admin:district"),
  },
});

// Sends sms to a patient upon successful adding of appointment
// export const sendMessage = async (messageData) => {
//   const response = await fetch("https://telcomw.com/api-v2/send", {
//     method: "POST",
//     mode: "cors",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(messageData),
//   });
//   return response;
// };

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

export const sendMessage = async (messageData) => {
  var formdata = new FormData();
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

  fetch("https://telcomw.com/api-v2/send", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

export const createuser = async () => {
  const data = {
        name: "lennox",
        email: "123@unima.ac",
        password: "123456",
        role: "developer",
        location: "Kampala",
      }
  const response = await fetch(
    "https://farm-basket3.onrender.com/users/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  console.log(response);
};
