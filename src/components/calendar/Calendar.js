import React from 'react';
import Day from '../day/Day';
import './calendar.css';

const Calendar = ({ currentDate }) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']; // Week day labels

  // Add week day labels
  for (let i = 0; i < 7; i++) {
    days.push(
      <div key={`weekday-${i}`} className="weekday">
        {weekDays[i]}
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
    days.push(
      <Day
        key={currDay}
        day={currDay}
        month={month}
        year={year}
        isCurrentDay={isCurrentDay}
      />
    );
  }

  // Add days from next month
  const totalDays = days.length - 7; // Subtract 7 for the week day labels
  const numRows = Math.ceil(totalDays / 7);
  const remainingCells = numRows === 6 ? 42 - totalDays : 35 - totalDays; // Total cells in a 6-row or 5-row calendar
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
      />
    );
  }

  return (
    <div className="calendar">
      {days}
    </div>
  );
};

export default Calendar;
