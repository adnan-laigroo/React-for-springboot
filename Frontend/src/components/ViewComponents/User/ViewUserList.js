import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd, faUser } from '@fortawesome/free-solid-svg-icons';
import './CSS/ViewUser.css'; // Import the updated CSS file
import ViewDoctors from './ViewDoctors';
import ViewReceptionists from './ViewReceptionists';

const UserOptions = ({ handleOptionClick, handleBack }) => {
  return (
    <div>
      <button className="back-button-left" onClick={handleBack}>
        <span className="back-button-text">Back</span>
      </button>
      <div className="view-user-options"> {/* Updated CSS class name */}
        <button
          className="view-user-button"
          onClick={() => handleOptionClick('doctor')}
        >
          <FontAwesomeIcon icon={faUserMd} className="view-user-icon" /> {/* Updated CSS class name */}
          <span className="view-user-label">View Doctor List</span> {/* Updated CSS class name */}
        </button>
        <button
          className="view-user-button"
          onClick={() => handleOptionClick('receptionist')}
        >
          <FontAwesomeIcon icon={faUser} className="view-user-icon" /> {/* Updated CSS class name */}
          <span className="view-user-label">View Receptionist List</span> {/* Updated CSS class name */}
        </button>
      </div>
    </div>
  );
};

const ViewUserList = ({ handleBack }) => {
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
    <div className="view-user-container"> {/* Updated CSS class name */}
      {optionsVisible ? (
        <UserOptions handleOptionClick={handleOptionClick} handleBack={handleBack} />
      ) : (
        <div className="view-user-content"> {/* Updated CSS class name */}
          <button className="back-button-left" onClick={handleToggleOptions}>
            <span className="back-button-text">Back</span>
          </button>
          {selectedOption === 'doctor' ? (
            <ViewDoctors handleBack={handleBack} />
          ) : (
            <ViewReceptionists handleBack={handleBack} />
          )}
        </div>
      )}
    </div>
  );
};

export default ViewUserList;
