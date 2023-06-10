import React, { useState, useEffect } from 'react';
import './day.css';
import Popup from '../popup/Popup';

const Day = ({ day, month, year, onSelect, disabled, onHeartClick, initialLoveMessage }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [loveMessage, setLoveMessage] = useState('');

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Set the time part to 00:00:00

  const isToday = currentDate.getTime() === new Date(year, month, day).getTime();

  useEffect(() => {
    // Load heart click information from local storage
    const localStorageKey = `heartClicked-${year}-${month}-${day}`;
    const heartClicked = JSON.parse(localStorage.getItem(localStorageKey)) || false;
    setIsHeartClicked(heartClicked);

    // Load love message from local storage for the current day
    const messageLocalStorageKey = `loveMessage-${year}-${month}-${day}`;
    const storedLoveMessage = localStorage.getItem(messageLocalStorageKey);
    setLoveMessage(storedLoveMessage || initialLoveMessage || '');
  }, [year, month, day, initialLoveMessage]);

  const handleClick = () => {
    if (showPopup) {
      return; // Return early if the popup is already open
    }

    if (onSelect && !disabled) {
      onSelect(new Date(year, month, day));
      setShowPopup(true);
    }
  };

  const handleHeartClick = () => {
    const updatedHeartClicked = !isHeartClicked;

    if (onHeartClick) {
      onHeartClick(new Date(year, month, day), updatedHeartClicked);
    }

    setIsHeartClicked(updatedHeartClicked);

    // Save heart click information to local storage for the current day only
    const localStorageKey = `heartClicked-${year}-${month}-${day}`;
    localStorage.setItem(localStorageKey, JSON.stringify(updatedHeartClicked));
  };

  const handleClosePopup = () => {
    setShowPopup(false);

    // Clear the love message from local storage for the current day only if it is empty
    const messageLocalStorageKey = `loveMessage-${year}-${month}-${day}`;
    if (!loveMessage) {
      localStorage.removeItem(messageLocalStorageKey);
    }
  };

  const handleUpdateLoveMessage = (message) => {
    setLoveMessage(message);

    // Save love message to local storage for the current day
    const messageLocalStorageKey = `loveMessage-${year}-${month}-${day}`;
    localStorage.setItem(messageLocalStorageKey, message);
  };

  const dayClassNames = `day ${disabled ? 'disabled' : ''} ${isToday ? 'today' : ''} ${
    loveMessage ? 'has-message' : ''
  } ${new Date(year, month, day).getDay() === 0 ? 'sunday' : ''}`;

  return (
    <div className={dayClassNames} onClick={handleClick}>
      <p>{day}</p>
      <button className={`heart-button ${isHeartClicked ? 'clicked' : ''}`} onClick={handleHeartClick}>
        {isHeartClicked ? '💘' : '🤍'}
      </button>

      {showPopup && (
        <Popup
          selectedDate={new Date(year, month, day)}
          onClose={handleClosePopup}
          initialLoveMessage={loveMessage} // Pass the initial love message as a prop
          onUpdateLoveMessage={handleUpdateLoveMessage}
        />
      )}
    </div>
  );
};

export default Day;
