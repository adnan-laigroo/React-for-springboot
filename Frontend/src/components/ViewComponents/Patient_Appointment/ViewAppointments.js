import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FaCheck, FaClock } from 'react-icons/fa';
import './tableStyle.css'; // Import the CSS file
import API_URL from '../../../config';

const ViewAppointments = ({ encodedCredentials, handleBack }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    // Fetch appointments from the API
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + encodedCredentials);
    fetch(API_URL + '/hospital/appointment/list', {
      method: 'GET',
      headers: headers,
    })
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
  }, [encodedCredentials]);

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
    // Display the updating status
    setUpdatingStatus(true);

    // Send API request to update the appointment status
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + encodedCredentials);
    headers.append('Content-Type', 'application/json');
    fetch(API_URL + `/hospital/appointment/update/status/${appointmentId}`, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify({ appointmentStatus: 'Done' }),
    })
      .then((response) => response.json())
      .then(() => {
        // Fetch the updated list of appointments
        fetch(API_URL + '/hospital/appointment/list', {
          method: 'GET',
          headers: headers,
        })
          .then((response) => response.json())
          .then((data) => {
            // Update state with the fetched appointments
            setAppointments(data);
            setUpdatingStatus(false); // Clear the updating status
          })
          .catch((error) => {
            console.error('Error fetching appointments:', error);
          });
      })
      .catch((error) => {
        console.error('Error updating appointment status:', error);
      });
  };

  const handleViewPrescriptions = (appointmentId) => {
    // Send API request to view prescriptions for the given appointment
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + encodedCredentials);
    fetch(API_URL + `/hospital/prescription/list?apId=${appointmentId}`, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        // Update state with the fetched prescriptions
        setPrescriptions(data);
      })
      .catch((error) => {
        console.error('Error fetching prescriptions:', error);
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
                  <th>Actions</th>
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
                        <div>
                          <button
                            onClick={() =>
                              handleUpdateStatus(appointment.apId)
                            }
                            className="update-button"
                            disabled={updatingStatus}
                          >
                            {updatingStatus ? (
                              <FontAwesomeIcon icon={faSpinner} spin />
                            ) : (
                              'Update Status'
                            )}
                          </button>
                          <button
                            onClick={() =>
                              handleViewPrescriptions(appointment.apId)
                            }
                            className="view-prescriptions-button"
                          >
                            View Prescriptions
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No appointments found.</p>
          )}

          {prescriptions.length > 0 && (
            <div>
              <h4>Prescriptions</h4>
              <ul>
                {prescriptions.map((prescription) => (
                  <li key={prescription.prescriptionId}>
                    Prescription ID: {prescription.prescriptionId}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewAppointments;
