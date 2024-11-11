import React, { useState } from 'react';
import { useDataQuery, useDataMutation } from '@dhis2/app-runtime';
import { Button, SingleSelect, SingleSelectOption, Input, NoticeBox } from '@dhis2/ui';

const patientsQuery = {
    patients: {
        resource: 'trackedEntityInstances',
        params: {
            ou: 'DiszpKrYNg8', // Replace with your organization unit ID
            trackedEntityType: 'nEenWmSyUEp',
            fields: ['trackedEntityInstance', 'attributes'],
            pageSize: 50,
        },
    },
};

const enrollPatientMutation = {
    resource: 'enrollments',
    type: 'create',
    headers: {
        'Content-Type': 'application/json',
    },
};

const PatientEnrollment = ({ programId, orgUnitId }) => {
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [enrollmentDate, setEnrollmentDate] = useState(new Date().toISOString().split("T")[0]);
    const [enrollmentSuccess, setEnrollmentSuccess] = useState(false);
    const [enrollmentError, setEnrollmentError] = useState(null);

    const { loading, error, data } = useDataQuery(patientsQuery);
    const [enrollPatient, { loading: enrolling }] = useDataMutation(enrollPatientMutation, {
        onComplete: () => {
            setEnrollmentSuccess(true);
            setEnrollmentError(null);
        },
        onError: (err) => {
            setEnrollmentError(err.message);
            setEnrollmentSuccess(false);
        },
    });

    const patientsList = data?.patients?.trackedEntityInstances || [];

    const handleEnroll = async () => {
        if (selectedPatient) {
            setEnrollmentSuccess(false);
            setEnrollmentError(null);

            try {
                await enrollPatient({
                    data: {
                        program: programId,
                        orgUnit: orgUnitId,
                        trackedEntityInstance: selectedPatient,
                        enrollmentDate,
                    },
                });
            } catch (err) {
                console.error("Enrollment failed:", err);
            }
        }
    };

    return (
        <div>
            <h1>Enroll Patient in Program</h1>
            {error && <NoticeBox title="Error loading patients" error>{error.message}</NoticeBox>}

            <div style={{ marginBottom: '16px' }}>
                {loading ? (
                    <p>Loading patients...</p>
                ) : (
                    <SingleSelect
                        selected={selectedPatient}
                        onChange={({ selected }) => setSelectedPatient(selected)}
                        placeholder="Select a patient to enroll"
                    >
                        {patientsList.length > 0 ? (
                            patientsList.map((patient) => (
                                <SingleSelectOption
                                    key={patient.trackedEntityInstance}
                                    label={
                                        patient.attributes.find(attr => attr.attribute === 'w75KJ2mc4zz')?.value + 
                                        ' ' + 
                                        patient.attributes.find(attr => attr.attribute === 'zDhUuAYrxNC')?.value
                                    }
                                    value={patient.trackedEntityInstance}
                                />
                            ))
                        ) : (
                            <SingleSelectOption disabled label="No patients found" />
                        )}
                    </SingleSelect>
                )}
            </div>

            <Input
                label="Enrollment Date"
                type="date"
                value={enrollmentDate}
                onChange={({ value }) => setEnrollmentDate(value)}
                required
            />

            <Button onClick={handleEnroll} primary loading={enrolling}>
                Enroll Patient
            </Button>

            {enrollmentSuccess && (
                <NoticeBox title="Success" success>
                    Patient enrolled successfully!
                </NoticeBox>
            )}

            {enrollmentError && (
                <NoticeBox title="Enrollment Error" error>
                    {enrollmentError}
                </NoticeBox>
            )}
        </div>
    );
};

export default PatientEnrollment;
