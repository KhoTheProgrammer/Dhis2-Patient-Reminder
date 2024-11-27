import React, { useEffect, useState } from "react";
import "./FollowUp.css";
import { appointmentQuery, fetchPatientDetails, updateAppointmentStatus // API for updating appointment status
} from "./api";
import { useDataQuery } from "@dhis2/app-runtime";
import { CircularLoader } from "@dhis2/ui";
import { ids } from "../../assets/Ids";
const FollowUpTable = () => {
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
          const dateDataValue = instance.dataValues.find(dataValue => dataValue.dataElement === ids.date);
          const timeDataValue = instance.dataValues.find(dataValue => dataValue.dataElement === ids.time);
          return {
            id: instance.trackedEntityInstance,
            status: instance.status,
            enrollment: instance.enrollment,
            date: dateDataValue ? dateDataValue.value : null,
            time: timeDataValue ? timeDataValue.value : null,
            event: instance.event
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
  const getFullName = attributes => {
    var _attributes$find, _attributes$find2;
    const firstName = (_attributes$find = attributes.find(attr => attr.displayName === "First name")) === null || _attributes$find === void 0 ? void 0 : _attributes$find.value;
    const lastName = (_attributes$find2 = attributes.find(attr => attr.displayName === "Last name")) === null || _attributes$find2 === void 0 ? void 0 : _attributes$find2.value;
    return firstName && lastName ? `${firstName} ${lastName}` : "Unknown";
  };
  const fetchAllPatientDetails = async appointmentsData => {
    const uniqueIds = [...new Set(appointmentsData.map(a => a.id))];
    const patientDetails = {};
    await Promise.all(uniqueIds.map(async id => {
      try {
        if (!patientDetailsCache[id]) {
          const response = await fetchPatientDetails(id);
          patientDetails[id] = {
            fullName: getFullName(response.attributes),
            ...response
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
  const handleCheckboxChange = async appointment => {
    // Update local state optimistically
    const updatedAppointments = appointments.map(a => a.event === appointment.event ? {
      ...a,
      status: "COMPLETED"
    } : a);
    setAppointments(updatedAppointments);

    // Persist the status update to the database
    try {
      await updateAppointmentStatus({
        ...appointment,
        status: "COMPLETED"
      });
    } catch (error) {
      console.error("Failed to update appointment status:", error);
      // Revert the status update on failure
      setAppointments(prev => prev.map(a => a.event === appointment.event ? {
        ...a,
        status: appointment.status
      } : a));
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
  if (loading || isFetchingDetails) return /*#__PURE__*/React.createElement("div", {
    className: "loader"
  }, /*#__PURE__*/React.createElement(CircularLoader, null), /*#__PURE__*/React.createElement("p", null, "Fetching appointments and patient details. Please wait..."));
  if (error) return /*#__PURE__*/React.createElement("div", {
    className: "error-message"
  }, /*#__PURE__*/React.createElement("p", null, "Error fetching appointments: ", error.message));
  return /*#__PURE__*/React.createElement("div", {
    className: "table-container"
  }, /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Appointment Status"), /*#__PURE__*/React.createElement("th", null, "Appointment Date"), /*#__PURE__*/React.createElement("th", null, "Appointment Check"))), /*#__PURE__*/React.createElement("tbody", null, currentRows.length > 0 ? currentRows.map((appointment, index) => {
    const patient = patientDetailsCache[appointment.id];
    const name = patient ? patient.fullName : "Fetching...";
    return /*#__PURE__*/React.createElement("tr", {
      key: index
    }, /*#__PURE__*/React.createElement("td", null, name), /*#__PURE__*/React.createElement("td", null, appointment.status), /*#__PURE__*/React.createElement("td", null, appointment.date ? new Date(appointment.date).toLocaleDateString() : "No Date"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      disabled: appointment.status === "Complete",
      checked: appointment.status === "Complete",
      onChange: () => handleCheckboxChange(appointment)
    })));
  }) : /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: "4",
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
export default FollowUpTable;