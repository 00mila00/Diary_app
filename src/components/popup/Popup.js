import React from 'react';
import './popup.css';

const Popup = ({ selectedDate, onClose, loveMessage }) => {
  const formattedDate = selectedDate.toLocaleDateString();

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Selected Date</h2>
        <p>{formattedDate}</p>
        {loveMessage && <p>{loveMessage}</p>}
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
