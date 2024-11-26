import React, { useState, useEffect } from "react";
import { Button, SingleSelect, SingleSelectOption, Input, NoticeBox } from "@dhis2/ui";
import { enrollPatient } from "./Api";
import "./PatientEnrollment.css";
import { useDataQuery } from "@dhis2/app-runtime";
import { ids } from "../../assets/Ids";
const orgUnitId = ids.orgUnit;
const programid = ids.program;
const orgUnitsQuery = {
  orgUnits: {
    resource: "organisationUnits",
    params: {
      fields: ["id", "displayName"],
      paging: false,
      level: 2
    }
  }
};

// Fetch programs for the selected organization unit
const programsQuery = orgUnitId => ({
  programs: {
    resource: "programs",
    params: {
      orgUnit: orgUnitId,
      fields: ["id", "displayName"],
      paging: false
    }
  }
});

// Fetch patients for the selected organization unit
const patientsQuery = orgUnitId => ({
  patients: {
    resource: "trackedEntityInstances",
    params: {
      ou: orgUnitId,
      trackedEntityType: ids.trackedEntityType,
      // Replace with your tracked entity type ID
      fields: ["trackedEntityInstance", "attributes"],
      pageSize: 50
    }
  }
});
const PatientEnrollment = () => {
  var _patientsData$patient, _orgUnitsData$orgUnit, _programsData$program;
  const [selectedOrgUnit, setSelectedOrgUnit] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [enrollmentDate, setEnrollmentDate] = useState(new Date().toISOString().split("T")[0]);
  const [enrollmentSuccess, setEnrollmentSuccess] = useState(false);
  const [enrollmentError, setEnrollmentError] = useState(null);
  const [validationError, setValidationError] = useState("");
  const [loading, setLoading] = useState(false); // New state for loading

  const {
    loading: loadingOrgUnits,
    data: orgUnitsData
  } = useDataQuery(orgUnitsQuery);
  const {
    loading: loadingPrograms,
    data: programsData,
    refetch: refetchPrograms
  } = useDataQuery(programsQuery(selectedOrgUnit), {
    lazy: true
  });
  const {
    loading: loadingPatients,
    data: patientsData,
    refetch: refetchPatients
  } = useDataQuery(patientsQuery(orgUnitId), {
    lazy: true
  });
  const patientsList = (patientsData === null || patientsData === void 0 ? void 0 : (_patientsData$patient = patientsData.patients) === null || _patientsData$patient === void 0 ? void 0 : _patientsData$patient.trackedEntityInstances) || [];
  const orgUnitsList = (orgUnitsData === null || orgUnitsData === void 0 ? void 0 : (_orgUnitsData$orgUnit = orgUnitsData.orgUnits) === null || _orgUnitsData$orgUnit === void 0 ? void 0 : _orgUnitsData$orgUnit.organisationUnits) || [];
  const programsList = (programsData === null || programsData === void 0 ? void 0 : (_programsData$program = programsData.programs) === null || _programsData$program === void 0 ? void 0 : _programsData$program.programs) || [];
  const handleEnroll = async () => {
    if (selectedPatient && selectedProgram && selectedOrgUnit) {
      setEnrollmentSuccess(false);
      setEnrollmentError(null);
      setValidationError("");
      setLoading(true); // Start loading state

      if (!selectedOrgUnit) return setValidationError("Please select an organization unit.");
      if (!selectedProgram) return setValidationError("Please select a program.");
      if (!selectedPatient) return setValidationError("Please select a patient.");
      if (!enrollmentDate) return setValidationError("Please enter an enrollment date.");
      try {
        const enrollmentData = {
          program: programid,
          orgUnit: orgUnitId,
          trackedEntityInstance: selectedPatient,
          enrollmentDate: enrollmentDate
        };
        const response = await enrollPatient(enrollmentData); // Make the API call
        if (response.status === "OK") {
          setEnrollmentSuccess(true);
          setEnrollmentError(null);
          console.log("kondwani");
        } else {
          setEnrollmentError("Enrollment failed: Unexpected response.");
        }
      } catch (err) {
        console.error("Enrollment failed:", err);
        setEnrollmentError("Conflict detected: Please check if the patient is already enrolled.");
      } finally {
        setLoading(false); // End loading state
      }
    }
  };
  useEffect(() => {
    if (selectedOrgUnit) {
      refetchPrograms();
      refetchPatients();
    }
  }, [selectedOrgUnit]);
  return /*#__PURE__*/React.createElement("div", {
    className: "enrol"
  }, /*#__PURE__*/React.createElement("div", {
    className: "enrol-in"
  }, /*#__PURE__*/React.createElement("h1", null, "Enroll Patient in Program"), loadingOrgUnits ? /*#__PURE__*/React.createElement("p", null, "Loading organization units...") : /*#__PURE__*/React.createElement(SingleSelect, {
    selected: selectedOrgUnit,
    onChange: _ref => {
      let {
        selected
      } = _ref;
      return setSelectedOrgUnit(selected);
    },
    placeholder: "Select an organization unit"
  }, orgUnitsList.map(orgUnit => /*#__PURE__*/React.createElement(SingleSelectOption, {
    key: orgUnit.id,
    label: orgUnit.displayName,
    value: orgUnit.id
  }))), loadingPrograms ? /*#__PURE__*/React.createElement("p", null, "Loading programs...") : /*#__PURE__*/React.createElement(SingleSelect, {
    selected: selectedProgram,
    onChange: _ref2 => {
      let {
        selected
      } = _ref2;
      return setSelectedProgram(selected);
    },
    placeholder: "Select a program"
  }, programsList.length > 0 ? programsList.map(program => /*#__PURE__*/React.createElement(SingleSelectOption, {
    key: program.id,
    label: program.displayName,
    value: program.id
  })) : /*#__PURE__*/React.createElement(SingleSelectOption, {
    disabled: true,
    label: "No programs found for this organization unit"
  })), loadingPatients ? /*#__PURE__*/React.createElement("p", null, "Loading patients...") : /*#__PURE__*/React.createElement(SingleSelect, {
    selected: selectedPatient,
    onChange: _ref3 => {
      let {
        selected
      } = _ref3;
      return setSelectedPatient(selected);
    },
    placeholder: "Select a patient"
  }, patientsList.length > 0 ? patientsList.map(patient => {
    var _patient$attributes$f, _patient$attributes$f2;
    return /*#__PURE__*/React.createElement(SingleSelectOption, {
      key: patient.trackedEntityInstance,
      label: ((_patient$attributes$f = patient.attributes.find(attr => attr.attribute === "w75KJ2mc4zz")) === null || _patient$attributes$f === void 0 ? void 0 : _patient$attributes$f.value) + " " + ((_patient$attributes$f2 = patient.attributes.find(attr => attr.attribute === "zDhUuAYrxNC")) === null || _patient$attributes$f2 === void 0 ? void 0 : _patient$attributes$f2.value),
      value: patient.trackedEntityInstance
    });
  }) : /*#__PURE__*/React.createElement(SingleSelectOption, {
    disabled: true,
    label: "No patients found for this organization unit"
  })), /*#__PURE__*/React.createElement(Input, {
    label: "Enrollment Date",
    type: "date",
    value: enrollmentDate,
    onChange: _ref4 => {
      let {
        value
      } = _ref4;
      return setEnrollmentDate(value);
    },
    required: true
  }), /*#__PURE__*/React.createElement(Button, {
    onClick: handleEnroll,
    primary: true,
    loading: loading,
    disabled: loading
  }, loading ? "Enrolling..." : "Enroll Patient"), validationError && /*#__PURE__*/React.createElement(NoticeBox, {
    title: "Missing Field",
    error: true
  }, validationError), enrollmentSuccess && /*#__PURE__*/React.createElement(NoticeBox, {
    title: "Success",
    success: true
  }, "Patient enrolled successfully!"), enrollmentError && /*#__PURE__*/React.createElement(NoticeBox, {
    title: "Enrollment Error",
    error: true
  }, enrollmentError)));
};
export default PatientEnrollment;