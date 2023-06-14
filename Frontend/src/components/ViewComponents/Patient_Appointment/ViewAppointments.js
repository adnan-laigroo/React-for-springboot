import React, { useEffect, useState } from 'react';
import { FaCheck, FaClock } from 'react-icons/fa';
import './tableStyle.css'; // Import the CSS file
import API_URL from '../../../config';

const ViewAppointments = ({ handleBack }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch appointments from the API
    fetch(API_URL + '/hospital/appointment/list')
      .then((response) => response.json())
      .then((data) => {
        // Update state with fetched appointments
        setAppointments(data);
        setLoading(false);
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error fetching appointments:', error);
        setLoading(false);
      });
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Done':
        return 'green';
      case 'Pending':
        return 'yellow';
      default:
        return 'black';
    }
  };

  const handleUpdateStatus = (appointmentId) => {
    // Send API request to update the appointment status
    fetch(`http://localhost:8080/hospital/appointment/update/${appointmentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ appointmentStatus: 'Done' }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Fetch the updated list of appointments
        fetch('http://localhost:8080/hospital/appointment/list')
          .then((response) => response.json())
          .then((data) => {
            // Update state with the fetched appointments
            setAppointments(data);
          })
          .catch((error) => {
            console.error('Error fetching appointments:', error);
          });
      })
      .catch((error) => {
        console.error('Error updating appointment status:', error);
      });
  };

  return (
    <div>
      <button className="back-button" onClick={handleBack}>
        Back
      </button>
      <h3>View Appointments</h3>
      {loading ? (
        <p>Loading appointments...</p>
      ) : (
        <div className="table-container">
          {appointments.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Appointment ID</th>
                  <th>Patient ID</th>
                  <th>Blood Group</th>
                  <th>Doctor ID</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Actions</th> {/* Add a new table header for actions */}
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.apId}>
                    <td>{appointment.apId}</td>
                    <td>{appointment.patId}</td>
                    <td>{appointment.bloodGroup}</td>
                    <td>{appointment.docId}</td>
                    <td>{appointment.appointmentDate}</td>
                    <td>{appointment.appointmentTime}</td>
                    <td>
                      <span
                        className="status-icon"
                        style={{
                          color: getStatusColor(appointment.appointmentStatus),
                        }}
                      >
                        {appointment.appointmentStatus === 'Done' ? (
                          <FaCheck />
                        ) : (
                          <FaClock />
                        )}
                      </span>
                      {appointment.appointmentStatus}
                    </td>
                    <td>
                      {appointment.appointmentStatus === 'Pending' && (
                        <button
                          onClick={() => handleUpdateStatus(appointment.apId)}
                          className="update-button"
                        >
                          Update Status
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No appointments found.</p>
          )}

        </div>
      )}
    </div>
  );
};

export default ViewAppointments;