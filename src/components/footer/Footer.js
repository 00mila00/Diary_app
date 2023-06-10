import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const handleEmailClick = () => {
    window.location.href = 'mailto:milunia2000xd@gmail.com';
  };

  return (
    <div
      className="footer"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90px',
      }}
    >
      <p style={{ color: '#ff3b7d', fontFamily: 'serif', marginRight: '4px' }}>
        by Milena Pawlak
      </p>
      <button
        onClick={handleEmailClick}
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: '#ff3b7d',
          fontSize: '1.2rem',
        }}
      >
        <FontAwesomeIcon
          icon={faEnvelope}
          style={{ transition: 'color 0.3s' }}
          className="icon"
        />
      </button>
    </div>
  );
};

export default Footer;
