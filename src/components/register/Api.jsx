import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/dhis/api', // Update with your DHIS2 instance URL
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa('admin:district'), // Replace with your credentials
    },
});

// Function to register a patient in DHIS2
export const registerPatient = async (patientData) => {
    const data = {
        trackedEntityType: 'cZTzbETGlIw', // ID for "Person" or "Patient" entity type
        orgUnit: patientData.orgUnit, // Organization unit ID
        attributes: [
            { attribute: 'FIRST_NAME_ATTRIBUTE_ID', value: patientData.firstName }, // Replace with actual attribute ID
            { attribute: 'LAST_NAME_ATTRIBUTE_ID', value: patientData.lastName },
            { attribute: 'DOB_ATTRIBUTE_ID', value: patientData.dob },
            { attribute: 'GENDER_ATTRIBUTE_ID', value: patientData.gender },
            { attribute: 'PHONE_ATTRIBUTE_ID', value: patientData.phone },
            { attribute: 'ADDRESS_ATTRIBUTE_ID', value: patientData.address },
        ],
    };

    try {
        const response = await api.post('/trackedEntityInstances', data);
        return response.data;
    } catch (error) {
        console.error('Error registering patient:', error);
        throw error;
    }
};
