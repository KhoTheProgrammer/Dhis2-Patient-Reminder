import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './patientProgress.css';  // Import the CSS file


// Placeholder functions for fetching patient progress and appointments
const fetchPatientProgress = async (patientId) => {
  const response = await fetch(`/api/patients/${patientId}/progress`);
  if (!response.ok) {
    throw new Error('Failed to fetch progress data');
  }
  return await response.json();
};

const fetchAppointments = async (patientId) => {
  const response = await fetch(`/api/patients/${patientId}/appointments`);
  if (!response.ok) {
    throw new Error('Failed to fetch appointments');
  }
  return await response.json();
};

const PatientProgress = () => {
  const { patientId } = useParams();  // Get patient ID from the URL
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
        console.error(err);  // Log the error to the console for debugging
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

  if (!progress) {
    return <div>Patient progress data is not available.</div>;
  }

  return (
    <div>
      <h2>{progress.name}'s Progress</h2>
      <p>Program: {progress.programName}</p>
      <p>Status: {progress.status}</p>

      <h3>Appointments</h3>
      <ul>
        {appointments.length === 0 ? (
          <li>No appointments found.</li>
        ) : (
          appointments.map((appointment) => (
            <li key={appointment.id}>
              <p>Appointment Date: {appointment.date}</p>
              <p>Status: {appointment.attended ? 'Attended' : 'Missed'}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default PatientProgress;
