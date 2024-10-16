import React, { useState } from 'react';
import './navbar.css';
import logo from '../../assets/img/logo-d.svg';
import { Link } from 'react-scroll';
import { useEventContext } from '../Events/EventContext';
import '../../css/color_palette.css';


const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { eventsFound } = useEventContext();

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${isMenuOpen ? 'open' : ''}`}>
      <div className='nav-content'>
        <div className='logo-container'>
          <img src={logo} alt='logo' className='logo'></img>
        </div>
        <div className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <div className='bar'></div>
          <div className='bar'></div>
          <div className='bar'></div>
        </div>
        <div className={`desktopMenu ${isMenuOpen ? 'open' : ''}`}>
          <Link activeClass='active' to='intro' spy={true} smooth={true} offset={-70} duration={500} className='desktopMenuListItem'>Home</Link>
          {eventsFound ? (
            <Link activeClass='active' to='event' spy={true} smooth={true} offset={-50} duration={500} className='desktopMenuListItem'>Events</Link>
          ) : (
            null
          )}
          <Link activeClass='active' to='music'  spy={true} smooth={true} offset={-70} duration={500} className='desktopMenuListItem'>Music</Link>
          <Link activeClass='active' to='about' spy={true} smooth={true} offset={-70} duration={500} className='desktopMenuListItem'>About</Link>
          <Link activeClass='active' to='contact' spy={true} smooth={true} offset={-40} duration={500} className='desktopMenuListItem'>Contact</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
