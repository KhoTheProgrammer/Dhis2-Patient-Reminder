import React, { useState, useEffect } from 'react';
import { useDataQuery, useDataMutation } from '@dhis2/app-runtime';
import { Button, Input } from '@dhis2/ui';

const enrollPatientQuery = {
    patientProgram: {
        resource: 'programEnrollments',
        params: ({ patientId, programId }) => ({
            patient: patientId,
            program: programId,
            enrollmentDate: new Date().toISOString(),
        }),
    },
};

const programAttributesQuery = {
    attributes: {
        resource: 'programs/{programId}/attributes', // Replace {programId} with the actual program ID
    },
};

const enrollPatient = ({ patientId, programId, attributeValues }) => {
    // Mutation call to DHIS2 API to enroll the patient into the program
    return {
        resource: 'programEnrollments',
        type: 'create',
        data: {
            patient: patientId,
            program: programId,
            enrollmentDate: new Date().toISOString(),
            programAttributes: Object.keys(attributeValues).map((attributeId) => ({
                attribute: attributeId,
                value: attributeValues[attributeId],
            })),
        },
    };
};

const EnrollPatientPage = ({ patientId, programId }) => {
    const [enrolled, setEnrolled] = useState(false);
    const [error, setError] = useState(null);
    const [attributes, setAttributes] = useState([]);
    const [attributeValues, setAttributeValues] = useState({});

    // Fetch program attributes (custom attributes specific to the program)
    const { loading: attributesLoading, data: attributesData } = useDataQuery(programAttributesQuery, {
        variables: { programId },
    });

    const { mutate: enroll } = useDataMutation(enrollPatient, {
        onSuccess: () => setEnrolled(true),
        onError: (err) => setError(err.message),
    });

    useEffect(() => {
        if (attributesData && attributesData.attributes) {
            setAttributes(attributesData.attributes);
        }
    }, [attributesData]);

    const handleInputChange = (event, attribute) => {
        setAttributeValues({
            ...attributeValues,
            [attribute]: event.target.value,
        });
    };

    const handleEnroll = () => {
        enroll({ patientId, programId, attributeValues });
    };

    if (attributesLoading) return <div>Loading attributes...</div>;

    return (
        <div>
            <h1>Enroll Patient in Program</h1>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <form>
                {attributes.map((attribute) => (
                    <div key={attribute.id}>
                        <label>{attribute.displayName}</label>
                        <Input
                            value={attributeValues[attribute.id] || ''}
                            onChange={(e) => handleInputChange(e, attribute.id)}
                            placeholder={`Enter ${attribute.displayName}`}
                        />
                    </div>
                ))}

                <Button onClick={handleEnroll} primary>
                    Enroll Patient
                </Button>
            </form>

            {enrolled && <div>Patient has been successfully enrolled!</div>}
        </div>
    );
};

export default EnrollPatientPage;
