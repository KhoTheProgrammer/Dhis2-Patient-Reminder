import React, { useState, useEffect } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { registerPatient } from "./Api";
import "./Register.css";
import { Button, NoticeBox, CircularLoader } from "@dhis2/ui";

// DHIS2 query to fetch organization units
const orgUnitQuery = {
  organisationUnits: {
    resource: "organisationUnits.json",
    // Endpoint to fetch org units
    params: {
      level: 2,
      // Level 1 org units, adjust as needed
      fields: "id,name",
      // Specify the fields you need
      paging: false // Disable pagination to fetch all units
    }
  }
};
const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    phone: "",
    address: "",
    orgUnit: "" // Select organization unit dynamically if needed
  });
  const [orgUnits, setOrgUnits] = useState([]); // Ensure it's initialized as an array
  const [loadin, setLoading] = useState(false);
  const [enrollmentSuccess, setEnrollmentSuccess] = useState(false);

  // Fetch organization units from DHIS2 API
  const {
    loading,
    error,
    data
  } = useDataQuery(orgUnitQuery);
  console.log(data);
  useEffect(() => {
    if (data && Array.isArray(data.organisationUnits.organisationUnits)) {
      setOrgUnits(data.organisationUnits.organisationUnits); // Set fetched organization units only if it's an array
      console.log(orgUnits);
    }
  }, [data]);
  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted

    try {
      const response = await registerPatient(formData); // Call the registerPatient function to send the data
      if (response.status === "OK") {
        setEnrollmentSuccess(true);
      }
    } catch (error) {
      console.error("Error registering patient:", error);
      alert("Error registering patient");
    } finally {
      setLoading(false); // Set loading to false after the registration process is finished
    }
  };
  if (loading) return /*#__PURE__*/React.createElement("div", {
    className: "loader"
  }, /*#__PURE__*/React.createElement(CircularLoader, null), " ", /*#__PURE__*/React.createElement("p", null, "Getting organisation Units. Please wait..."));
  if (error) return /*#__PURE__*/React.createElement("div", null, "Error fetching organization units");
  return /*#__PURE__*/React.createElement("div", {
    className: "register-form"
  }, /*#__PURE__*/React.createElement("h2", null, "Register Patient"), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "firstName",
    placeholder: "First Name",
    onChange: handleChange,
    required: true
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "lastName",
    placeholder: "Last Name",
    onChange: handleChange,
    required: true
  }), /*#__PURE__*/React.createElement("input", {
    type: "date",
    name: "dob",
    placeholder: "Date of Birth",
    onChange: handleChange,
    max: new Date().toISOString().split('T')[0],
    required: true
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "gender",
    value: "Male",
    onChange: handleChange,
    required: true
  }), " ", "Male"), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "gender",
    value: "Female",
    onChange: handleChange,
    required: true
  }), " ", "Female")), /*#__PURE__*/React.createElement("input", {
    type: "tel",
    name: "phone",
    placeholder: "Phone Number (e.g. 0999 123 456)",
    pattern: "^(09|08|07|02)\\d{8}$",
    title: "Please enter a valid Malawian phone number, e.g., 0999123456",
    onChange: handleChange,
    required: true
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "address",
    placeholder: "Address",
    onChange: handleChange
  }), /*#__PURE__*/React.createElement("select", {
    name: "orgUnit",
    onChange: handleChange,
    required: true
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Select Organization Unit"), Array.isArray(orgUnits) && orgUnits.length > 0 ? orgUnits.map(unit => /*#__PURE__*/React.createElement("option", {
    key: unit.id,
    value: unit.id
  }, unit.name)) : /*#__PURE__*/React.createElement("option", {
    disabled: true
  }, "No organization units available")), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    disabled: loadin,
    loading: loadin
  }, loadin ? "Registering..." : "Register"), enrollmentSuccess && /*#__PURE__*/React.createElement(NoticeBox, {
    title: "Success",
    success: true
  }, "Patient Registered successfully!"), /*#__PURE__*/React.createElement("button", {
    type: "reset"
  }, "Cancel")));
};
export default Register;