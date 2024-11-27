import { ids } from "../../assets/Ids";
const programStageId = ids.programstage;
const password = process.env.REACT_APP_DHIS_PASSWORD;
const username = process.env.REACT_APP_DHIS_USERNAME;
export const appointmentQuery = {
  events: {
    resource: "events.json",
    params: {
      fields: "trackedEntityInstance, status, enrollment, dataValues[dataElement, value], event",
      paging: false,
      programStage: programStageId,
      orgUnit: ids.orgUnit
    }
  }
};
export const fetchPatientDetails = async trackedEntityInstance => {
  const response = await fetch(`https://data.research.dhis2.org/in5320/api/trackedEntityInstances/${trackedEntityInstance}`, {
    headers: {
      Authorization: "Basic " + btoa(`${username}:${password}`)
    }
  });
  if (!response.ok) {
    throw new Error("Failed to fetch patient details");
  }
  return response.json(); // Adjust according to your API response structure
};
export const updateAppointmentStatus = async appointment => {
  const response = await fetch(`https://data.research.dhis2.org/in5320/api/events/${appointment.event}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa("admin:district")
    },
    body: JSON.stringify(appointment)
  });
  if (!response.ok) {
    throw new Error("Failed to update appointment status");
  }
  return response.json();
};