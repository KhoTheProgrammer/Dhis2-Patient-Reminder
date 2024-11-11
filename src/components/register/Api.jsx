import axios from 'axios';

const DHIS2_API_URL = 'https://localhost:9999/api'; // Replace with your DHIS2 API URL
const DHIS2_AUTH = {
    username: 'admin', 
    password: 'district', 
};

export const fetchOrgUnits = async () => {
    const response = await axios.get(`${DHIS2_API_URL}/organisationUnits`, {
        auth: DHIS2_AUTH,
    });
    return response.data.organisationUnits; // Adjust based on the actual response structure
};

export const fetchPrograms = async () => {
    const response = await axios.get(`${DHIS2_API_URL}/programs`, {
        auth: DHIS2_AUTH,
    });
    returnresponse.data.programs; // Adjust based on the actual response structure
};

export const registerPatient = async (patientData) => {
    const response = await axios.post(`${DHIS2_API_URL}/patients`, patientData, {
        auth: DHIS2_AUTH,
    });
    return response.data; // Adjust based on the actual response structure
};