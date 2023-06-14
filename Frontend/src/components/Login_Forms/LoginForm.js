import React, { useState } from 'react';
import ReceptionistDashboard from '../Dashboards/ReceptionistDashboard';
import DoctorDashboard from '../Dashboards/DoctorDashboard';
    const LoginForm = ({handleBackButtonClick}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Perform authentication and validation logic here
    // Example: Check if the username and password are valid

    if (username === 'doctor' && password === 'password') {
      // Redirect to the doctor dashboard
      setLoggedIn(true);
      setUserRole('Doctor');
    } else if (username === 'receptionist' && password === 'password') {
      // Redirect to the receptionist dashboard
      setLoggedIn(true);
      setUserRole('Receptionist');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserRole('');
  };
  if (loggedIn) {
    if (userRole === 'Doctor') {
      return (
        <DoctorDashboard handleLogout={handleLogout} />
      );
    } else if (userRole === 'Receptionist') {
      return (
        <ReceptionistDashboard handleLogout={handleLogout} />
      );
    }
  }

  return (
    <section className="form-section">
      <div className="back-button-container">
        <button className="back-button" onClick={handleBackButtonClick}>
          Back
        </button>
      </div>
      <h1 className="login-title">Login</h1>
      <form className="login-form" onSubmit={handleFormSubmit}>
        <div>
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
          <button type="reset" className="reset-button">
            Reset
          </button>
          <button type="submit">Sign In</button>
        </div>
      </form>
    </section>
  );
};

export default LoginForm;
