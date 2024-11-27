import React, { useEffect, useState } from "react";
import "./FollowUp.css";
import {
  appointmentQuery,
  fetchPatientDetails,
  updateAppointmentStatus, // API for updating appointment status
} from "./api";
import { useDataQuery } from "@dhis2/app-runtime";
import { CircularLoader } from "@dhis2/ui";
import { ids } from "../../assets/Ids";

const FollowUpTable = () => {
  const { loading, error, data } = useDataQuery(appointmentQuery);
  const [appointments, setAppointments] = useState([]);
  const [patientDetailsCache, setPatientDetailsCache] = useState({});
  const [isFetchingDetails, setIsFetchingDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      if (data) {
        const appointmentsData = data.events.events.map((instance) => {
          const dateDataValue = instance.dataValues.find(
            (dataValue) => dataValue.dataElement === ids.date
          );
          const timeDataValue = instance.dataValues.find(
            (dataValue) => dataValue.dataElement === ids.time
          );

          return {
            id: instance.trackedEntityInstance,
            status: instance.status,
            enrollment: instance.enrollment,
            date: dateDataValue ? dateDataValue.value : null,
            time: timeDataValue ? timeDataValue.value : null,
            event: instance.event,
          };
        });

        setAppointments(appointmentsData);

        setIsFetchingDetails(true);
        const patientDetails = await fetchAllPatientDetails(appointmentsData);
        setPatientDetailsCache(patientDetails);
        setIsFetchingDetails(false);
      }
    };

    fetchData();
  }, [data]);

  const getFullName = (attributes) => {
    const firstName = attributes.find(
      (attr) => attr.displayName === "First name"
    )?.value;
    const lastName = attributes.find(
      (attr) => attr.displayName === "Last name"
    )?.value;
    return firstName && lastName ? `${firstName} ${lastName}` : "Unknown";
  };

  const fetchAllPatientDetails = async (appointmentsData) => {
    const uniqueIds = [...new Set(appointmentsData.map((a) => a.id))];
    const patientDetails = {};

    await Promise.all(
      uniqueIds.map(async (id) => {
        try {
          if (!patientDetailsCache[id]) {
            const response = await fetchPatientDetails(id);
            patientDetails[id] = {
              fullName: getFullName(response.attributes),
              ...response,
            };
          } else {
            patientDetails[id] = patientDetailsCache[id];
          }
        } catch (error) {
          console.error(`Failed to fetch details for patient ID: ${id}`, error);
        }
      })
    );

    return patientDetails;
  };

  const handleCheckboxChange = async (appointment) => {
    // Update local state optimistically
    const updatedAppointments = appointments.map((a) =>
      a.event === appointment.event ? { ...a, status: "COMPLETED" } : a
    );
    setAppointments(updatedAppointments);

    // Persist the status update to the database
    try {
      await updateAppointmentStatus({ ...appointment, status: "COMPLETED" });
    } catch (error) {
      console.error("Failed to update appointment status:", error);
      // Revert the status update on failure
      setAppointments((prev) =>
        prev.map((a) =>
          a.event === appointment.event
            ? { ...a, status: appointment.status }
            : a
        )
      );
    }
  };

  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = appointments.slice(startIndex, endIndex);

  const handleNext = () => {
    if (endIndex < appointments.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading || isFetchingDetails)
    return (
      <div className="loader">
        <CircularLoader />
        <p>Fetching appointments and patient details. Please wait...</p>
      </div>
    );

  if (error)
    return (
      <div className="error-message">
        <p>Error fetching appointments: {error.message}</p>
      </div>
    );

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Appointment Status</th>
            <th>Appointment Date</th>
            <th>Appointment Check</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.length > 0 ? (
            currentRows.map((appointment, index) => {
              const patient = patientDetailsCache[appointment.id];
              const name = patient ? patient.fullName : "Fetching...";

              return (
                <tr key={index}>
                  <td>{name}</td>
                  <td>{appointment.status}</td>
                  <td>
                    {appointment.date
                      ? new Date(appointment.date).toLocaleDateString()
                      : "No Date"}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      disabled={appointment.status === "Complete"}
                      checked={appointment.status === "Complete"}
                      onChange={() => handleCheckboxChange(appointment)}
                    />
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No appointments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination-buttons">
        <button onClick={handlePrevious} disabled={currentPage === 0}>
          Previous
        </button>
        <button onClick={handleNext} disabled={endIndex >= appointments.length}>
          Next
        </button>
      </div>
    </div>
  );
};

export default FollowUpTable;
