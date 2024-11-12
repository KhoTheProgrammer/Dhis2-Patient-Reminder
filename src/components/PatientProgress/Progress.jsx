import React from 'react';
import './progress.css'; // Importing the CSS file

function Progress() {
  const data = [
    { name: 'Victor Major', appointments: 3, achieved: 3, progress: '100%' },
    { name: 'Victor Major', appointments: 3, achieved: 3, progress: '100%' },
    { name: 'Victor Major', appointments: 3, achieved: 3, progress: '100%' },
    { name: 'Victor Major', appointments: 3, achieved: 3, progress: '100%' },
    { name: 'Victor Major', appointments: 3, achieved: 3, progress: '100%' },
    { name: 'Victor Major', appointments: 3, achieved: 3, progress: '100%' },
    { name: 'Victor Major', appointments: 3, achieved: 3, progress: '100%' },
  ];

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>No. of Appointment</th>
            <th>Achieved</th>
            <th>Progress %</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td>{row.appointments}</td>
              <td>{row.achieved}</td>
              <td>{row.progress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Progress;
