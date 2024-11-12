import React, { useState, useEffect } from 'react';
import { useDataQuery, useDataMutation } from '@dhis2/app-runtime';
import { Button, SingleSelect, SingleSelectOption, Input, NoticeBox } from '@dhis2/ui';

const orgUnitsQuery = {
    orgUnits: {
        resource: 'organisationUnits',
        params: {
            fields: ['id', 'displayName'],
            paging: false,
            level:2,
        },
    },
};

const programsQuery = {
    programs: {
        resource: 'programs',
        params: {
            fields: ['id', 'displayName'],
            paging: false,
        },
    },
};

const patientsQuery = (orgUnitId) => ({
    patients: {
        resource: 'trackedEntityInstances',
        params: {
            ou: orgUnitId,
            trackedEntityType: "nEenWmSyUEp", // Replace with appropriate tracked entity type
            fields: ['trackedEntityInstance', 'attributes'],
            pageSize: 50,
        },
    },
});

const enrollPatientMutation = {
    resource: 'enrollments',
    type: 'create',
    headers: {
        'Content-Type': 'application/json',
    },
};

const PatientEnrollment = () => {
    const [selectedOrgUnit, setSelectedOrgUnit] = useState(null);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [enrollmentDate, setEnrollmentDate] = useState(new Date().toISOString().split("T")[0]);
    const [enrollmentSuccess, setEnrollmentSuccess] = useState(false);
    const [enrollmentError, setEnrollmentError] = useState(null);

    const { loading: loadingOrgUnits, data: orgUnitsData } = useDataQuery(orgUnitsQuery);
    const { loading: loadingPrograms, data: programsData } = useDataQuery(programsQuery);
    const { loading: loadingPatients, error: patientsError, data: patientsData, refetch: refetchPatients } = useDataQuery(
        patientsQuery(selectedOrgUnit),
        { lazy: true }
    );

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

    const patientsList = patientsData?.patients?.trackedEntityInstances || [];
    const orgUnitsList = orgUnitsData?.orgUnits?.organisationUnits || [];
    const programsList = programsData?.programs?.programs || [];

    const handleEnroll = async () => {
        if (selectedPatient && selectedProgram && selectedOrgUnit) {
            setEnrollmentSuccess(false);
            setEnrollmentError(null);

            try {
                await enrollPatient({
                    data: {
                        program: selectedProgram,
                        orgUnit: selectedOrgUnit,
                        trackedEntityInstance: selectedPatient,
                        enrollmentDate,
                    },
                });
            } catch (err) {
                console.error("Enrollment failed:", err);
            }
        }
    };

    useEffect(() => {
        if (selectedOrgUnit) {
            refetchPatients();
        }
    }, [selectedOrgUnit]);

    return (
        <div>
            <h1>Enroll Patient in Program</h1>

            {loadingOrgUnits ? (
                <p>Loading organization units...</p>
            ) : (
                <SingleSelect
                    selected={selectedOrgUnit}
                    onChange={({ selected }) => setSelectedOrgUnit(selected)}
                    placeholder="Select an organization unit"
                >
                    {orgUnitsList.map((orgUnit) => (
                        <SingleSelectOption key={orgUnit.id} label={orgUnit.displayName} value={orgUnit.id} />
                    ))}
                </SingleSelect>
            )}

            {loadingPrograms ? (
                <p>Loading programs...</p>
            ) : (
                <SingleSelect
                    selected={selectedProgram}
                    onChange={({ selected }) => setSelectedProgram(selected)}
                    placeholder="Select a program"
                >
                    {programsList.map((program) => (
                        <SingleSelectOption key={program.id} label={program.displayName} value={program.id} />
                    ))}
                </SingleSelect>
            )}

            {loadingPatients ? (
                <p>Loading patients...</p>
            ) : (
                <SingleSelect
                    selected={selectedPatient}
                    onChange={({ selected }) => setSelectedPatient(selected)}
                    placeholder="Select a patient"
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
