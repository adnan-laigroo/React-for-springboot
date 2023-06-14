import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './UpdatePatientForm.css';
import API_URL from '../../../config';

const UpdatePatientForm = ({ handleBack }) => {
  const [patId, setPatId] = useState('');
  const [patientData, setPatientData] = useState({
    firstName: '',
    lastName: '',
    phoneNo: '',
    address: '',
    symptom: ''
  });
  const [error, setError] = useState('');
  const [initialLoad, setInitialLoad] = useState(true);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (!initialLoad) {
      // Fetch patient details based on patId
      fetch(API_URL + `/hospital/patient/get/${patId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error fetching patient details');
          }
          return response.json();
        })
        .then((data) => {
          setPatientData({
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNo: data.phoneNo,
            address: data.address.firstLine + ', ' + data.address.secondLine + ', ' + data.address.pincode,
            symptom: data.symptom,
          });
          setError('');
        })
        .catch((error) => {
          console.error('Error fetching patient details:', error);
          setError('Failed to fetch patient details. Please try again.');
        });
    } else {
      setInitialLoad(false);
    }
  }, [patId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Prepare updated patient data
    const updatedPatientData = {
      patId: patId,
      firstName: patientData.firstName,
      lastName: patientData.lastName,
      address: {
        firstLine: patientData.address.split(',')[0].trim(),
        secondLine: patientData.address.split(',')[1].trim(),
        pincode: patientData.address.split(',')[2].trim(),
      },
      phoneNo: patientData.phoneNo,
      symptom: patientData.symptom,
    };

    // Send API request to update the patient
    fetch(`http://localhost:8080/hospital/patient/update/${patId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPatientData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error updating patient');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Patient Updated:', data);
        setUpdateSuccess(true);
        setError('');
      })
      .catch((error) => {
        console.error('Error updating patient:', error);
        setError('Failed to update patient. Please try again.');
      });
  };

  return (
    <div className="update-patient-form-container">
      <button type="button" className="back-button" onClick={handleBack}>
        Back
      </button>
      <h3>Update Patient</h3>
      <form className="update-patient-form" onSubmit={handleFormSubmit}>
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
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={patientData.firstName}
            onChange={(e) => setPatientData({ ...patientData, firstName: e.target.value })}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={patientData.lastName}
            onChange={(e) => setPatientData({ ...patientData, lastName: e.target.value })}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNo">Phone Number:</label>
          <input
            type="number"
            id="phoneNo"
            name="phoneNo"
            value={patientData.phoneNo}
            onChange={(e) => setPatientData({ ...patientData, phoneNo: e.target.value })}
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={patientData.address}
            onChange={(e) => setPatientData({ ...patientData, address: e.target.value })}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="symptom">Symptom:</label>
          <input
            type="text"
            id="symptom"
            name="symptom"
            value={patientData.symptom}
            onChange={(e) => setPatientData({ ...patientData, symptom: e.target.value })}
            className="input-field"
          />
        </div>
        <div className="form-update-buttons">
          <button type="submit" className="submit-button">
            Update
          </button>
        </div>
      </form>
      {error && <p className="error-message">{error}</p>}
      {updateSuccess && (
        <div className="success-message">
          <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
          <p>Patient updated successfully.</p>
        </div>
      )}
    </div>
  );
};

export default UpdatePatientForm;
