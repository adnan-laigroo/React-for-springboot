import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './UpdateUserForm.css';
import API_URL from '../../../config';

const UpdateReceptionist = ({ encodedCredentials }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [error, setError] = useState('');
  const [initialLoad, setInitialLoad] = useState(true);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    if (!initialLoad) {
      // Fetch eeceptionist details based on email
      const headers = new Headers();
      headers.append('Authorization', 'Basic ' + encodedCredentials);
      fetch(API_URL + `/hospital/receptionist/get/${email}`,{
        headers: headers
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error fetching receptionist details');
          }
          return response.json();
        })
        .then((data) => {
          const {
            firstName,
            lastName,
            email,
            phoneNo
          } = data;
          setFirstName(firstName);
          setLastName(lastName);
          setEmail(email);
          setPhoneNo(phoneNo);
          setError('');
        })
        .catch((error) => {
          console.error('Error fetching receptionist details:', error);
          setError('Failed to fetch receptionist details. Please try again.');
        });
    } else {
      setInitialLoad(false);
    }
  }, [initialLoad, encodedCredentials, email]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Prepare updated receptionist data
    const updatedReceptionistData = {
      firstName : firstName,
      lastName : lastName,
         email :   email,
            phoneNo:phoneNo
    };

    // Send API request to update the appointment
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + encodedCredentials);
    headers.append('Content-Type', 'application/json');
    fetch(`${API_URL}/hospital/receptionist/update/${email}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(updatedReceptionistData),
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
          throw new Error('Error updating receptionist');
        }
      }
      return response.json();
    })
    
    .then((data) => {
      console.log('Receptionist Updated:', data);
      setUpdateSuccess(true);
      setError('');
      setValidationErrors([]);
    })
    .catch((error) => {
      console.error('Error updating receptionist:', error);
      if (error.validationErrors && error.validationErrors.length > 0) {
        setError('Failed to update receptionist');
        setValidationErrors(error.validationErrors);
      } else {
        setError('Failed to update receptionist. Please try again.');
        setValidationErrors([]);
      }
    });
  };

  return (
    <div className="update-appointment-form-container">
      {error && !updateSuccess && (
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
      <h3>Update Receptionist</h3>
      <form className="update-appointment-form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email ID:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNo">Phone Number:</label>
          <input
            type="number"
            id="phoneNo"
            name="phoneNo"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="update-button-container">
          <button type="submit" className="submit-button">
            Update
          </button>
        
        </div>
      </form>
      {updateSuccess && (
        <div className="success-message">
          <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
          <p>Receptionist updated successfully.</p>
        </div>
      )}
    </div>
  );
};

export default UpdateReceptionist;