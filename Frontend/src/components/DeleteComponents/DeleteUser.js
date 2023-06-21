import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd, faUser } from '@fortawesome/free-solid-svg-icons';
import './DeleteUserOptions.css';
import DeleteDoctor from './DeleteDoctor';
import DeleteReceptionist from './DeleteReceptionist';

const UserOptions = ({ handleOptionClick, handleBack}) => {
  return (
    <div>
     <button className="back-button-left" onClick={handleBack}>
        <span className="back-button-text">Back</span>
      </button>
      <div className="delete-user-options">
        <button
          className="delete-user-button"
          onClick={() => handleOptionClick('doctor')}
        >
          <FontAwesomeIcon icon={faUserMd} className="delete-user-icon" />
          <span className="delete-user-label">Delete Doctor</span>
        </button>
        <button
          className="delete-user-button"
          onClick={() => handleOptionClick('receptionist')}
        >
          <FontAwesomeIcon icon={faUser} className="delete-user-icon" />
          <span className="delete-user-label">Delete Receptionist</span>
        </button>
      </div>
    </div>
  );
};

const DeleteUser = ({ encodedCredentials , handleBack }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [optionsVisible, setOptionsVisible] = useState(true);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setOptionsVisible(false);
  };

  const handleToggleOptions = () => {
    setSelectedOption('');
    setOptionsVisible(true);
  };

  return (
    <div className="delete-user-container">
      {optionsVisible ? (
        <UserOptions handleOptionClick={handleOptionClick} handleBack={handleBack} />
      ) : (
        <div className="delete-user-content">
          <button className="back-button-left" onClick={handleToggleOptions}>
            <span className="back-button-text">Back</span>
          </button>
          {selectedOption === 'doctor' ? (
            <DeleteDoctor handleBack={handleBack} encodedCredentials={encodedCredentials}/>
          ) : (
            <DeleteReceptionist handleBack={handleBack} encodedCredentials={encodedCredentials} />
          )}
        </div>
      )}
    </div>
  );
};

export default DeleteUser;
