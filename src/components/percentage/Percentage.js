import React, { useState } from 'react';
import './percentage.css';

const Percentage = () => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [percentage, setPercentage] = useState(0);

  const generateRandomPercentage = () => {
    setPercentage(0); // Reset the percentage to 0

    const randomPercentage = Math.floor(Math.random() * 101);
    let progress = 0;

    const incrementProgress = () => {
      if (progress < randomPercentage) {
        progress += 1; // Increment the progress by 1
        setPercentage(progress);
        incrementProgress();
      }
    };

    incrementProgress();
  };

  const isInputEmpty = name1.trim() === '' || name2.trim() === '';

  return (
    <div className="percentage-container">
      <h2><span>💘</span> Check your compatibility <span>💘</span></h2>
      <div className="progress-bar-container">
        <div className="progress-bar">
          <div className="progress" style={{ width: `${percentage}%` }} />
        </div>
        {percentage > 0 && <span className="percentage-label">{`${percentage}%`}</span>}
      </div>
      <div className="input-container">
        <div className="input-label">
          {/* <label htmlFor="name1">Name 1</label> */}
          <input
            type="text"
            id="name1"
            placeholder="Enter name 1"
            value={name1}
            onChange={(e) => setName1(e.target.value)}
          />
        </div>
        <div className="input-label">
          {/* <label htmlFor="name2">Name 2</label> */}
          <input
            type="text"
            id="name2"
            placeholder="Enter name 2"
            value={name2}
            onChange={(e) => setName2(e.target.value)}
          />
        </div>
      </div>
      <div className="button-container">
        <button onClick={generateRandomPercentage} disabled={isInputEmpty}>
          Check compatibility
        </button>
      </div>
      
    </div>
  );
};

export default Percentage;
