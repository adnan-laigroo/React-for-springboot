import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './UpdateAppointmentForm.css';
import API_URL from '../../../config';

const UpdateAppointmentForm = ({ handleBack }) => {
  const [apId, setApId] = useState('');
  const [patId, setPatId] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [docId, setDocId] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [appointmentStatus, setAppointmentStatus] = useState('');
  const [error, setError] = useState('');
  const [initialLoad, setInitialLoad] = useState(true);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (!initialLoad) {
      // Fetch appointment details based on apId
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
    } else {
      setInitialLoad(false);
    }
  }, [apId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Prepare updated appointment data
    const updatedAppointmentData = {
      apId: apId,
      patId: patId,
      bloodGroup: bloodGroup,
      docId: docId,
      appointmentDate: appointmentDate,
      appointmentTime: appointmentTime,
      appointmentStatus: appointmentStatus,
    };

    // Send API request to update the appointment
    fetch(`http://localhost:8080/hospital/appointment/update/${apId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedAppointmentData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error updating appointment');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Appointment Updated:', data);
        setUpdateSuccess(true);
        setError('');
      })
      .catch((error) => {
        console.error('Error updating appointment:', error);
        setError('Failed to update appointment. Please try again.');
      });
  };

  return (
    <div className="update-appointment-form-container">
        <button type="button" className="back-button" onClick={handleBack}>
            Back
          </button>
      <h3>Update Appointment</h3>
      <form className="update-appointment-form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="apId">Appointment ID:</label>
          <input
            type="text"
            id="apId"
            name="apId"
            value={apId}
            onChange={(e) => setApId(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="patId">Patient ID:</label>
          <input
            type="text"
            id="patId"
            name="patId"
            value={patId}
            onChange={(e) => setPatId(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="bloodGroup">Blood Group:</label>
          <input
            type="text"
            id="bloodGroup"
            name="bloodGroup"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="docId">Doctor ID:</label>
          <input
            type="text"
            id="docId"
            name="docId"
            value={docId}
            onChange={(e) => setDocId(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="appointmentDate">Appointment Date:</label>
          <input
            type="date"
            id="appointmentDate"
            name="appointmentDate"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="appointmentTime">Appointment Time:</label>
          <input
            type="time"
            id="appointmentTime"
            name="appointmentTime"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="appointmentStatus">Appointment Status:</label>
          <input
            type="text"
            id="appointmentStatus"
            name="appointmentStatus"
            value={appointmentStatus}
            onChange={(e) => setAppointmentStatus(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="update-button-container">
          <button type="submit" className="submit-button">
            Update
          </button>
        
        </div>
      </form>
      {error && <p className="error-message">{error}</p>}
      {updateSuccess && (
        <div className="success-message">
          <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
          <p>Appointment updated successfully.</p>
        </div>
      )}
    </div>
  );
};

export default UpdateAppointmentForm;