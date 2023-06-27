import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faEdit, faList, faCalendarPlus, faKey, faEye, faArrowCircleDown, faPlusCircle,faDumpster,   faWrench } from '@fortawesome/free-solid-svg-icons';
import ViewAppointments from '../ViewComponents/Patient_Appointment/ViewAppointments';
import ViewPatientList from '../ViewComponents/Patient_Appointment/ViewPatientList';
import UpdatePassword from '../EditComponents/Password/UpdatePassword';
import BookAppointmentForm from '../Add_Registration_Forms/Appointmennt/BookAppointmentForm';
import UpdateAppointmentForm from '../EditComponents/Appointment/UpdateAppointmentForm';
import AddPatientForm from '../Add_Registration_Forms/Patient/AddPatientForm';
import UpdatePatientForm from '../EditComponents/Patient/UpdatePatientForm';
import RegistrationForm from '../Add_Registration_Forms/User/RegistrationForm';
import EditUser from '../EditComponents/User/EditUser';
import ViewUserList from '../ViewComponents/User/ViewUserList';
import DeleteUser from '../DeleteComponents/DeleteUser';
import DeletePatient from '../DeleteComponents/DeletePatient';
import DeleteAppointment from '../DeleteComponents/DeleteAppointment';
import AddPrescriptionForm from '../Add_Registration_Forms/Prescription/AddPrescriptionForm';
import UpdatePrescriptionForm from '../EditComponents/Prescription/UpdatePrescriptionForm';
import DeletePrescription from '../DeleteComponents/DeletePrescription';
import ViewPrescriptions from '../ViewComponents/Prescription/ViewPrescriptions';

