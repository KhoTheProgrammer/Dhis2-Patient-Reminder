import React, { useState, useEffect } from 'react';
import { enrollPatient, fetchOrgUnits, fetchPrograms } from './Api';
import './PatientEnrollment.css';
const PatientEnrollment = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    dob: '',
    phone: '',
    gender: '',
    orgUnit: '',
    healthProgram: ''
  });
  const [orgUnits, setOrgUnits] = useState([]);
  const [programs, setPrograms] = useState([]);
  useEffect(() => {
    const loadOrgUnits = async () => {
      try {
        const units = await fetchOrgUnits();
        setOrgUnits(units);
      } catch (error) {
        console.error('Error loading organization units:', error);
      }
    };
    const loadPrograms = async () => {
      try {
        const programs = await fetchPrograms();
        setPrograms(programs);
      } catch (error) {
        console.error('Error loading programs:', error);
      }
    };
    loadOrgUnits();
    loadPrograms();
  }, []);
  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await enrollPatient(formData);
      alert('Patient enrolled successfully');
    } catch (error) {
      console.error('Error enrolling patient:', error);
      alert('Error enrolling patient');
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "enrollment-form"
  }, /*#__PURE__*/React.createElement("h2", null, "Enroll Patient"), /*#__PURE__*/React.createElement("form", {
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
    placeholder: "Surname",
    onChange: handleChange,
    required: true
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "address",
    placeholder: "Home Address",
    onChange: handleChange
  }), /*#__PURE__*/React.createElement("input", {
    type: "date",
    name: "dob",
    placeholder: "DOB",
    onChange: handleChange,
    required: true
  }), /*#__PURE__*/React.createElement("input", {
    type: "tel",
    name: "phone",
    placeholder: "Phone Number",
    onChange: handleChange,
    required: true
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "gender",
    value: "Male",
    onChange: handleChange,
    required: true
  }), " Male"), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "gender",
    value: "Female",
    onChange: handleChange,
    required: true
  }), " Female")), /*#__PURE__*/React.createElement("select", {
    name: "orgUnit",
    onChange: handleChange,
    required: true
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Select Organisation Unit"), orgUnits.map(unit => /*#__PURE__*/React.createElement("option", {
    key: unit.id,
    value: unit.id
  }, unit.displayName))), /*#__PURE__*/React.createElement("select", {
    name: "healthProgram",
    onChange: handleChange,
    required: true
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Select Health Program"), programs.map(program => /*#__PURE__*/React.createElement("option", {
    key: program.id,
    value: program.id
  }, program.displayName))), /*#__PURE__*/React.createElement("button", {
    type: "submit"
  }, "Enroll"), /*#__PURE__*/React.createElement("button", {
    type: "reset"
  }, "Cancel")));
};
export default PatientEnrollment;