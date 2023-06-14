import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import './BookAppointmentForm.css';
import API_URL from '../../../config';

const BookAppointmentForm = ({ handleBack }) => {
  const [patId, setPatId] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [appointmentBooked, setAppointmentBooked] = useState(false);
  const [error, setError] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Format appointment time to "hh:mm:ss"
    const formattedAppointmentTime = appointmentTime + ':00';

    // Send API request to book the appointment
    fetch(API_URL + `/hospital/appointment/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({      
        patId: patId,
        bloodGroup: bloodGroup,
        appointmentTime: formattedAppointmentTime
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error booking appointment');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Appointment Booked:', data);
        setAppointmentBooked(true);
        setError('');
      })
      .catch((error) => {
        console.error('Error booking appointment:', error);
        setError('Failed to book appointment. Please try again.');
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
      {!appointmentBooked ? (
        <div>
          <h3>Book Appointment</h3>
          {error && <p className="error-message">{error}</p>}
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
              <input
                type="text"
                id="blood-group"
                name="blood-group"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="input-field"
              />
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
            <div className="form-buttons">
              <button type="reset" className="reset-button" onClick={handleReset}>
                Reset
              </button>
              <button type="submit" className="submit-button">
                Book
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
