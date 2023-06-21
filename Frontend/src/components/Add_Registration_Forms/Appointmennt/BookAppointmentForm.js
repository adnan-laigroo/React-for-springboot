import React, { useState } from 'react';
import { FaCheck, FaSpinner } from 'react-icons/fa';
import './BookAppointmentForm.css';
import API_URL from '../../../config';

const BookAppointmentForm = ({ encodedCredentials, handleBack }) => {
  const [patId, setPatId] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [appointmentBooked, setAppointmentBooked] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Format appointment time to "hh:mm:ss"
    const formattedAppointmentTime = appointmentTime + ':00';

    // Send API request to book the appointment
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + encodedCredentials);
    headers.append('Content-Type', 'application/json');
    fetch(API_URL + `/hospital/appointment/add`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        patId: patId,
        bloodGroup: bloodGroup,
        appointmentTime: formattedAppointmentTime,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 400 || response.status === 404) {
            return response.json().then((data) => {
              throw Object.assign(new Error('Validation Error'), {
                validationErrors: data.messages || [],
              });
            });
          } else {
            throw new Error('Error booking appointment');
          }
        }
        return response.json();
      })
      .then((data) => {
        console.log('Appointment Booked:', data);
        setAppointmentBooked(true);
        setError('');
        setValidationErrors([]);
      })
      .catch((error) => {
        if (error.validationErrors) {
          setValidationErrors(error.validationErrors);
          setError('Failed to book an appointment');
        } else {
          setError('Error booking appointment');
          console.error('Error booking appointment:', error);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleReset = () => {
    setPatId('');
    setBloodGroup('');
    setAppointmentTime('');
  };

  return (
    <div className="book-appointment-form-container">
      <button className="back-button" onClick={handleBack}>
        Back
      </button>
      {error && !appointmentBooked && (
        <div className="appointment-error-message">
          {error}
          {validationErrors.length > 0 && (
            <ul className="validation-errors">
              {validationErrors.map((errorMsg, index) => (
                <li key={index}>{errorMsg}</li>
              ))}
            </ul>
          )}
        </div>
      )}
      {!appointmentBooked ? (
        <div>
          <h3>Book Appointment</h3>
          <form className="book-appointment-form" onSubmit={handleFormSubmit}>
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
              <label htmlFor="blood-group">Blood Group:</label>
              <select
                id="blood-group"
                name="blood-group"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="input-field"
              >
                <option value="">Select a blood group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="appointment-time">Appointment Time:</label>
              <input
                type="time"
                id="appointment-time"
                name="appointment-time"
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
                className="input-field"
              />
            </div>
            <div className="appointment-form-buttons">
              <button type="reset" className="appointment-reset-button" onClick={handleReset}>
                Reset
              </button>
              <button type="submit" className="appointment-submit-button" disabled={isLoading}>
                {isLoading ? (
                  <FaSpinner className="loading-icon" />
                ) : (
                  <>
                    Book <FaCheck className="submit-icon" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <h3>Appointment Booked</h3>
          <FaCheck className="confirm-tick" />
          <button className="back-button" onClick={handleBack}>
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default BookAppointmentForm;
