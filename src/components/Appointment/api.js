import axios from "axios";

const api = axios.create({
  baseURL: "https://data.research.dhis2.org/in5320/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Basic " + btoa("admin:district"),
  },
});

// {
//     "program": "qQIsC9hO2Gj",
//     "programStage": "djfuWTIR5zc",
//     "orgUnit": "DFyu9VGpodC",
//     "trackedEntityInstance": "zwnJOqfZFPO",
//     "eventDate": "2024-11-10",
//     "status": "ACTIVE"
// }

export const addAppointment = async (appointmentData) => {
  const data = {
    program: "qQIsC9hO2Gj",
    programStage: "djfuWTIR5zc",
    orgUnit: "DFyu9VGpodC",
    eventDate: appointmentData.date,
    trackedEntityInstance: appointmentData.id,
    status: "SCHEDULE",
    dataValues: [
      { dataElement: "T0tg47LBsdW", value: appointmentData.date },
      { dataElement: "I4v5kQouxxF", value: appointmentData.time },
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
