import React, { useState } from 'react';
import './AddForm.css';
import API_URL from '../../../config';

const AddPatientForm = ({encodedCredentials, handleBack }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [address, setAddress] = useState({
    firstLine: '',
    secondLine: '',
    pincode: ''
  });
  const [symptom, setSymptom] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const payload = {
      firstName: firstName,
      lastName: lastName,
      phoneNo: phoneNo,
      address: address,
      symptom: symptom
    };

    // Send API request to add the patient
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + encodedCredentials);
    headers.append('Content-Type', 'application/json');
    fetch(API_URL + '/hospital/patient/add', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload),
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
          throw new Error('Error adding a patient.');
        }
      }
      return response.json();
    })
    
    .then((data) => {
      console.log('Patient Added:', data);
      setSuccess(true);
      setError('');
      setValidationErrors([]);
    })
    .catch((error) => {
      if (error.validationErrors) {
        setValidationErrors(error.validationErrors);
        setError('Failed to add a patient');
      } else {
        setError('Error adding a patient');
        console.error('Error adding a patient:', error);
      }
    });
  };

  const handleReset = () => {
    setFirstName('');
    setLastName('');
    setPhoneNo('');
    setAddress({
      firstLine: '',
      secondLine: '',
      pincode: ''
    });
    setSymptom('');
    setSuccess(false);
    setError('');
    setValidationErrors([]);
  };

  return (
    <div className="add-patient-form-container">
      <button type="button" className="back-button" onClick={handleBack}>
        Back
      </button>

      {error && !success && (
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

      {!success ? (
        <div>
          <h3>Add Patient</h3>
          <form className="add-patient-form" onSubmit={handleFormSubmit}>
            {/* Form fields */}
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
                type="text"
                id="phoneNo"
                name="phoneNo"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                className="input-field"
              />
            </div>
            <div className="address-group">
              <div className="form-group">
                <label htmlFor="firstLine">Address - First Line:</label>
                <input
                  type="text"
                  id="firstLine"
                  name="firstLine"
                  value={address.firstLine}
                  onChange={(e) =>
                    setAddress({ ...address, firstLine: e.target.value })
                  }
                  className="input-field"
                />
              </div>
              <div className="form-group">
                <label htmlFor="secondLine">Address - Second Line:</label>
                <input
                  type="text"
                  id="secondLine"
                  name="secondLine"
                  value={address.secondLine}
                  onChange={(e) =>
                    setAddress({ ...address, secondLine: e.target.value })
                  }
                  className="input-field"
                />
              </div>
              <div className="form-group">
                <label htmlFor="pincode">Address - Pincode:</label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={address.pincode}
                  onChange={(e) =>
                    setAddress({ ...address, pincode: e.target.value })
                  }
                  className="input-field"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="symptom">Symptom:</label>
              <input
                type="text"
                id="symptom"
                name="symptom"
                value={symptom}
                onChange={(e) => setSymptom(e.target.value)}
                className="input-field"
              />
            </div>
            {/* Form submission buttons */}
            <div className="form-buttons">
              <button type="reset" className="reset-button" onClick={handleReset}>
                Reset
              </button>
              <button type="submit" className="submit-button">
                Add
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="patient-added-container">
  <h3>Patient Added</h3>
  <span className="success-icon">&#10003;</span>
  <p className="success-message">
 Patient added successfully!
</p>

  <button className="add-another-button" onClick={handleReset}>
    Add Another Patient
  </button>
</div>

      )}
    </div>
  );
};

export default AddPatientForm;
