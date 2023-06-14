import React, { useState } from 'react';
import './Homepage.css';
import Header from './Header';
import Navigation from './Navigation';
import HomeSection from './HomeSection';
import LoginForm from '../Login_Forms/LoginForm';
import AboutSection from './AboutSection';
import ContactSection from './ContactSection';
import DoctorDashboard from '../Dashboards/DoctorDashboard';
import ReceptionistDashboard from '../Dashboards/ReceptionistDashboard';
import AdminLoginForm from '../Login_Forms/AdminLoginForm';

const Homepage = () => {
  const [activeButton, setActiveButton] = useState('Home');
  const [showUserLoginForm, setShowUserLoginForm] = useState(false);
  const [showAdminLoginForm, setAdminLoginForm] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    setShowUserLoginForm(false);
    setAdminLoginForm(false);
    setShowAbout(false);
    setShowContact(false);

    if (buttonName === 'Home') {
      // Handle home button click if needed
    } else if (buttonName === 'UserLogin') {
      setShowUserLoginForm(true);
    } else if (buttonName === 'AdminLogin') {
      setAdminLoginForm(true);
    } else if (buttonName === 'About') {
      setShowAbout(true);
    } else if (buttonName === 'Contact') {
      setShowContact(true);
    }
  };

  const handleBackButtonClick = () => {
    setActiveButton('Home');
    setShowUserLoginForm(false);
    setAdminLoginForm(false);
    setShowAbout(false);
    setShowContact(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', e.target);
    // Perform backend validation and set loggedIn and userRole accordingly
    // For simplicity, let's assume successful validation for the example
    setLoggedIn(true);
    setUserRole(e.target.username.value === 'doctor' ? 'Doctor' : 'Receptionist');
  };

  return (
    <div className="homepage-container">
    <div>
      <Header />
      <Navigation activeButton={activeButton} handleButtonClick={handleButtonClick} />

      {activeButton === 'Home' && (
        <HomeSection handleButtonClick={handleButtonClick} />
      )}

      {showUserLoginForm && !loggedIn && (
  
      <LoginForm handleBackButtonClick={handleBackButtonClick} handleFormSubmit={handleFormSubmit} />
      
      )}

      {showAdminLoginForm && (
        <AdminLoginForm handleBackButtonClick={handleBackButtonClick} handleFormSubmit={handleFormSubmit} />
      )}

      {showAbout && (
        <AboutSection />
      )}

      {showContact && (
        <ContactSection />
      )}

      {loggedIn && userRole === 'Doctor' && (
        <DoctorDashboard handleLogout={handleBackButtonClick} />
      )}

      {loggedIn && userRole === 'Receptionist' && (
        <ReceptionistDashboard handleLogout={handleBackButtonClick} />
      )}

      {/* Rest of the content */}
    </div>
    </div>
    
  );
};

export default Homepage;
