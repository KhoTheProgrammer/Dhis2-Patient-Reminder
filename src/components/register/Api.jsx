import axios from "axios";

const api = axios.create({
  baseURL: "https://data.research.dhis2.org/in5320/api", // Update with your DHIS2 instance URL
  headers: {
    "Content-Type": "application/json",
    Authorization: "Basic " + btoa("admin:district"), // Replace with your credentials
  },
});

// Function to register a patient in DHIS2
export const registerPatient = async (patientData) => {
  const data = {
    trackedEntityType: "nEenWmSyUEp", // ID for "Person" or "Patient" entity type
    orgUnit: "DiszpKrYNg8", // Organization unit ID
    attributes: [
      { attribute: "w75KJ2mc4zz", value: patientData.firstName }, // Replace with actual attribute ID
      { attribute: "zDhUuAYrxNC", value: patientData.lastName },
      { attribute: "iESIqZ0R0R0", value: patientData.dob },
      { attribute: "cejWyOfXge6", value: patientData.gender },
      { attribute: "P2cwLGskgxn", value: patientData.phone },
      { attribute: "VqEFza8wbwA", value: patientData.address },
    ],
  };

  try {
    const response = await api.post("/trackedEntityInstances", data);
    return response.data;
  } catch (error) {
    console.error("Error registering patient:", error);
    throw error;
  }
};
