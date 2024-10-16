import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from '../Home/Homepage';
import MoreEvents from "../Events/MoreEvents";
import Event from '../Events/Event';
import MoreAudio from '../Portfolio/MoreAudio';

export default function EventRoute() {
  return (
    <div>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/more-events" element={<MoreEvents />} />
          <Route path="/events" element={<Event />} />
          <Route path="/more-audio" element={<MoreAudio />} />
        </Routes>
    </div>
  )
}
