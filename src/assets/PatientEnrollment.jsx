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
        healthProgram: '',
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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await enrollPatient(formData);
            alert('Patient enrolled successfully');
        } catch (error) {
            console.error('Error enrolling patient:', error);
            alert('Error enrolling patient');
        }
    };

    return (
        <div className="enrollment-form">
            <h2>Enroll Patient</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
                <input type="text" name="lastName" placeholder="Surname" onChange={handleChange} required />
                <input type="text" name="address" placeholder="Home Address" onChange={handleChange} />
                <input type="date" name="dob" placeholder="DOB" onChange={handleChange} required />
                <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} required />
                <div>
                    <label>
                        <input type="radio" name="gender" value="Male" onChange={handleChange} required /> Male
                    </label>
                    <label>
                        <input type="radio" name="gender" value="Female" onChange={handleChange} required /> Female
                    </label>
                </div>
                <select name="orgUnit" onChange={handleChange} required>
                    <option value="">Select Organisation Unit</option>
                    {orgUnits.map((unit) => (
                        <option key={unit.id} value={unit.id}>
                            {unit.displayName}
                        </option>
                    ))}
                </select>
                <select name="healthProgram" onChange={handleChange} required>
                    <option value="">Select Health Program</option>
                    {programs.map((program) => (
                        <option key={program.id} value={program.id}>
                            {program.displayName}
                        </option>
                    ))}
                </select>
                <button type="submit">Enroll</button>
                <button type="reset">Cancel</button>
            </form>
        </div>
    );
};

export default PatientEnrollment;
