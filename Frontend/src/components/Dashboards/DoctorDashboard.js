import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faUsers, faKey,faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';
import ViewAppointments from '../ViewComponents/Patient_Appointment/ViewAppointments';
import ViewPatientList from '../ViewComponents/Patient_Appointment/ViewPatientList';
import UpdatePassword from '../EditComponents/Password/UpdatePassword';

const DoctorDashboard = ({ handleLogout }) => {
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [displayedComponent, setDisplayedComponent] = useState(null);
  const [optionsVisible, setOptionsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      };
      const dateTimeString = date.toLocaleString([], options);
      setCurrentDateTime(dateTimeString);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleOptionClick = (optionName) => {
    // Handle the click event for each option
    if (optionName === 'appointments') {
      setDisplayedComponent('appointments');
      setOptionsVisible(false);
    } else if (optionName === 'patients') {
      // Perform the necessary action for viewing patients
      setDisplayedComponent('patients');
      setOptionsVisible(false);
    } else if (optionName === 'password') {
      // Perform the necessary action for changing password
      setDisplayedComponent('password');
      setOptionsVisible(false);
    }
  };

  const handleBack = () => {
    setDisplayedComponent(null);
    setOptionsVisible(true);
  };

  const ViewAppointmentsButton = () => (
    <button className="option-button view-button" onClick={() => handleOptionClick('appointments')}>
      <FontAwesomeIcon icon={faEye} size="2x" />
      <span className="option-label">View Appointments</span>
    </button>
  );

  const ViewPatientListButton = () => (
    <button className="option-button" onClick={() => handleOptionClick('patients')}>
      <FontAwesomeIcon icon={faUsers} size="2x" />
      <span className="option-label">Patient List</span>
    </button>
  );

  const UpdatePasswordButton = () => (
    <button className="option-button update-button" onClick={() => handleOptionClick('password')}>
      <FontAwesomeIcon icon={faKey} size="2x" />
      <span className="option-label">Update Password</span>
    </button>
  );

  return (
    <div className="dashboard">
      <div className="top-bar">
        <div className="date-time">{currentDateTime}</div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <h2>Welcome, Doctor!</h2>
      <div className="options">
      {optionsVisible ? (
          <>
        <ViewAppointmentsButton />
        <ViewPatientListButton />
        <UpdatePasswordButton />
      </>
      ) : ( <button className="option-button receptionist" onClick={() => setOptionsVisible(true)}>
      <FontAwesomeIcon icon={faArrowCircleDown} size="2x" />
      <span className="option-label">Show Options</span>
    </button>
      )}
      </div>
      {displayedComponent === 'appointments' && <ViewAppointments handleBack={handleBack} />}
      {displayedComponent === 'patients' && <ViewPatientList handleBack={handleBack} />}
      {displayedComponent === 'password' && <UpdatePassword handleBack={handleBack} />}
    </div>
  );
};

export default DoctorDashboard;
