import React from 'react';

const Navigation = ({ activeButton, handleButtonClick }) => {
  return (
    <nav>
      <ul>
        <li>
          <a
            href="#"
            className={activeButton === 'Home' ? 'active' : ''}
            onClick={() => handleButtonClick('Home')}
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#"
            className={activeButton === 'About' ? 'active' : ''}
            onClick={() => handleButtonClick('About')}
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#"
            className={activeButton === 'Contact' ? 'active' : ''}
            onClick={() => handleButtonClick('Contact')}
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
