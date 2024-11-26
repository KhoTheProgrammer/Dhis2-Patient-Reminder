import React, { useEffect, useState, useMemo } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { appointmentQuery, fetchPatientDetails } from "../FollowUp/api";
import { CircularLoader } from "@dhis2/ui";
const ProgressReport = () => {
  const {
    loading,
    error,
    data
  } = useDataQuery(appointmentQuery);
  const [appointments, setAppointments] = useState([]);
  const [patientDetailsCache, setPatientDetailsCache] = useState({});
  const [isFetchingDetails, setIsFetchingDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;
  useEffect(() => {
    const fetchData = async () => {
      if (data) {
        const appointmentsData = data.events.events.map(instance => {
          const dateDataValue = instance.dataValues.find(dataValue => dataValue.dataElement === "T0tg47LBsdW");
          const timeDataValue = instance.dataValues.find(dataValue => dataValue.dataElement === "I4v5kQouxxF");
          return {
            id: instance.trackedEntityInstance,
            status: instance.status,
            enrollment: instance.enrollment,
            date: dateDataValue ? dateDataValue.value : null,
            time: timeDataValue ? timeDataValue.value : null
          };
        });
        setAppointments(appointmentsData);
        setIsFetchingDetails(true);
        const patientDetails = await fetchAllPatientDetails(appointmentsData);
        setPatientDetailsCache(patientDetails);
        setIsFetchingDetails(false);
      }
    };
    const fetchAllPatientDetails = async appointmentsData => {
      const uniqueIds = [...new Set(appointmentsData.map(a => a.id))];
      const patientDetails = {};
      await Promise.all(uniqueIds.map(async id => {
        try {
          if (!patientDetailsCache[id]) {
            var _response$enrollments, _response$enrollments2, _response$enrollments3, _response$enrollments4;
            const response = await fetchPatientDetails(id);
            patientDetails[id] = {
              fullName: getFullName(response.attributes),
              healthProgram: ((_response$enrollments = response.enrollments) === null || _response$enrollments === void 0 ? void 0 : (_response$enrollments2 = _response$enrollments[0]) === null || _response$enrollments2 === void 0 ? void 0 : _response$enrollments2.program) || "N/A",
              totalAppointments: ((_response$enrollments3 = response.enrollments) === null || _response$enrollments3 === void 0 ? void 0 : _response$enrollments3.length) || 0,
              honoredAppointments: ((_response$enrollments4 = response.enrollments) === null || _response$enrollments4 === void 0 ? void 0 : _response$enrollments4.filter(a => a.status === "HONORED").length) || 0
            };
          } else {
            patientDetails[id] = patientDetailsCache[id];
          }
        } catch (error) {
          console.error(`Failed to fetch details for patient ID: ${id}`, error);
        }
      }));
      return patientDetails;
    };
    const getFullName = attributes => {
      var _attributes$find, _attributes$find2;
      const firstName = (_attributes$find = attributes.find(attr => attr.displayName === "First name")) === null || _attributes$find === void 0 ? void 0 : _attributes$find.value;
      const lastName = (_attributes$find2 = attributes.find(attr => attr.displayName === "Last name")) === null || _attributes$find2 === void 0 ? void 0 : _attributes$find2.value;
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
  if (loading || isFetchingDetails) return /*#__PURE__*/React.createElement("div", {
    className: "loader"
  }, /*#__PURE__*/React.createElement(CircularLoader, null), /*#__PURE__*/React.createElement("p", null, "Fetching appointments and patient details. Please wait..."));
  if (error) return /*#__PURE__*/React.createElement("div", {
    className: "error-message"
  }, /*#__PURE__*/React.createElement("p", null, "Error fetching appointments: ", error.message));
  return /*#__PURE__*/React.createElement("div", {
    className: "table-container"
  }, /*#__PURE__*/React.createElement("h1", null, "Appointment Progress Report"), /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Patient Name"), /*#__PURE__*/React.createElement("th", null, "Health Program"), /*#__PURE__*/React.createElement("th", null, "Total Appointments"), /*#__PURE__*/React.createElement("th", null, "Honored Appointments"), /*#__PURE__*/React.createElement("th", null, "Percentage Honored (%)"))), /*#__PURE__*/React.createElement("tbody", null, currentRows.length > 0 ? currentRows.map((appointment, index) => {
    const patient = patientDetailsCache[appointment.id];
    const name = patient ? patient.fullName : "Fetching...";
    const totalAppointments = (patient === null || patient === void 0 ? void 0 : patient.totalAppointments) || 0;
    const honoredAppointments = (patient === null || patient === void 0 ? void 0 : patient.honoredAppointments) || 0;
    const percentageHonored = totalAppointments > 0 ? (honoredAppointments / totalAppointments * 100).toFixed(2) : "0";
    return /*#__PURE__*/React.createElement("tr", {
      key: index
    }, /*#__PURE__*/React.createElement("td", null, name), /*#__PURE__*/React.createElement("td", null, patient === null || patient === void 0 ? void 0 : patient.healthProgram), /*#__PURE__*/React.createElement("td", null, totalAppointments), /*#__PURE__*/React.createElement("td", null, honoredAppointments), /*#__PURE__*/React.createElement("td", null, percentageHonored));
  }) : /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: "5",
    style: {
      textAlign: "center"
    }
  }, "No appointments found.")))), /*#__PURE__*/React.createElement("div", {
    className: "pagination-buttons"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handlePrevious,
    disabled: currentPage === 0
  }, "Previous"), /*#__PURE__*/React.createElement("button", {
    onClick: handleNext,
    disabled: endIndex >= appointments.length
  }, "Next")));
};
export default ProgressReport;