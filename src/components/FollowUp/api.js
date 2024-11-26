import { ids } from "../../assets/Ids";
const programStageId = ids.programstage;
const password = process.env.REACT_APP_DHIS2_PASSWORD;
const username = process.env.REACT_APP_DHIS2_USERNAME;
export const appointmentQuery = {
  events: {
    resource: "events.json",
    params: {
      fields:
        "trackedEntityInstance, status, enrollment, dataValues[dataElement, value]",
      paging: false,
      programStage: programStageId,
      orgUnit: ids.orgUnit,
    },
  },
};

export const fetchPatientDetails = async (trackedEntityInstance) => {
  const response = await fetch(
    `https://data.research.dhis2.org/in5320/api/trackedEntityInstances/${trackedEntityInstance}`,
    {
      headers: {
        Authorization: "Basic " + btoa(`${username}:${password}`),
      },
    }
  );

  if (!response.status === "ERROR") {
    return false;
  }
  return true; // Adjust according to your API response structure
};
