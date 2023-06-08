import React, { useState } from 'react';
import Calendar from './components/calendar/Calendar';
import Percentage from './components/percentage/Percentage';

const App = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);

  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(nextMonth);
  };

  const handlePreviousMonth = () => {
    const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    setCurrentDate(previousMonth);
  };

  return (
    <div className="app">
      <p style={{fontSize: '10rem', position: 'absolute', color: '#fff', top: '120px', left: '100px'}}>☁</p>
      <p style={{fontSize: '11rem', position: 'absolute', color: '#fff', top: '-80px', left: '1500px'}}>☁</p>
      <p style={{fontSize: '10.5rem', position: 'absolute', color: '#fff', top: '500px', left: '1700px'}}>☁</p>
      <h1>Heart calendar</h1>
      <div className="menu">
      <div className="header">
        <button onClick={handlePreviousMonth}>&lt;</button>
        <h2>{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <Calendar currentDate={currentDate} />
      
    </div>
    {/* <p style={{fontSize: '10.5rem', position: 'absolute', color: 'rgba(255,255,255,0.8)', top: '800px', left: '1000px'}}>☁</p> */}
    <div className='menu2'>
    <Percentage></Percentage>
    </div>
    </div>
  );
};

export default App;
