import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './DeleteUser.css';
import API_URL from '../../config';

const DeleteAappointment = ({ handleBack }) => {
  const [apId, setApId] = useState('');
  const [patId, setPatId] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [docId, setDocId] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [appointmentStatus, setAppointmentStatus] = useState('');
  const [error, setError] = useState('');
  const [initialLoad, setInitialLoad] = useState(true);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [confirmed, setConfirmed] = useState(false); // Confirmation state

  useEffect(() => {
    if (!initialLoad) {
      // Fetch doctor details based on email
      if (apId) {
        fetch(API_URL + `/hospital/appointment/get/${apId}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Error fetching appointment details');
            }
            return response.json();
          })
          .then((data) => {
            const {
              patId,
              bloodGroup,
              docId,
              appointmentDate,
              appointmentTime,
              appointmentStatus,
            } = data;
            setPatId(patId);
            setBloodGroup(bloodGroup);
            setDocId(docId);
            setAppointmentDate(appointmentDate);
            setAppointmentTime(appointmentTime);
            setAppointmentStatus(appointmentStatus);
            setError('');
          })
          .catch((error) => {
            console.error('Error fetching appointment details:', error);
            setError('Failed to fetch appointment details. Please try again.');
          });
      }
    } else {
      setInitialLoad(false);
    }
  }, [apId, initialLoad]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Check if confirmed before deleting
    if (!confirmed) {
      setError('Please confirm deletion by checking the box.');
      return;
    }

    // Send API request to delete the doctor
    fetch(`http://localhost:8080/hospital/appointment/delete/${apId}`, {
      method: 'DELETE',
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
    setAppointmentDate('');
    setAppointmentStatus('');
    setAppointmentTime('');
    setBloodGroup('');
    setDocId('');
    setPatId('');
    setError('');
  };

  const handleCheckboxChange = (e) => {
    setConfirmed(e.target.checked);
    setError(''); // Clear any error messages when checkbox state changes
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
        {patId && (
          <>
            <div className="user-form-group">
              <label htmlFor="patId">Patient ID:</label>
              <input
                type="text"
                id="patId"
                name="patId"
                value={patId}
                className="input-field"
                readOnly
              />
            </div>
            <div className="user-form-group">
              <label htmlFor="bloodGroup">Blood Group:</label>
              <input
                type="text"
                id="bloodGroup"
                name="bloodGroup"
                value={bloodGroup}
                className="input-field"
                readOnly
              />
            </div>
            <div className="user-form-group">
              <label htmlFor="phoneNo">Doctor Id:</label>
              <input
                type="text"
                id="docId"
                name="docId"
                value={docId}
                className="input-field"
                readOnly
              />
            </div>
            <div className="user-form-group">
              <label htmlFor="appointmentDate">appointment Date:</label>
              <input
                type="date"
                id="appointmentDate"
                name="appointmentDate"
                value={appointmentDate}
                className="input-field"
                readOnly
              />
            </div>
            <div className="user-form-group">
              <label htmlFor="appointmentTime">Appointment Time:</label>
              <input
                type="time"
                id="appointmentTime"
                name="appointmentTime"
                value={appointmentTime}
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
                value={appointmentStatus}
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
          <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
          <p>Doctor deleted successfully.</p>
        </div>
      )}
    </div>
  );
};

export default DeleteAappointment;