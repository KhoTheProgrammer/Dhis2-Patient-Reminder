import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/dhis/api', 
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa('admin:district'), 
    },
});


export const enrollPatient = async (formData) => {
    const data = {
        trackedEntityType: 'cZTzbETGlIw', 
        orgUnit: formData.orgUnit,
        attributes: [
            { attribute: 'x3ZHmXpzVRy', value: formData.firstName }, 
            { attribute: 'x3ZHmXpzVRy', value: formData.lastName },
            { attribute: 'x3ZHmXpzVRy', value: formData.address },
            { attribute: 'x3ZHmXpzVRy', value: formData.dob },
            { attribute: 'x3ZHmXpzVRy', value: formData.phone },
            { attribute: 'x3ZHmXpzVRy', value: formData.gender },
        ],
        enrollments: [
            {
                orgUnit: formData.orgUnit,
                program: formData.healthProgram,
                enrollmentDate: new Date().toISOString().split('T')[0], 
                incidentDate: new Date().toISOString().split('T')[0], 
            },
        ],
    };

    try {
        const response = await api.post('/trackedEntityInstances', data);
        return response.data;
    } catch (error) {
        console.error('Error enrolling patient:', error);
        throw error;
    }
};

// Fetch organization units
export const fetchOrgUnits = async () => {
    try {
        const response = await api.get('/organisationUnits?paging=false&fields=id,displayName');
        return response.data.organisationUnits;
    } catch (error) {
        console.error('Error fetching organization units:', error);
        throw error;
    }
};

// Fetch programs
export const fetchPrograms = async () => {
    try {
        const response = await api.get('/programs?paging=false&fields=id,displayName');
        return response.data.programs;
    } catch (error) {
        console.error('Error fetching programs:', error);
        throw error;
    }
};
