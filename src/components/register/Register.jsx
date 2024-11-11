import React, { useState, useEffect } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { registerPatient } from "./Api";
import "./Register.css";

// DHIS2 query to fetch organization units
const orgUnitQuery = {
  organisationUnits: {
    resource: "organisationUnits.json", // Endpoint to fetch org units
    params: {
      level: 2, // Level 1 org units, adjust as needed
      fields: "id,name", // Specify the fields you need
      paging: false, // Disable pagination to fetch all units
    },
  },
};

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    phone: "",
    address: "",
    orgUnit: "", // Select organization unit dynamically if needed
  });

  const [orgUnits, setOrgUnits] = useState([]); // Ensure it's initialized as an array

  // Fetch organization units from DHIS2 API
  const { loading, error, data } = useDataQuery(orgUnitQuery);
  console.log(data);
  

  useEffect(() => {
    if (data && Array.isArray(data.organisationUnits.organisationUnits)) {
      setOrgUnits(data.organisationUnits.organisationUnits); // Set fetched organization units only if it's an array
      console.log(orgUnits);
    }
  }, [data]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerPatient(formData);
      alert("Patient registered successfully");
    } catch (error) {
      console.error("Error registering patient:", error);
      alert("Error registering patient");
    }
  };

  if (loading) return <div>Loading organization units...</div>;
  if (error) return <div>Error fetching organization units</div>;

  return (
    <div className="register-form">
      <h2>Register Patient</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dob"
          placeholder="Date of Birth"
          onChange={handleChange}
          required
        />
        <div>
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              onChange={handleChange}
              required
            />{" "}
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              onChange={handleChange}
              required
            />{" "}
            Female
          </label>
        </div>
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          onChange={handleChange}
        />
        <select name="orgUnit" onChange={handleChange} required>
          <option value="">Select Organization Unit</option>
          {Array.isArray(orgUnits) && orgUnits.length > 0 ? (
            orgUnits.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.name}
              </option>
            ))
          ) : (
            <option disabled>No organization units available</option>
          )}
        </select>
        <button type="submit">Register</button>
        <button type="reset">Cancel</button>
      </form>
    </div>
  );
};

export default Register;