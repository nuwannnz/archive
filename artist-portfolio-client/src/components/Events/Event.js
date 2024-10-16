import React, { useEffect, useState , useCallback } from "react";
import TourBg from "../../assets/img/event-bg.svg";
import Button from '@mui/material/Button';
import "./Event.css";
import TimelineEvent from './TimelineEvent';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Link } from "react-router-dom";
import EventCircle from "./EventCircle";
import Axios from "axios";
import { useEventContext } from "./EventContext";

const Event = () => {

  const [ eventCount , seteventsCount] = useState(0);
  const [displayedEvents, setDisplayedEvents] = useState(2);
  const [eventData , setEventData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { eventsFound, setEventsFound } = useEventContext();

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = useCallback(async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/events/public/by-domain/${process.env.REACT_APP_DOMAIN_ID}`
      );

      if (response.status === 200) {
        if (response.data.eventsFound === false) {
          setEventsFound(false);
          console.log(eventsFound);
        } else {
          setEventData(response.data.events);
        }
      }else {
        console.error("Unexpected response status:", response.status);
      }

    } catch (error) {
      console.error(error);
      handleErrorResponse(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleErrorResponse = (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // logout();
        console.log(error.response);
      }
    }
  };

  return (
     <>
    {eventsFound ? (
      <section id="event">
        <div className="event-bg">
          <img className="bg-img" src={TourBg} alt="" />
        </div>
        <div className="eventTitle">
          <span className="title-text">Upcoming Tours</span>
        </div>

        {/* Render the event section when events are found */}
          <div className="timeline-container">
            <EventCircle limit={displayedEvents} seteventsCount={seteventsCount} /> 
            {/* eventData={eventData} */}
          </div>
          
        {eventCount > 2 && displayedEvents < eventCount && (
          <div className="see-more">
            <Link to="/more-events">
              <Button
                className="btn-more"
                variant="outlined"
                style={{ borderColor: "#9AB7D3", color: "#d1c6c6" }}
                endIcon={<KeyboardDoubleArrowRightIcon />}
              >
                See More
              </Button>
            </Link>
          </div>
        )}
      </section>
    ) : (
      // Render nothing when events are not found
      null
    )}
  </>
  );
};

export default Event;
