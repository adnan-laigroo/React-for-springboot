import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faEdit, faList, faCalendarPlus, faKey, faEye, faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';
import ViewAppointments from '../ViewComponents/Patient_Appointment/ViewAppointments';
import ViewPatientList from '../ViewComponents/Patient_Appointment/ViewPatientList';
import UpdatePassword from '../EditComponents/Password/UpdatePassword';
import BookAppointmentForm from '../Add_Registration_Forms/Appointmennt/BookAppointmentForm';
import UpdateAppointmentForm from '../EditComponents/Appointment/UpdateAppointmentForm';
import AddPatientForm from '../Add_Registration_Forms/Patient/AddPatientForm';
import UpdatePatientForm from '../EditComponents/Patient/UpdatePatientForm';

const ReceptionistDashboard = ({ handleLogout }) => {
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [displayedComponent, setDisplayedComponent] = useState(null);
  const [optionsVisible, setOptionsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      const dateTimeString = date.toLocaleString([], options);
      setCurrentDateTime(dateTimeString);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleOptionClick = (optionName) => {
    // Handle the click event for each option
    if (optionName === 'addPatient') {
      // Perform the necessary action for adding a new patient
      setDisplayedComponent('addPatient');
      setOptionsVisible(false);
    } else if (optionName === 'updatePatient') {
      // Perform the necessary action for updating a patient
      setDisplayedComponent('updatePatient');
      setOptionsVisible(false);
    } else if (optionName === 'patientList') {
      // Perform the necessary action for getting the patient list
      setDisplayedComponent('patients');
      setOptionsVisible(false);
    } else if (optionName === 'addAppointment') {
      // Perform the necessary action for adding a new appointment
      setDisplayedComponent('book-appointment');
      setOptionsVisible(false);
    } else if (optionName === 'updateAppointment') {
      // Perform the necessary action for updating an appointment
      setDisplayedComponent('update-appointment');
      setOptionsVisible(false);
    } else if (optionName === 'viewAppointments') {
      // Perform the necessary action for viewing appointments
      setDisplayedComponent('appointments');
      setOptionsVisible(false);
    } else if (optionName === 'updatePassword') {
      // Perform the necessary action for updating the receptionist's password
      setDisplayedComponent('password');
      setOptionsVisible(false);
    }
  };

  const handleBack = () => {
    setDisplayedComponent(null);
    setOptionsVisible(true);
  };

  return (
    <div className="dashboard">
      <div className="top-bar">
        <div className="date-time">{currentDateTime}</div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <h2>Welcome, Receptionist!</h2>
      <div className="options">
        {optionsVisible ? (
          <>
            <button className="option-button receptionist" onClick={() => handleOptionClick('addPatient')}>
              <FontAwesomeIcon icon={faUserPlus} size="2x" />
              <span className="option-label">Add Patient</span>
            </button>
            <button className="option-button receptionist" onClick={() => handleOptionClick('updatePatient')}>
              <FontAwesomeIcon icon={faEdit} size="2x" />
              <span className="option-label">Update Patient</span>
            </button>
            <button className="option-button receptionist" onClick={() => handleOptionClick('patientList')}>
              <FontAwesomeIcon icon={faList} size="2x" />
              <span className="option-label">Patient List</span>
            </button>
            <button className="option-button receptionist" onClick={() => handleOptionClick('addAppointment')}>
              <FontAwesomeIcon icon={faCalendarPlus} size="2x" />
              <span className="option-label">Add Appointment</span>
            </button>
            <button className="option-button receptionist" onClick={() => handleOptionClick('updateAppointment')}>
              <FontAwesomeIcon icon={faEdit} size="2x" />
              <span className="option-label">Update Appointment</span>
            </button>
            <button className="option-button receptionist" onClick={() => handleOptionClick('viewAppointments')}>
              <FontAwesomeIcon icon={faEye} size="2x" />
              <span className="option-label">View Appointments</span>
            </button>
            <button className="option-button receptionist" onClick={() => handleOptionClick('updatePassword')}>
              <FontAwesomeIcon icon={faKey} size="2x" />
              <span className="option-label">Update Password</span>
            </button>
          </>
        ) : (
          <button className="option-button receptionist" onClick={() => setOptionsVisible(true)}>
            <FontAwesomeIcon icon={faArrowCircleDown} size="2x" />
            <span className="option-label">Show Options</span>
          </button>
        )}
      </div>
      {displayedComponent === 'book-appointment' && <BookAppointmentForm handleBack={handleBack} />}
      {displayedComponent === 'appointments' && <ViewAppointments handleBack={handleBack} />}
      {displayedComponent === 'update-appointment' && <UpdateAppointmentForm handleBack={handleBack} />}
      {displayedComponent === 'patients' && <ViewPatientList handleBack={handleBack} />}
      {displayedComponent === 'password' && <UpdatePassword handleBack={handleBack} />}
      {displayedComponent === 'addPatient' && <AddPatientForm handleBack={handleBack} />}
      {displayedComponent === 'updatePatient' && <UpdatePatientForm handleBack={handleBack} />}
    </div>
  );
};

export default ReceptionistDashboard;
