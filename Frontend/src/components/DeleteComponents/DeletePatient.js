import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './DeleteUser.css';
import API_URL from '../../config';

const DeletePatient = ({ handleBack }) => {
  const [patId, setPatId] = useState('');
  const [patientData, setPatientData] = useState(null);
  const [error, setError] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (!patId) {
      setPatientData(null);
      return;
    }

    fetchPatientDetails();
  }, [patId]);

  const fetchPatientDetails = () => {
    fetch(API_URL +`/hospital/patient/get/${patId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching patient details');
        }
        return response.json();
      })
      .then((data) => {
        setPatientData(data);
        setError('');
      })
      .catch((error) => {
        console.error('Error fetching patient details:', error);
        setError('Failed to fetch patient details. Please try again.');
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!confirmed) {
      setError('Please confirm deletion by checking the box.');
      return;
    }

    deletePatient();
  };

  const deletePatient = () => {
    fetch(`http://localhost:8080/hospital/patient/delete/${patId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error deleting patient');
        }
        setDeleteSuccess(true);
        setError('');
      })
      .catch((error) => {
        console.error('Error deleting patient:', error);
        setError('Failed to delete patient. Please try again.');
      });
  };

  const handlePatIdChange = (e) => {
    setPatId(e.target.value);
    setPatientData(null);
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
      <h3>Delete Patient</h3>
      <form className="delete-user-form" onSubmit={handleFormSubmit}>

        <div className="user-form-group">
          <label htmlFor="patId">Patient ID:</label>
          <input
            type="text"
            id="patId"
            name="patId"
            value={patId}
            className="input-field"
            onChange={handlePatIdChange}
          />
        </div>
        {patientData && (
          <>
            <div className="user-form-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={patientData.firstName}
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
                value={patientData.lastName}
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
                value={patientData.phoneNo}
                className="input-field"
                readOnly
              />
            </div>
            <div className="user-form-group">
              <label htmlFor="symptom">Symptom:</label>
              <input
                type="text"
                id="symptom"
                name="symptom"
                value={patientData.symptom}
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
          <p>Patient deleted successfully.</p>
        </div>
      )}
    </div>
  );
};

export default DeletePatient;
