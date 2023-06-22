import React from 'react';
import Homepage from './components/Homepage/Homepage';
import logo from './Capture.JPG';
import './footer.css'; // Import the CSS file

const App = () => {
  return (
    <div className="App">
      <Homepage />
      <footer className="footer">
        <img src={logo} alt="Logo" className="logo" />
        <span>React app made by Adnan Laigroo</span>
      </footer>
    </div>
  );
};

export default App;
