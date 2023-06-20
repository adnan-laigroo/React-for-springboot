import React from 'react';
import './navigation.css'; // Import the CSS file

const Navigation = ({ activeButton, handleButtonClick }) => {
  return (
    <nav>
      <ul className="nav_list">
        <li>
          <button
            type="button"
            className={`nav_button ${activeButton === 'Home' ? 'active' : ''}`}
            onClick={() => handleButtonClick('Home')}
          >
            Home
          </button>
        </li>
        <li>
          <button
            type="button"
            className={`nav_button ${activeButton === 'About' ? 'active' : ''}`}
            onClick={() => handleButtonClick('About')}
          >
            About
          </button>
        </li>
        <li>
          <button
            type="button"
            className={`nav_button ${activeButton === 'Contact' ? 'active' : ''}`}
            onClick={() => handleButtonClick('Contact')}
          >
            Contact
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
