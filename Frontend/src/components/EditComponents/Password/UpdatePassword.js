import React, { useState, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import './UpdatePasswordForm.css';
import API_URL from '../../../config';
import LoginForm from '../../Login_Forms/LoginForm';

const UpdatePasswordForm = ({ username, encodedCredentials, handleBack, handleLogout }) => {
  const [newPassword, setNewPassword] = useState('');
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [error, setError] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [dialogTimer, setDialogTimer] = useState(10); // Timer in seconds

  useEffect(() => {
    let timer;
    if (showDialog) {
      // Start the timer when the dialog is shown
      timer = setInterval(() => {
        setDialogTimer((prevTimer) => prevTimer - 1);
      }, 1000); // Decrease the timer every second
    }
    return () => {
      // Clear the timer when the component is unmounted or dialog is closed
      clearInterval(timer);
    };
  }, [showDialog]);

  useEffect(() => {
    if (dialogTimer === 0) {
      handleDialogTimeout();
    }
  }, [dialogTimer]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (username.toLowerCase() === 'admin') {
      setError('In - memory Admin cannot change the password');
      return;
    }

    // Send API request to update the password
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + encodedCredentials);
    headers.append('Content-Type', 'application/json');
    fetch(API_URL + `/hospital/user/update/password/${username}`, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify({ password: newPassword }),
    })
      .then((response) => {
        if (response.ok) {
          // Password updated successfully
          return response.json().then((data) => {
            console.log('Password updated:', data);
            setPasswordUpdated(true);
            setShowDialog(true);
          });
        } else if (response.status === 400) {
          // Validation error occurred
          return response.json().then((data) => {
            setError('Failed to update password');
            setValidationErrors(data.messages || []);
          });
        } else {
          // Other error occurred
          throw new Error('Failed to update password');
        }
      })
      .catch((error) => {
        console.error('Error updating password:', error);
        // Set the error state and display the error message
        setError('Failed to update password');
      });
  };

  const handleReset = () => {
    setNewPassword('');
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    handleLogout();
    //setIsLoggedIn(false);
    // Logout the user and render the login form
  };

  const handleDialogTimeout = () => {
    setShowDialog(false);
    handleLogout();
    // Logout the user and render the login form
  };

  return (
    <div className="update-password-form-container">
      {/* ... */}
      {!passwordUpdated ? (
        <div>
          {/* ... */}
          <form className="update-password-form" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="formUsername">Username:</label>
              <input value={username} className="input-field" readOnly />
            </div>
            {username.toLowerCase() !== 'admin' ? (
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
              <div className="form-password-buttons">
              <button type="reset" className="reset-button" onClick={handleReset}>
                Reset
              </button>
              {username.toLowerCase() !== 'admin' && (
                <button type="submit" className="submit-button">
                  Update Password
                </button>
              )}
            </div>
              </div>
              
            ) : (
              <div>
              <p className="password-disabled-message">Password cannot be changed for an in-memory admin.</p>
              <div>
              <button type="reset" className="back-button" onClick={handleBack}>
                Back
              </button>
              </div>
              </div>
            )}
            
          </form>
          {error && !passwordUpdated && (
            <div className="password-error-message">
              <p className="error-message">{error}</p>
              {validationErrors && (
                <ul className="validation-errors">
                  {validationErrors.map((errorMsg, index) => (
                    <li key={index} className="validation-error">{errorMsg}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      ) : (
        <div>
          {/* ... */}
        </div>
      )}
      {/* ... */}
    </div>
  );
};

export default UpdatePasswordForm;
