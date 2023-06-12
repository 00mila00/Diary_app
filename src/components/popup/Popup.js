import React, { useState, useEffect } from 'react';
import './popup.css';

const Popup = ({ selectedDate, onClose, initialLoveMessage, onUpdateLoveMessage }) => {
  const [loveMessage, setLoveMessage] = useState(initialLoveMessage || '');
  const [isEditing, setIsEditing] = useState(false);
  const [sunrise, setSunrise] = useState('');
  const [sunset, setSunset] = useState('');

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

  useEffect(() => {
    // Fetch sunrise and sunset data for the selected date and location
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1; // Months are zero-based in JavaScript Date object
    const day = selectedDate.getDate();

    // Get user's location or set a default location (Poland)
    const defaultLocation = {
      latitude: 52.2297,
      longitude: 21.0122
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchSunriseSunsetData(latitude, longitude);
      },
      () => {
        fetchSunriseSunsetData(defaultLocation.latitude, defaultLocation.longitude);
      }
    );

    const fetchSunriseSunsetData = (latitude, longitude) => {
      const apiUrl = `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&date=${year}-${month}-${day}`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const sunriseTime = data.results.sunrise;
          const sunsetTime = data.results.sunset;
          setSunrise(sunriseTime);
          setSunset(sunsetTime);
        })
        .catch((error) => {
          console.log('Error fetching sunrise and sunset data:', error);
        });
    };
  }, [selectedDate]);

  const isMessageEmpty = loveMessage.trim() === '';

  return (
    <div className="popup">
      <div className="popup-content">
        <h2 className="selectedDate" style={{fontSize: '1.5rem'}}>Daily Diary</h2>
        <p className="selectedDate">{formattedDate}</p>
        <p className="sunrise">Sunrise: {sunrise}</p>
        <p className="sunset">Sunset: {sunset}</p>
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
