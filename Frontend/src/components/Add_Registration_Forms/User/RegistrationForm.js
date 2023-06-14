import React, { useState } from 'react';
import { FaUserCheck, FaUserPlus } from 'react-icons/fa';
import './RegistrationForm.css'; // Import the CSS file
import API_URL from '../../../config';

const RegistrationForm = ({ handleBack }) => {
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

    fetch((API_URL + endpoint), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error registering user');
        }
        return response.json();
      })
      .then((data) => {
        console.log('User registered:', data);
        setUserCreated(true);
        setUserRole(formValues.role);
        setIsSubmitting(false);
        setFormValues(initialFormValues);
      })
      .catch((error) => {
        console.error('Error registering user:', error);
        setIsSubmitting(false);
        // Handle error or display an error message
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
