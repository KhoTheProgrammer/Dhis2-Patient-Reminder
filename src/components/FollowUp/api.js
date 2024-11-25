import { ids } from "../../assets/Ids";
const programStageId = ids.programstage;
export const appointmentQuery = {
    events: {
        resource: "events.json",
        params: {
            fields: "trackedEntityInstance, status, enrollment, dataValues[dataElement, value]",
            paging: false,
            programStage: programStageId,
            orgUnit:ids.orgUnit
        }
    }
}



export const fetchPatientDetails = async (trackedEntityInstance) => {
  const response = await fetch(
    `https://data.research.dhis2.org/in5320/api/trackedEntityInstances/${trackedEntityInstance}`,
    {
      headers: {
        Authorization: "Basic " + btoa("admin:district"),
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch patient details");
  }

  return response.json(); // Adjust according to your API response structure
};
