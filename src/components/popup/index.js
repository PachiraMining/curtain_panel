import React from 'react';
import './YourStyles.css'; // Replace with the path to your CSS file

const Popup = ({ isVisible, onClose }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        {/* Your pop-up content goes here */}
        <p>This is a pop-up!</p>
      </div>
    </div>
  );
};

export default Popup;