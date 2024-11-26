import React from 'react';
import './Progress.css'; // Importing the CSS file

function ProgressT() {
  const data = [
    { name: 'Adam Meja', appointments: 6, achieved: 3, progress: '50%' },
    { name: 'kondwani padyera', appointments: 4, achieved: 4, progress: '100%' },
    { name: 'kondwani kachikuni', appointments: 5, achieved: 3, progress: '60%' },
    { name: 'Victor Nangwiya', appointments: 3, achieved: 3, progress: '100%' },
    { name: 'justice khaira', appointments: 7, achieved: 3, progress: '45%' },
    { name: 'jonna umali', appointments: 4, achieved: 3, progress: '75%' },
    { name: 'Innocent mwendenge Chisi', appointments: 6, achieved: 3, progress: '50%' },
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
