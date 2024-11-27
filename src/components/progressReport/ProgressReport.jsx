import React, { useEffect, useState, useMemo } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { appointmentQuery, fetchPatientDetails } from "../FollowUp/api";
import { CircularLoader } from "@dhis2/ui";

const ProgressReport = () => {
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
            (dataValue) => dataValue.dataElement === "T0tg47LBsdW"
          );
          const timeDataValue = instance.dataValues.find(
            (dataValue) => dataValue.dataElement === "I4v5kQouxxF"
          );

          return {
            id: instance.trackedEntityInstance,
            status: instance.status,
            enrollment: instance.enrollment,
            date: dateDataValue ? dateDataValue.value : null,
            time: timeDataValue ? timeDataValue.value : null,
          };
        });

        setAppointments(appointmentsData);

        setIsFetchingDetails(true);
        const patientDetails = await fetchAllPatientDetails(appointmentsData);
        setPatientDetailsCache(patientDetails);
        setIsFetchingDetails(false);
      }
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
                program: response.enrollments?.[0]?.program || "N/A",
                totalAppointments: response.enrollments?.length || 0,
                honoredAppointments:
                  response.enrollments?.filter((a) => a.status === "HONORED")
                    .length || 0,
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

    const getFullName = (attributes) => {
      const firstName = attributes.find(
        (attr) => attr.displayName === "First name"
      )?.value;
      const lastName = attributes.find(
        (attr) => attr.displayName === "Last name"
      )?.value;
      return firstName && lastName ? `${firstName} ${lastName}` : "Unknown";
    };

    fetchData();
  }, [data]);

  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = useMemo(() => appointments.slice(startIndex, endIndex), [appointments, startIndex, endIndex]);

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
      <h1>Appointment Progress Report</h1>
      <table>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Health Program</th>
            <th>Total Appointments</th>
            <th>Honored Appointments</th>
            <th>Percentage Honored (%)</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.length > 0 ? (
            currentRows.map((appointment, index) => {
              const patient = patientDetailsCache[appointment.id];
              const name = patient ? patient.fullName : "Fetching...";
              const program = patient ? patient.program : "Fetching...";
              const totalAppointments = patient?.totalAppointments || 0;
              const honoredAppointments = patient?.honoredAppointments || 0;
              const percentageHonored =
                totalAppointments > 0
                  ? ((honoredAppointments / totalAppointments) * 100).toFixed(2)
                  : "0";

              return (
                <tr key={index}>
                  <td>{name}</td>
                  <td>{program}</td>
                  <td>{totalAppointments}</td>
                  <td>{honoredAppointments}</td>
                  <td>{percentageHonored}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
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

export default ProgressReport;