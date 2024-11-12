import React from 'react';
import './FollowUp.css';

const FollowUpTable = () => {
    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Appointment status</th>
                        <th>Appointment date</th>
                        <th>AppointmentCheck</th> 
                    </tr>
                </thead>
                <tbody>
                    
                    <tr>
                        <td>VICTOR NANGWIYA</td>
                        <td>rescheduled</td>
                        <td>10/12/2024</td>
                        <td><input type="checkbox" /></td>
                    </tr>
                    <tr>
                        <td>VICTOR NANGWIYA</td>
                        <td>scheduled</td>
                        <td>01/12/2024</td>
                        <td><input type="checkbox" /></td>
                    </tr>
                    
                
                    
                </tbody>
            </table>
        </div>
    );
};

export default FollowUpTable;
