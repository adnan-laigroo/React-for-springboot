import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import './UpdatePasswordForm.css';
import API_URL from '../../../config';

const UpdatePasswordForm = ({ handleBack }) => {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Send API request to update the password
    fetch(API_URL + `/hospital/user/update/password/${username}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: newPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Password updated:', data);
        setPasswordUpdated(true);
      })
      .catch((error) => {
        console.error('Error updating password:', error);
      });
  };

  const handleReset = () => {
    setUsername('');
    setNewPassword('');
  };

  return (
    <div className="update-password-form-container">
       <button className="back-button" onClick={handleBack}>
            Back
          </button>
      {!passwordUpdated ? (
        <div>
          <h3>Change Password</h3>
          <form className="update-password-form" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label htmlFor="new-password">New Password:</label>
              <input
                type="password"
                id="new-password"
                name="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="input-field"
              />
            </div>
            <div className="form-password-buttons">
              <button type="reset" className="reset-button" onClick={handleReset}>
                Reset
              </button>
              <button type="submit" className="submit-button">
                Update Password
              </button>
            </div>
          </form>
       
        </div>
      ) : (
        <div>
          <h3>Password Updated</h3>
          <FaCheck className="confirm-tick" />
         
        </div>
      )}
    </div>
  );
};

export default UpdatePasswordForm;
