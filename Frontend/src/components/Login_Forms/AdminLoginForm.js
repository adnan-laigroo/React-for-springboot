import React, { useState } from 'react';
import AdminDashboard from '../Dashboards/AdminDashboard';
import { FaExclamationCircle } from 'react-icons/fa';
import API_URL from '../../config';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const AdminLoginForm = ({ handleBackButtonClick }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [encodedCredentials, setEncodedCredentials] = useState('');
  const [loading, setLoading] = useState(false); // New state variable for loading state

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setLoginError(true);
      setErrorMessage('Please enter a username and password.');
      return;
    }

    const credentials = `${username}:${password}`;
    const encodedCredentials = btoa(credentials); // Encode credentials in Base64
    setEncodedCredentials(encodedCredentials);
    setLoading(true); // Set loading state to true

    fetch(`${API_URL}/hospital/user/authenticate`, {
      method: 'GET',
      headers: {
        Authorization: 'Basic ' + encodedCredentials,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText); // Throw error with the error message from the backend
        }
        return response.text(); // Read the response as text
      })
      .then(() => {
        setLoggedIn(true);
      })
      .catch((error) => {
        console.error('Error retrieving role:', error);
        setLoginError(true);
        setErrorMessage('Wrong username or password');
      })
      .finally(() => {
        setLoading(false); // Set loading state back to false after the request completes
      });
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const handleReset = () => {
    setUsername('');
    setPassword('');
    setLoginError(false);
    setErrorMessage('');
  };
  if (loggedIn) {
    return (
      <AdminDashboard
        handleLogout={handleLogout}
        encodedCredentials={encodedCredentials}
        username={username}
      />
    );
  }

  return (
    <section className="form-section">
      <div className="back-button-container">
        <button className="back-button" onClick={handleBackButtonClick}>
          Back
        </button>
      </div>
      <h1 className="login-title">Admin Login</h1>
      <form className="login-form" onSubmit={handleFormSubmit}>
        <div>
          {loginError && (
            <div className="error-message">
              <FaExclamationCircle className="error-icon" />
              {errorMessage}
            </div>
          )}
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="reset" onClick={handleReset} className="login-reset-button">
            Reset
          </button>
          <button type="submit" className="login-submit-button">
            {loading ? ( // Conditional rendering based on the loading state
              <span>
                <FontAwesomeIcon icon={faSpinner} spin /> Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AdminLoginForm;
