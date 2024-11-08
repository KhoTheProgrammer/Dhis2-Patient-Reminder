import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Register.css';

// DHIS2 API Configuration
const DHIS2_API_URL = 'https://localhost:8080/dhis/api'; // Replace with your DHIS2 API URL
const DHIS2_AUTH = {
    username: 'admin', // Replace with your DHIS2 username
    password: 'district', // Replace with your DHIS2 password
};

// API Functions
const fetchOrgUnits = async () => {
    const response = await axios.get(`${DHIS2_API_URL}/organisationUnits`, {
        auth: DHIS2_AUTH,
    });
    return response.data.organisationUnits; // Adjust based on the actual response structure
};

const fetchPrograms = async () => {
    const response = await axios.get(`${DHIS2_API_URL}/programs.json?fields=id,name`, {
        auth: DHIS2_AUTH,
    });
    return response.data.programs; // Adjust based on the actual response structure
};

const registerPatient = async (patientData) => {
    const response = await axios.post(`${DHIS2_API_URL}/patients`, patientData, {
        auth: DHIS2_AUTH,
    });
    return response.data; // Adjust based on the actual response structure
};

// Patient Registration Component
const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        dob: '',
        phone: '',
        gender: '',
        orgUnit: '',
        healthProgram: '',
    });

    const [orgUnits, setOrgUnits] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const getOrgUnitsAndPrograms = async () => {
            try {
                const units = await fetchOrgUnits();
                const progs = await fetchPrograms();
                setOrgUnits(units);
                setPrograms(progs);
            } catch (error) {
                console.error('Error fetching organization units or programs:', error);
                setMessage('Error fetching data ehem');
            }
        };
        getOrgUnitsAndPrograms();
    }, []);

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
            setMessage('Patient registered successfully');
            // Reset form after successful registration
            setFormData({
                firstName: '',
                lastName: '',
                address: '',
                dob: '',
                phone: '',
                gender: '',
                orgUnit: '',
                healthProgram: '',
            });
        } catch (error) {
            console.error('Error registering patient:', error);
            setMessage('Error registering patient');
        }
    };

    return (
        <div className="register-form">
            <h2>Register Patient</h2>
            <form onSubmit={handleSubmit}>
                <div>First Name</div>
                <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
                <div>Sirname</div>
                <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
                <div>Address</div>
                <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
                <div>Date of Birth</div>
                <input type="date" name="dob" onChange={handleChange} required />
                <div>Phone Number</div>
                <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
                <select name="gender" onChange={handleChange} required>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                <select name="orgUnit" onChange={handleChange} required>
                    <option value="">Select Organisation Unit</option>
                    {orgUnits.map(unit => (
                        <option key={unit.id} value={unit.id}>{unit.name}</option>
                    ))}
                </select>
                <select name="healthProgram" onChange={handleChange} required>
                    <option value="">Select Health Program</option>
                    {programs.map(program => (
                        <option key={program.id} value={program.id}>{program.name}</option>
                    ))}
                </select>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;