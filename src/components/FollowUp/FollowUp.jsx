import React, { useState, useEffect } from 'react';
import { useDataQuery, useDataMutation } from '@dhis2/app-runtime';
import { Table, TableRow, TableCell, Button, SingleSelect, SingleSelectOption, NoticeBox } from '@dhis2/ui';

const enrolledPatientsQuery = (programId, orgUnitId) => ({
    patients: {
        resource: 'trackedEntityInstances',
        params: {
            ou: orgUnitId,
            program: programId, 
            trackedEntityType: 'nEenWmSyUEp', 
            fields: ['trackedEntityInstance', 'attributes', 'enrollments[enrollmentDate,events[eventDate,dataValues]]'],
            paging: false,
        },
    },
});

const updateEventMutation = {
    resource: 'events',
    type: 'update',
    id: ({ eventId }) => eventId,
    data: ({ data }) => data,
};

const FollowUpPage = ({ programId, orgUnitId }) => {
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [status, setStatus] = useState('');
    const [rescheduleDate, setRescheduleDate] = useState(null);

    const { loading, error, data, refetch } = useDataQuery(enrolledPatientsQuery(programId, orgUnitId));
    const [updateEvent, { loading: updating, error: updateError }] = useDataMutation(updateEventMutation);

    const patientsList = data?.patients?.trackedEntityInstances || [];

    const handleStatusChange = async (eventId, newStatus, appointmentDate) => {
        const newDate =
            newStatus === 'Missed'
                ? new Date(new Date(appointmentDate).setDate(new Date(appointmentDate).getDate() + 7))
                    .toISOString()
                    .split('T')[0]
                : appointmentDate;

        const updatedStatus = newStatus === 'Missed' ? 'Rescheduled' : newStatus;

        await updateEvent({
            eventId,
            data: {
                dataValues: [
                    { dataElement: 'appointmentStatus', value: updatedStatus }, 
                    ...(newStatus === 'Missed' ? [{ dataElement: 'appointmentDate', value: newDate }] : []), 
                ],
            },
        });

        refetch();
    };

    return (
        <div>
            <h1>Follow Up on Appointments</h1>
            {loading && <p>Loading patients...</p>}
            {error && <NoticeBox title="Error loading data" error>{error.message}</NoticeBox>}
            {!loading && !error && (
                <Table>
                    <thead>
                        <tr>
                            <th>Patient Name</th>
                            <th>Appointment Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patientsList.map((patient) => {
                            const enrollment = patient.enrollments[0]; 
                            const event = enrollment?.events[0]; 
                            const appointmentDate = event?.eventDate.split('T')[0];
                            const currentStatus = event?.dataValues.find(
                                (dv) => dv.dataElement === 'appointmentStatus' 
                            )?.value;

                            return (
                                <TableRow key={patient.trackedEntityInstance}>
                                    <TableCell>
                                        {patient.attributes.find((attr) => attr.attribute === 'w75KJ2mc4zz')?.value}{' '}
                                        {patient.attributes.find((attr) => attr.attribute === 'zDhUuAYrxNC')?.value}
                                    </TableCell>
                                    <TableCell>{appointmentDate || 'N/A'}</TableCell>
                                    <TableCell>{currentStatus || 'N/A'}</TableCell>
                                    <TableCell>
                                        <SingleSelect
                                            selected={status}
                                            onChange={({ selected }) =>
                                                handleStatusChange(event.event, selected, appointmentDate)
                                            }
                                            placeholder="Update Status"
                                        >
                                            <SingleSelectOption label="Honored" value="Honored" />
                                            <SingleSelectOption label="Completed" value="Completed" />
                                            <SingleSelectOption label="Missed" value="Missed" />
                                        </SingleSelect>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </tbody>
                </Table>
            )}
            {updateError && <NoticeBox title="Error updating status" error>{updateError.message}</NoticeBox>}
        </div>
    );
};