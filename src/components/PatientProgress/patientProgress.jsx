// PatientProgress.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./patientProgress.css"

const PatientProgress = () => {
  const { patientId } = useParams(); // Get patient ID from the URL
  const [progress, setProgress] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch data for a specific patient
  useEffect(() => {
    const fetchData = async () => {
      try {
        const progressData = await fetchPatientProgress(patientId);
        const appointmentData = await fetchAppointments(patientId);
        setProgress(progressData);
        setAppointments(appointmentData);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [patientId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>{progress.name}'s Progress</h2>
      <p>Program: {progress.programName}</p>
      <p>Status: {progress.status}</p>

      <h3>Appointments</h3>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            <p>Appointment Date: {appointment.date}</p>
            <p>Status: {appointment.attended ? 'Attended' : 'Missed'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientProgress;
