import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './DeleteUser.css';
import API_URL from '../../config';

const DeleteDoctor = ({ handleBack }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [error, setError] = useState('');
  const [initialLoad, setInitialLoad] = useState(true);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [confirmed, setConfirmed] = useState(false); // Confirmation state

  useEffect(() => {
    if (!initialLoad) {
      // Fetch doctor details based on email
      if (email) {
        fetch(API_URL +`/hospital/doctor/get/${email}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Error fetching doctor details');
            }
            return response.json();
          })
          .then((data) => {
            const { firstName, lastName, email, phoneNo, speciality } = data;
            setFirstName(firstName);
            setLastName(lastName);
            setPhoneNo(phoneNo);
            setSpeciality(speciality);
            setError('');
          })
          .catch((error) => {
            console.error('Error fetching doctor details:', error);
            setError('Failed to fetch doctor details. Please try again.');
          });
      }
    } else {
      setInitialLoad(false);
    }
  }, [email, initialLoad]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Check if confirmed before deleting
    if (!confirmed) {
      setError('Please confirm deletion by checking the box.');
      return;
    }

    // Send API request to delete the doctor
    fetch(`http://localhost:8080/hospital/doctor/delete/${email}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error deleting doctor');
        }
        setDeleteSuccess(true);
        setError('');
      })
      .catch((error) => {
        console.error('Error deleting doctor:', error);
        setError('Failed to delete doctor. Please try again.');
      });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setFirstName('');
    setLastName('');
    setPhoneNo('');
    setSpeciality('');
    setError('');
  };

  const handleCheckboxChange = (e) => {
    setConfirmed(e.target.checked);
    setError(''); // Clear any error messages when checkbox state changes
  };

  return (
    <div className="delete-user-container">
      <h3>Delete Doctor</h3>
      <form className="delete-user-form" onSubmit={handleFormSubmit}>
        <div className="user-form-group">
          <label htmlFor="email">Email ID:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            className="input-field"
            onChange={handleEmailChange}
          />
        </div>
        {firstName && (
          <>
            <div className="user-form-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                className="input-field"
                readOnly
              />
            </div>
            <div className="user-form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                className="input-field"
                readOnly
              />
            </div>
            <div className="user-form-group">
              <label htmlFor="phoneNo">Phone Number:</label>
              <input
                type="number"
                id="phoneNo"
                name="phoneNo"
                value={phoneNo}
                className="input-field"
                readOnly
              />
            </div>
            <div className="user-form-group">
              <label htmlFor="speciality">Speciality:</label>
              <input
                type="text"
                id="speciality"
                name="speciality"
                value={speciality}
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

export default DeleteDoctor;