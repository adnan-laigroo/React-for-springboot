import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './DeleteUser.css';
import API_URL from '../../config';

const DeleteReceptionist = ({ handleBack, encodedCredentials }) => {
  const [receptionist, setReceptionist] = useState(null);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [confirmed, setConfirmed] = useState(false); // Confirmation state

useEffect(() => {
  if (email) {
    fetchReceptionistDetails();
  }
} );


  const fetchReceptionistDetails = () => {
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + encodedCredentials);

    fetch(`${API_URL}/hospital/receptionist/get/${email}`, {
      headers: headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching receptionist details');
        }
        return response.json();
      })
      .then((data) => {
        setReceptionist(data);
        setError('');
      })
      .catch((error) => {
        console.error('Error fetching receptionist details:', error);
        setError('Failed to fetch receptionist details. Please try again.');
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Check if confirmed before deleting
    if (!confirmed) {
      setError('Please confirm deletion by checking the box.');
      return;
    }

    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + encodedCredentials);

    fetch(`${API_URL}/hospital/receptionist/delete/${email}`, {
      method: 'DELETE',
      headers: headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error deleting receptionist');
        }
        setDeleteSuccess(true);
        setError('');
      })
      .catch((error) => {
        console.error('Error deleting receptionist:', error);
        setError('Failed to delete receptionist. Please try again.');
      });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setReceptionist(null);
    setError('');
  };

  const handleCheckboxChange = (e) => {
    setConfirmed(e.target.checked);
    setError('');
  };

  return (
    <div className="delete-user-container">
      
      <h3>Delete receptionist</h3>
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
        {receptionist && (
          <>
            <div className="user-form-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={receptionist.firstName}
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
                value={receptionist.lastName}
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
                value={receptionist.phoneNo}
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
          <p>Receptionist deleted successfully.</p>
        </div>
      )}
    </div>
  );
};

export default DeleteReceptionist;
