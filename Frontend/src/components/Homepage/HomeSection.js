import React from 'react';

const HomeSection = ({ handleButtonClick }) => {
  return (
    <section>
      <h2>Welcome to the Hospital Management System.</h2>
      <div id="session">
        <button onClick={() => handleButtonClick('UserLogin')}>User Login</button>
        <button onClick={() => handleButtonClick('AdminLogin')}>Admin Login</button>
      </div>
    </section>
  );
};

export default HomeSection;
