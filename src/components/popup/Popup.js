import React, { useState, useEffect } from 'react';
import './popup.css';

const Popup = ({ selectedDate, onClose, initialLoveMessage, onUpdateLoveMessage }) => {
  const [loveMessage, setLoveMessage] = useState(initialLoveMessage || '');
  const [isEditing, setIsEditing] = useState(false);

  const formattedDate = selectedDate?.toLocaleDateString();

  const handleClose = () => {
    onClose();
  };

  const handleLoveMessageChange = (e) => {
    setLoveMessage(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    onUpdateLoveMessage(loveMessage);
  };

  useEffect(() => {
    setLoveMessage(initialLoveMessage || '');
  }, [initialLoveMessage]);

  useEffect(() => {
    const messageLocalStorageKey = `loveMessage-${selectedDate.getFullYear()}-${selectedDate.getMonth()}-${selectedDate.getDate()}`;
    localStorage.setItem(messageLocalStorageKey, loveMessage);
  }, [loveMessage, selectedDate]);

  const isMessageEmpty = loveMessage.trim() === '';

  return (
    <div className="popup">
      <div className="popup-content">
        <h2 className="selectedDate">Daily Diary</h2>
        <p className="selectedDate">Selected Date:</p>
        <p className="datePopup">{formattedDate}</p>
        {isEditing ? (
          <form onSubmit={handleFormSubmit}>
            <textarea
              className="love-message"
              placeholder="Enter love message..."
              value={loveMessage}
              onChange={handleLoveMessageChange}
            />
            <button type="submit">{isMessageEmpty ? 'Add Message' : 'Save'}</button>
          </form>
        ) : (
          <div>
            <p className="message">{loveMessage}</p>
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              {isMessageEmpty ? 'Add Message' : 'Edit Message'}
            </button>
          </div>
        )}
        <button className="close-btn" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
