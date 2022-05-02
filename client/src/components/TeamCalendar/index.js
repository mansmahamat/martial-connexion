/* eslint-disable react/prop-types */
import React from 'react';
import WeekView from '../googleCalendar/weekView';

function TeamCalendar({ events }) {
  return (
    <div className=" min-w-full">
      <WeekView showModal={false} events={events} />
    </div>
  );
}

export default TeamCalendar;
