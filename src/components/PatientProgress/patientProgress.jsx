import React from 'react';
import './progress.css'; // Importing the CSS file

function ProgressT() {
  const data = [
    { name: 'adam Meja', appointments: 3, achieved: 3, progress: '100%' },
    { name: 'kondwani padyera', appointments: 3, achieved: 3, progress: '100%' },
    { name: 'kondwani kachikuni', appointments: 3, achieved: 3, progress: '100%' },
    { name: 'Victor Nangwiya', appointments: 3, achieved: 3, progress: '100%' },
    { name: 'justice khaira', appointments: 3, achieved: 3, progress: '100%' },
    { name: 'jonna umali', appointments: 3, achieved: 3, progress: '100%' },
    { name: 'lolesi meja', appointments: 3, achieved: 3, progress: '100%' },
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

export default ProgressT;
