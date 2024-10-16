import React, { useState } from "react";
import TourBg from "../../assets/img/tour2.jpg";
import Button from '@mui/material/Button';
// import "./Event.css";
import "./MoreEvents.css";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import EventCircle from "./EventCircle";
import FirstPageIcon from '@mui/icons-material/FirstPage';
import { Link } from "react-router-dom";

const MoreEvents = () => {

  const [eventCount, seteventsCount] = useState(0);

  return (
    <section id="more-event">

      <div className="moreevent-bg">
        <img className="bg-img-more" src={TourBg} alt="" />
      </div>

      <div className="back-btn-event">
        <Link to="/">
          <Button
            className="btnBack"
            variant="filled"
            startIcon={<FirstPageIcon />}
          >
            Back
          </Button>
        </Link>
      </div>

      <div className="more-event-container">
        <div className="more-eventTitle">
          <span className="title-text">Upcoming Tours</span>
        </div>

        <div className="more-timeline-circle">
          <EventCircle limit={eventCount} seteventsCount={seteventsCount} />
        </div>
      </div>
    </section>
  );
}

export default MoreEvents
