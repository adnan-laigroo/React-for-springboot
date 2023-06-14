import React, { useState } from 'react';
import AdminDashboard from '../Dashboards/AdminDashboard';
    const AdminLoginForm = ({handleBackButtonClick}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      // Redirect to the doctor dashboard
      setLoggedIn(true);
    }
   
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };
  if (loggedIn) {
    
      return (
        <AdminDashboard handleLogout={handleLogout} />
      );
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

export default AdminLoginForm;
