import React from 'react';
import Button from "@mui/material/Button";

const TimelineEvent = ({ month, date, year, center, venue }) => {
  return (
    <div className="timeline">
      <div className="date-timeline">
        <ul>
          <li className="month">{month}</li>
          <li className="date">
            {date}<span className="circle"></span>
          </li>
          <li className="year">{year}</li>
        </ul>
      </div>
      <div className="event-ticket">
        <div className="event-details">
          <ul>
            <li className="center">{center}</li>
            <li className="center">
              <p className="venue">{venue}</p>
            </li>
          </ul>
        </div>
        <div className="ticket-btn">
        <Button variant="outlined" style={{ borderColor: "#9AB7D3", color: "#d1c6c6" }}>Ticket</Button>
        </div>
      </div>
    </div>
  );
};

export default TimelineEvent;
