import React from 'react';
import Calendar from "../components/calendar/DateTimePick";
import './event.css';

function Events() {
  return (
    <div id='event'>
      <span className='event-heading'>Find Your Perfect time</span><br /><br />
        <div className='square-background'>
          <div className='calendar-container'>
            <Calendar />
          </div>
          </div>
    </div>
  )
}

export default Events
