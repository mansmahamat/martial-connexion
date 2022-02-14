import React from 'react';
import GoogleCalendar from '../../components/googleCalendar/GoogleCalendar';
import './index.css';

function Calendar() {
  return (
    <div className=" h-32">
      <GoogleCalendar />
    </div>
  );
}

export default Calendar;
