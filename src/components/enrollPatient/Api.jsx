import axios from "axios";

const api = axios.create({
  baseURL: "https://data.research.dhis2.org/in5320/api/",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Basic " + btoa("admin:district"),
  },
});


// Fetch organization units
export const fetchOrgUnits = async () => {
  try {
    const response = await api.get(
      "/organisationUnits?paging=false&fields=id,displayName"
    );
    return response.data.organisationUnits;
  } catch (error) {
    console.error("Error fetching organization units:", error);
    throw error;
  }
};

// Fetch programs
export const fetchPrograms = async () => {
  try {
    const response = await api.get(
      "/programs?paging=false&fields=id,displayName"
    );
    return response.data.programs;
  } catch (error) {
    console.error("Error fetching programs:", error);
    throw error;
  }
};

export const enrollPatient = async (enrollmentData) => {
  try {
    const response = await api.post("/enrollments", enrollmentData);
    return response.data;
  } catch (error) {
    console.error("Error enrolling patient:", error);
    throw error;
  }
};
