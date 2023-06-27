import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './DeleteUser.css';
import API_URL from '../../config';

const DeleteAppointment = ({ handleBack, encodedCredentials }) => {
  const [apId, setApId] = useState('');
  const [appointmentData, setAppointmentData] = useState(null);
  const [error, setError] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const fetchAppointmentDetails = useCallback(() => {
    if (!apId) {
      setAppointmentData(null);
      return;
    }

    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + encodedCredentials);

    fetch(`${API_URL}/hospital/appointment/get/${apId}`, {
      headers: headers
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching appointment details');
        }
        return response.json();
      })
      .then((data) => {
        setAppointmentData(data);
        setError('');
      })
      .catch((error) => {
        console.error('Error fetching appointment details:', error);
        setError('Failed to fetch appointment details. Please try again.');
      });
  }, [apId, encodedCredentials]);

  useEffect(() => {
    fetchAppointmentDetails();
  }, [fetchAppointmentDetails]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!confirmed) {
      setError('Please confirm deletion by checking the box.');
      return;
    }

    deleteAppointment();
  };

  const deleteAppointment = () => {
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + encodedCredentials);

    fetch(`${API_URL}/hospital/appointment/delete/${apId}`, {
      method: 'DELETE',
      headers: headers
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error deleting appointment');
        }
        setDeleteSuccess(true);
        setError('');
      })
      .catch((error) => {
        console.error('Error deleting appointment:', error);
        setError('Failed to delete appointment. Please try again.');
      });
  };

  const handleApIdChange = (e) => {
    setApId(e.target.value);
    setAppointmentData(null);
  };

  const handleCheckboxChange = (e) => {
    setConfirmed(e.target.checked);
    setError('');
  };

  return (
    <div className="delete-user-container">
      <div className="back-button-container">
        <button className="back-button" onClick={handleBack}>
          <span className="back-button-text">Back</span>
        </button>
      </div>
      <h3>Delete Appointment</h3>
      <form className="delete-user-form" onSubmit={handleFormSubmit}>
        <div className="user-form-group">
          <label htmlFor="apId">Appointment ID:</label>
          <input
            type="text"
            id="apId"
            name="apId"
            value={apId}
            className="input-field"
            onChange={handleApIdChange}
          />
        </div>
        {appointmentData && (
          <>
            <div className="user-form-group">
              <label htmlFor="patId">Patient ID:</label>
              <input
                type="text"
                id="patId"
                name="patId"
                value={appointmentData.patId}
                className="input-field"
                readOnly
              />
            </div>
            <div className="user-form-group">
              <label htmlFor="appointmentTime">Appointment Time:</label>
              <input
                type="text"
                id="appointmentTime"
                name="appointmentTime"
                value={appointmentData.appointmentTime}
                className="input-field"
                readOnly
              />
            </div>
            <div className="user-form-group">
              <label htmlFor="appointmentStatus">Appointment Status:</label>
              <input
                type="text"
                id="appointmentStatus"
                name="appointmentStatus"
                value={appointmentData.appointmentStatus}
                className="input-field"
                readOnly
              />
            </div>
          </>
        )}
        <div className="user-form-group">
          <label htmlFor="confirmCheckbox">
            <input
              type="checkbox"
              id="confirmCheckbox"
              name="confirmCheckbox"
              checked={confirmed}
              onChange={handleCheckboxChange}
            />{' '}
            Confirm deletion
          </label>
        </div>

        <div className="user-form-buttons">
          <button type="submit" className="delete-button">
            Delete
          </button>
        </div>
      </form>
      {error && <p className="error-message">{error}</p>}
      {deleteSuccess && (
        <div className="success-message">
          <FontAwesomeIcon icon={faCheckCircle} />
          <p>Appointment deleted successfully.</p>
        </div>
      )}
    </div>
  );
};

export default DeleteAppointment;