const AdminDashboard = ({ handleLogout, encodedCredentials, username }) => {
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
    if (optionName === 'addUser') {
      // Perform the necessary action for adding a new User
      setDisplayedComponent('addUser');
      setOptionsVisible(false);
    } else if (optionName === 'editUser') {
      // Perform the necessary action for editing a user
      setDisplayedComponent('editUser');
      setOptionsVisible(false);
    } else if (optionName === 'deleteUser') {
      // Perform the necessary action for deleting a user
      setDisplayedComponent('deleteUser');
      setOptionsVisible(false);
    }   else if (optionName === 'userList') {
      // Perform the necessary action for getting the user list
      setDisplayedComponent('userList');
      setOptionsVisible(false);
    }else if (optionName === 'addPatient') {
      // Perform the necessary action for adding a new patient
      setDisplayedComponent('addPatient');
      setOptionsVisible(false);
    } else if (optionName === 'updatePatient') {
      // Perform the necessary action for updating a patient
      setDisplayedComponent('updatePatient');
      setOptionsVisible(false);
    } else if (optionName === 'deletePatient') {
      // Perform the necessary action for deleting a patient
      setDisplayedComponent('deletePatient');
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
    } else if (optionName === 'deleteAppointment') {
      // Perform the necessary action for deleting appointment
      setDisplayedComponent('deleteAppointment');
      setOptionsVisible(false);
    }  else if (optionName === 'addPrescription') {
        // Perform the necessary action for adding a new appointment
        setDisplayedComponent('addPrescription');
        setOptionsVisible(false);
      } else if (optionName === 'updatePrescription') {
        // Perform the necessary action for updating an appointment
        setDisplayedComponent('updatePrescription');
        setOptionsVisible(false);
      } else if (optionName === 'viewPrescriptionList') {
        // Perform the necessary action for viewing appointments
        setDisplayedComponent('viewPrescriptions');
        setOptionsVisible(false);
      }   
      else if (optionName === 'deletePrescription') {
        // Perform the necessary action for deleting appointment
        setDisplayedComponent('deletePrescription');
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
      <h2>Welcome, Admin!</h2>
      <div className="options">
        {optionsVisible ? (
          <>
          <button className="option-button admin" onClick={() => handleOptionClick('addUser')}>
              <FontAwesomeIcon icon={faPlusCircle} size="2x" />
              <span className="option-label">Add User</span>
            </button>
            <button className="option-button admin" onClick={() => handleOptionClick('editUser')}>
              <FontAwesomeIcon icon={faWrench} size="2x" />
              <span className="option-label">Edit User</span>
            </button>
            <button className="option-button admin" onClick={() => handleOptionClick('userList')}>
              <FontAwesomeIcon icon={faList} size="2x" />
              <span className="option-label">User List</span>
            </button>
            <button className="option-button admin" onClick={() => handleOptionClick('deleteUser')}>
              <FontAwesomeIcon icon={faDumpster} size="2x" />
              <span className="option-label">Delete User</span>
            </button>
            <button className="option-button admin" onClick={() => handleOptionClick('addPatient')}>
              <FontAwesomeIcon icon={faUserPlus} size="2x" />
              <span className="option-label">Add Patient</span>
            </button>
            <button className="option-button admin" onClick={() => handleOptionClick('updatePatient')}>
              <FontAwesomeIcon icon={faEdit} size="2x" />
              <span className="option-label">Edit Patient</span>
            </button>
            <button className="option-button admin" onClick={() => handleOptionClick('patientList')}>
              <FontAwesomeIcon icon={faList} size="2x" />
              <span className="option-label">Patient List</span>
            </button>
            <button className="option-button admin" onClick={() => handleOptionClick('deletePatient')}>
              <FontAwesomeIcon icon={faDumpster} size="2x" />
              <span className="option-label">Delete Patient</span>
            </button>
            <button className="option-button admin" onClick={() => handleOptionClick('addAppointment')}>
              <FontAwesomeIcon icon={faCalendarPlus} size="2x" />
              <span className="option-label">Add Appointment</span>
            </button>
            <button className="option-button admin" onClick={() => handleOptionClick('updateAppointment')}>
              <FontAwesomeIcon icon={faEdit} size="2x" />
              <span className="option-label">Edit Appointment</span>
            </button>
            <button className="option-button admin" onClick={() => handleOptionClick('viewAppointments')}>
              <FontAwesomeIcon icon={faEye} size="2x" />
              <span className="option-label">View Appointments</span>
            </button>
            <button className="option-button admin" onClick={() => handleOptionClick('deleteAppointment')}>
              <FontAwesomeIcon icon={faDumpster} size="2x" />
              <span className="option-label">Delete Appointment</span>
            </button>
            <button className="option-button admin" onClick={() => handleOptionClick('addPrescription')}>
              <FontAwesomeIcon icon={faCalendarPlus} size="2x" />
              <span className="option-label">Add Prescription</span>
            </button>
            <button className="option-button admin" onClick={() => handleOptionClick('updatePrescription')}>
              <FontAwesomeIcon icon={faEdit} size="2x" />
              <span className="option-label">Edit Prescription</span>
            </button>
            <button className="option-button admin" onClick={() => handleOptionClick('viewPrescriptionList')}>
              <FontAwesomeIcon icon={faEye} size="2x" />
              <span className="option-label">View Prescriptions</span>
            </button>
            <button className="option-button admin" onClick={() => handleOptionClick('deletePrescription')}>
              <FontAwesomeIcon icon={faDumpster} size="2x" />
              <span className="option-label">Delete Prescription</span>
            </button>
            <button className="option-button admin" onClick={() => handleOptionClick('updatePassword')}>
              <FontAwesomeIcon icon={faKey} size="2x" />
              <span className="option-label">Update Password</span>
            </button>
          </>
        ) : (
          <button className="option-button admin" onClick={() => setOptionsVisible(true)}>
            <FontAwesomeIcon icon={faArrowCircleDown} size="2x" />
            <span className="option-label">Show Options</span>
          </button>
        )}
      </div>
      {displayedComponent === 'addUser' && <RegistrationForm encodedCredentials={encodedCredentials} handleBack={handleBack}/>}
      {displayedComponent === 'userList' && <ViewUserList encodedCredentials={encodedCredentials} handleBack={handleBack} />}
      {displayedComponent === 'editUser' && <EditUser encodedCredentials={encodedCredentials} handleBack={handleBack} />}
      {displayedComponent === 'deleteUser' && <DeleteUser encodedCredentials={encodedCredentials} handleBack={handleBack} />}
      {displayedComponent === 'book-appointment' && <BookAppointmentForm encodedCredentials={encodedCredentials} handleBack={handleBack} />}
      {displayedComponent === 'appointments' && <ViewAppointments encodedCredentials={encodedCredentials} handleBack={handleBack}/>}
      {displayedComponent === 'update-appointment' && <UpdateAppointmentForm encodedCredentials={encodedCredentials} handleBack={handleBack}/>}
      {displayedComponent === 'deleteAppointment' && <DeleteAppointment encodedCredentials={encodedCredentials} handleBack={handleBack}/>}
      {displayedComponent === 'patients' && <ViewPatientList encodedCredentials={encodedCredentials} handleBack={handleBack}/>}
      {displayedComponent === 'password' && <UpdatePassword username={username} handleLogout={handleLogout} encodedCredentials={encodedCredentials} handleBack={handleBack}/>}
      {displayedComponent === 'addPatient' && <AddPatientForm encodedCredentials={encodedCredentials} handleBack={handleBack}/>}
      {displayedComponent === 'updatePatient' && <UpdatePatientForm encodedCredentials={encodedCredentials} handleBack={handleBack}/>}
      {displayedComponent === 'addPrescription' && <AddPrescriptionForm encodedCredentials={encodedCredentials} handleBack={handleBack}/>}
      {displayedComponent === 'updatePrescription' && <UpdatePrescriptionForm encodedCredentials={encodedCredentials} handleBack={handleBack}/>}
      {displayedComponent === 'viewPrescriptions' && <ViewPrescriptions encodedCredentials={encodedCredentials} handleBack={handleBack}/>}
      {displayedComponent === 'deletePrescription' && <DeletePrescription encodedCredentials={encodedCredentials} handleBack={handleBack}/>}
      {displayedComponent === 'deletePatient' && <DeletePatient encodedCredentials={encodedCredentials} handleBack={handleBack}/>}
    </div>
  );
};

export default AdminDashboard;
