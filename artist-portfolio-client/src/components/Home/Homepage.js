import React from 'react';
import Intro from '../intro/intro';
import About from '../About/About';
import Event from '../Events/Event';
import Music from '../Portfolio/portfolio';
import Contact from '../contact/contact';

function Homepage() {
  return (
    <div>
      <Intro />
      <Event />
      <Music />
      <About />
      <Contact />
    </div>
  )
}

export default Homepage
