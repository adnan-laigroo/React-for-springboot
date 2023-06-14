import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd, faUser } from '@fortawesome/free-solid-svg-icons';
import './DeleteUserOptions.css';
import DeleteDoctor from './DeleteDoctor';
import DeleteReceptionist from './DeleteReceptionist';

const UserOptions = ({ handleOptionClick, handleBack }) => {
  return (
    <div>
      <button className="back-button-left" onClick={handleBack}>
        <span className="back-button-text">Back</span>
      </button>
      <div className="edit-user-options">
        <button
          className="edit-user-button"
          onClick={() => handleOptionClick('doctor')}
        >
          <FontAwesomeIcon icon={faUserMd} className="edit-user-icon" />
          <span className="edit-user-label">Delete Doctor</span>
        </button>
        <button
          className="edit-user-button"
          onClick={() => handleOptionClick('receptionist')}
        >
          <FontAwesomeIcon icon={faUser} className="edit-user-icon" />
          <span className="edit-user-label">Delete Receptionist</span>
        </button>
      </div>
    </div>
  );
};

const DeleteUser = ({ handleBack }) => {
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
    <div className="edit-user-container">
      {optionsVisible ? (
        <UserOptions handleOptionClick={handleOptionClick} handleBack={handleBack} />
      ) : (
        <div className="edit-user-content">
          <button className="back-button-left" onClick={handleToggleOptions}>
            <span className="back-button-text">Back</span>
          </button>
          {selectedOption === 'doctor' ? (
            <DeleteDoctor handleBack={handleBack} />
          ) : (
            <DeleteReceptionist handleBack={handleBack} />
          )}
        </div>
      )}
    </div>
  );
};

export default DeleteUser;
