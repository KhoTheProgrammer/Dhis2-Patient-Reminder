<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { useDataQuery, useDataMutation } from '@dhis2/app-runtime';
import { Table, TableRow, TableCell, Button, SingleSelect, SingleSelectOption, NoticeBox } from '@dhis2/ui';

const enrolledPatientsQuery = (programId, orgUnitId) => ({
    patients: {
        resource: 'trackedEntityInstances',
        params: {
            ou: orgUnitId,
            program: programId, // Include the program ID
            trackedEntityType: 'nEenWmSyUEp', // Your tracked entity type
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
                    { dataElement: 'appointmentStatus', value: updatedStatus }, // Replace with actual data element ID for status
                    ...(newStatus === 'Missed' ? [{ dataElement: 'appointmentDate', value: newDate }] : []), // Replace with actual ID
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
                            const enrollment = patient.enrollments[0]; // Assuming one enrollment per patient
                            const event = enrollment?.events[0]; // Assuming one appointment per enrollment
                            const appointmentDate = event?.eventDate.split('T')[0];
                            const currentStatus = event?.dataValues.find(
                                (dv) => dv.dataElement === 'appointmentStatus' // Replace with actual data element ID
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
=======
import React from "react";
import "./FollowUp.css";

const FollowUpTable = () => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Appointment status</th>
            <th>Appointment date</th>
            <th>AppointmentCheck</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Victor Nangwiya</td>
            <td>Rescheduled</td>
            <td>10/12/2024</td>
            <td>
              <input type="checkbox" />
            </td>
          </tr>
          <tr>
            <td>Adam Meja</td>
            <td>Scheduled</td>
            <td>01/12/2024</td>
            <td>
              <input type="checkbox" />
            </td>
          </tr>
          <tr>
            <td>Kondwani Padyera</td>
            <td>Complete</td>
            <td>01/12/2024</td>
            <td>
              <input type="checkbox" disabled checked/>
            </td>
          </tr>
          <tr>
            <td>Victor Nangwiya</td>
            <td>Rescheduled</td>
            <td>10/12/2024</td>
            <td>
              <input type="checkbox" />
            </td>
          </tr>
          <tr>
            <td>Adam Meja</td>
            <td>Scheduled</td>
            <td>01/12/2024</td>
            <td>
              <input type="checkbox" />
            </td>
          </tr>
          <tr>
            <td>Kondwani Padyera</td>
            <td>Complete</td>
            <td>01/12/2024</td>
            <td>
              <input type="checkbox" disabled checked />
            </td>
          </tr>
          <tr>
            <td>Victor Nangwiya</td>
            <td>Rescheduled</td>
            <td>10/12/2024</td>
            <td>
              <input type="checkbox" />
            </td>
          </tr>
          <tr>
            <td>Adam Meja</td>
            <td>Scheduled</td>
            <td>01/12/2024</td>
            <td>
              <input type="checkbox" />
            </td>
          </tr>
          <tr>
            <td>Kondwani Padyera</td>
            <td>Complete</td>
            <td>01/12/2024</td>
            <td>
              <input type="checkbox" disabled checked />
            </td>
          </tr>
          <tr>
            <td>Victor Nangwiya</td>
            <td>Rescheduled</td>
            <td>10/12/2024</td>
            <td>
              <input type="checkbox" />
            </td>
          </tr>
          <tr>
            <td>Adam Meja</td>
            <td>Scheduled</td>
            <td>01/12/2024</td>
            <td>
              <input type="checkbox" />
            </td>
          </tr>
          <tr>
            <td>Kondwani Padyera</td>
            <td>Complete</td>
            <td>01/12/2024</td>
            <td>
              <input type="checkbox" disabled checked/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
>>>>>>> d76dfd83f313125d8520f49fe4971a9489791017
};

export default FollowUpPage;
