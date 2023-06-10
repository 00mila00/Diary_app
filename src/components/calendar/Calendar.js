import React from 'react';
import Day from '../day/Day';
import './calendar.css';

const Calendar = ({ currentDate, onSelect }) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Add week day labels
  for (let i = 0; i < 7; i++) {
    const weekday = window.innerWidth < 768 ? weekDays[i].slice(0, 3) : weekDays[i];
    days.push(
      <div key={`weekday-${i}`} className="weekday">
        {weekday}
      </div>
    );
  }

  // Add days from previous month
  for (let i = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; i > 0; i--) {
    const prevMonthDay = daysInPrevMonth - i + 1;
    days.push(
      <Day
        key={`prev-${prevMonthDay}`}
        day={prevMonthDay}
        month={month - 1}
        year={year}
        disabled
      />
    );
  }

  // Add days from current month
  for (let currDay = 1; currDay <= daysInMonth; currDay++) {
    const isCurrentDay = currDay === day;
    const isSunday = (firstDayOfMonth + currDay - 1) % 7 === 0; // Check if it's a Sunday
    const dayClassName = isSunday ? 'day sunday' : 'day';

    days.push(
      <Day
        key={currDay}
        day={currDay}
        month={month}
        year={year}
        isCurrentDay={isCurrentDay}
        onSelect={onSelect}
        className={dayClassName} // Add the dayClassName as a prop to the Day component
      />
    );
  }

  // Add days from next month
  const totalDays = days.length - 7;
  const numRows = Math.ceil(totalDays / 7);
  const remainingCells = 7 * numRows - totalDays;
  const nextMonthStartDay = daysInMonth + 1;

  for (let i = nextMonthStartDay; i <= nextMonthStartDay + remainingCells - 1; i++) {
    const nextMonthDay = i - nextMonthStartDay + 1;
    days.push(
      <Day
        key={`next-${nextMonthDay}`}
        day={nextMonthDay}
        month={month + 1}
        year={year}
        disabled
        onSelect={onSelect}
      />
    );
  }

  // Add empty cells if necessary to maintain 7-day rows
  const remainingWeekCells = 7 - (totalDays % 7);
  for (let i = 0; i < remainingWeekCells; i++) {
    days.push(<div key={`empty-${i}`} className="empty-day" />);
  }

  return (
    <div className="calendar">
      {days}
    </div>
  );
};

export default Calendar;
