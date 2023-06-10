import React, { useState, useEffect } from 'react';
import Calendar from './components/calendar/Calendar';
import Percentage from './components/percentage/Percentage';
import Footer from './components/footer/Footer';

const App = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(nextMonth);
  };

  const handlePreviousMonth = () => {
    const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    setCurrentDate(previousMonth);
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isFullView = windowWidth > 1024 && windowHeight > 768;

  return (
    <div className="app">
      {isFullView && (
        <div className="clouds">
          <p style={{ fontSize: '10rem', position: 'absolute', color: '#fff', top: '120px', left: '100px', zIndex: '0', opacity: '0.7' }}>☁</p>
          <p style={{ fontSize: '11rem', position: 'absolute', color: '#fff', top: '-80px', left: '1500px' }}>☁</p>
          <p style={{ fontSize: '10.5rem', position: 'absolute', color: '#fff', top: '500px', left: '1700px' }}>☁</p>
        </div>
      )}
      <h1>Heart calendar</h1>
      <div className="menu">
        <div className="header">
          <button onClick={handlePreviousMonth}>&lt;</button>
          <h2>{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h2>
          <button onClick={handleNextMonth}>&gt;</button>
        </div>
        <Calendar currentDate={currentDate} />
      </div>
      <div className='menu2'>
        <Percentage></Percentage>
      </div>
      <Footer />
    </div>
  );
};

export default App;
