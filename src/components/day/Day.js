import React, { useState, useEffect } from 'react';
import './day.css';
import Popup from '../popup/Popup';

const Day = ({ day, month, year, onSelect, disabled, onHeartClick }) => {
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
  }, [year, month, day]);

  const handleClick = () => {
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

    if (showPopup) {
      setLoveMessage(updatedHeartClicked ? 'Love is great' : '');
    }

    // Save heart click information to local storage for the current day only
    const localStorageKey = `heartClicked-${year}-${month}-${day}`;
    localStorage.setItem(localStorageKey, JSON.stringify(updatedHeartClicked));
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setIsHeartClicked(false);
    setLoveMessage('');
  };

  const classNames = `day ${disabled ? 'disabled' : ''} ${isToday ? 'today' : ''}`;

  return (
    <div className={classNames} onClick={handleClick}>
      <p>{day}</p>
      <button
        className={`heart-button ${isHeartClicked ? 'clicked' : ''}`}
        onClick={handleHeartClick}
      >
        {isHeartClicked ? '💘' : '🤍'}
      </button>

      {showPopup && (
        <Popup selectedDate={new Date(year, month, day)} onClose={handleClosePopup} loveMessage={loveMessage} />
      )}
    </div>
  );
};

export default Day;
