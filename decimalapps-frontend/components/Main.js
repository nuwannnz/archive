import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
import Image from 'next/image';
import Hero from './Hero';
import Features from './Features';
import Brands from './Brands';
import About from './About';
import Contact from './Contact';

export default function Main() {
  return (
    <>
    <Hero/>
    <Features/>
    <Brands/>
    <About/>  
    <Contact/>
    </>
  );
}
