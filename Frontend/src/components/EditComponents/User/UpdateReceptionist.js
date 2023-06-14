import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './UpdateUserForm.css';
import API_URL from '../../../config';

const UpdateReceptionist = ({ handleBack }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [error, setError] = useState('');
  const [initialLoad, setInitialLoad] = useState(true);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (!initialLoad) {
      // Fetch eeceptionist details based on email
      fetch(API_URL + `/hospital/receptionist/get/${email}`)
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
  }, [email]);

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
    fetch(`http://localhost:8080/hospital/receptionist/update/${email}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedReceptionistData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error updating receptionist');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Receptionist Updated:', data);
        setUpdateSuccess(true);
        setError('');
      })
      .catch((error) => {
        console.error('Error updating receptionist:', error);
        setError('Failed to update receptionist. Please try again.');
      });
  };

  return (
    <div className="update-appointment-form-container">
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
      {error && <p className="error-message">{error}</p>}
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