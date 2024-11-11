import { useDataMutation } from '@dhis2/app-runtime';

const registerPatientMutation = {
    type: 'create',
    resource: 'trackedEntityInstances',
    data: ({ formData }) => ({
        trackedEntityType: 'nEenWmSyUEp',
        orgUnit: formData.orgUnit, 
        attributes: [
            { attribute: 'ATTRIBUTE_ID_FIRST_NAME', value: formData.firstName }, // Replace with your DHIS2 attribute IDs
            { attribute: 'ATTRIBUTE_ID_LAST_NAME', value: formData.lastName },
            { attribute: 'ATTRIBUTE_ID_DOB', value: formData.dob },
            { attribute: 'ATTRIBUTE_ID_GENDER', value: formData.gender },
            { attribute: 'ATTRIBUTE_ID_PHONE', value: formData.phone },
            { attribute: 'ATTRIBUTE_ID_ADDRESS', value: formData.address },
        ],
    }),
};


export const useRegisterPatient = () => {
    const [mutate, { loading, error }] = useDataMutation(registerPatientMutation);

    const registerPatient = async (formData) => {
        try {
            await mutate({ formData });
            alert("Patient registered successfully");
        } catch (err) {
            console.error("Error registering patient:", err);
            throw err;
        }
    };

    return { registerPatient, loading, error };
};
