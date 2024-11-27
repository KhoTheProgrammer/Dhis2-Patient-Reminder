import React from 'react';
import './progress.css'; // Importing the CSS file

function Progress() {
  const data = [
    { name: 'Adam Meja', appointments: 6, achieved: 3, progress: '50%' },
    { name: 'Kondwani Padyera', appointments: 4, achieved: 4, progress: '100%' },
    { name: 'Kondwani Kachikuni', appointments: 5, achieved: 3, progress: '60%' },
    { name: 'Victor Nangwiya', appointments: 3, achieved: 3, progress: '100%' },
    { name: 'Justice Khaira', appointments: 7, achieved: 3, progress: '45%' },
    { name: 'Jonna Umali', appointments: 4, achieved: 3, progress: '75%' },
    { name: 'Innocent Mwendenge Chisi', appointments: 6, achieved: 3, progress: '50%' },
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