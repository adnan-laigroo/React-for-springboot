import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd, faUser } from '@fortawesome/free-solid-svg-icons';
import './EditUser.css';
import UpdateDoctor from './UpdateDoctor';
import UpdateReceptionist from './UpdateReceptionist';

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
          <span className="edit-user-label">Edit Doctor</span>
        </button>
        <button
          className="edit-user-button"
          onClick={() => handleOptionClick('receptionist')}
        >
          <FontAwesomeIcon icon={faUser} className="edit-user-icon" />
          <span className="edit-user-label">Edit Receptionist</span>
        </button>
      </div>
    </div>
  );
};

const EditUser = ({ handleBack }) => {
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
            <UpdateDoctor handleBack={handleBack} />
          ) : (
            <UpdateReceptionist handleBack={handleBack} />
          )}
        </div>
      )}
    </div>
  );
};

export default EditUser;
