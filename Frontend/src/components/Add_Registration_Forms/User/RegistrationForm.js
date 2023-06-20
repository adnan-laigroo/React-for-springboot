import React, { useState } from 'react';
import { FaUserCheck, FaUserPlus } from 'react-icons/fa';
import './RegistrationForm.css'; // Import the CSS file
import API_URL from '../../../config';

const RegistrationForm = ({ handleBack, encodedCredentials }) => {
  const initialFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    role: '', // Set default value as empty string
    password: '',
    speciality: '', // Only for Doctor role
  };

  const [formValues, setFormValues] = useState(initialFormValues);
  const [userCreated, setUserCreated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const endpoint =
      formValues.role === 'Doctor'
        ? '/hospital/doctor/add'
        : '/hospital/receptionist/add';

    const formData = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      phoneNo: formValues.phoneNo,
      role: formValues.role,
      password: formValues.password,
    };

    if (formValues.role === 'Doctor') {
      formData.speciality = formValues.speciality;
    }

    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + encodedCredentials);
    headers.append('Content-Type', 'application/json');

    fetch(API_URL + endpoint, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(formData),
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
          throw new Error('Error adding a ' + formValues.role);
        }
      }
      return response.json();
    })
    
      .then((data) => {
        console.log('User registered:', data);
        setUserCreated(true);
        setUserRole(formValues.role);
        setIsSubmitting(false);
        setFormValues(initialFormValues);
        setError('');
        setValidationErrors([]);
      })
      .catch((error) => {
        setIsSubmitting(false);
        if (error.validationErrors) {
          setValidationErrors(error.validationErrors);
          setError('Failed to add a ' + formValues.role);
        } else {
          setError('Error adding a patient');
          console.error('Error adding a ' + formValues.role);
        }
      });
  };

  const handleFormReset = () => {
    setFormValues(initialFormValues);
    
  };

  return (
    <section className="form-section">
      <div className="back-button-container">
        <button className="back-button" onClick={handleBack}>
          Back
        </button>
        
      {error && !userCreated && (
        <div className="user-create-error-message">
          {error}
          {validationErrors.length > 0 && (
            <ul className="user-create-validation-errors">
              {validationErrors.map((errorMsg, index) => (
                <li key={index}>{errorMsg}</li>
              ))}
            </ul>
          )}
        </div>
      )}
      </div>
      <h1 className="register-title">Register</h1>
      <form className="register-form" onSubmit={handleFormSubmit}>
        {/* Form fields */}
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formValues.firstName}
            onChange={handleFormChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formValues.lastName}
            onChange={handleFormChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleFormChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNo">Phone No:</label>
          <input
            type="text"
            id="phoneNo"
            name="phoneNo"
            value={formValues.phoneNo}
            onChange={handleFormChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            name="role"
            value={formValues.role}
            onChange={handleFormChange}
            className="input-field"
          >
            <option value="">Select Role</option> {/* Default value */}
            <option value="Doctor">Doctor</option>
            <option value="Receptionist">Receptionist</option>
          </select>
        </div>
        {formValues.role === 'Doctor' && (
          <div className="form-group">
            <label htmlFor="speciality">Speciality:</label>
            <input
              type="text"
              id="speciality"
              name="speciality"
              value={formValues.speciality}
              onChange={handleFormChange}
              className="input-field"
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formValues.password}
            onChange={handleFormChange}
            className="input-field"
          />
        </div>
       {/* Form submission buttons */}
       <div className="button-group">
          <button type="reset" className="reset-button" onClick={handleFormReset}>
            Reset
          </button>
          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Sign In'}
          </button>
        </div>
      </form>

      {userCreated && (
        <div className="success-message-top">
          {userRole === 'Doctor' ? (
            <>
              <FaUserCheck className="success-icon" />
              <p className="success-text">New doctor user created!</p>
            </>
          ) : (
            <>
              <FaUserPlus className="success-icon" />
              <p className="success-text">New receptionist user created!</p>
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default RegistrationForm;
