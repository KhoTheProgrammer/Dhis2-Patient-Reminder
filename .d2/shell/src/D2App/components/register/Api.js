import axios from "axios";
import { ids } from "../../assets/Ids";
const password = process.env.REACT_APP_DHIS_PASSWORD;
const username = process.env.REACT_APP_DHIS_USERNAME;
const api = axios.create({
  baseURL: "https://data.research.dhis2.org/in5320/api",
  // Update with your DHIS2 instance URL
  headers: {
    "Content-Type": "application/json",
    Authorization: "Basic " + btoa(`${username}:${password}`)
  }
});

// Function to register a patient in DHIS2
export const registerPatient = async patientData => {
  const data = {
    trackedEntityType: ids.trackedEntityType,
    // ID for "Person" or "Patient" entity type
    orgUnit: ids.orgUnit,
    // Organization unit ID
    attributes: [{
      attribute: ids.firstname,
      value: patientData.firstName
    },
    // Replace with actual attribute ID
    {
      attribute: ids.lastname,
      value: patientData.lastName
    }, {
      attribute: ids.dob,
      value: patientData.dob
    }, {
      attribute: ids.gender,
      value: patientData.gender
    }, {
      attribute: ids.phone,
      value: patientData.phone
    }, {
      attribute: ids.address,
      value: patientData.address
    }]
  };
  try {
    const response = await api.post("/trackedEntityInstances", data);
    return response.data;
  } catch (error) {
    console.error("Error registering patient:", error);
    throw error;
  }
};