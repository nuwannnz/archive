import React, { useState } from "react";
import "./portfolio.css";
import { useTheme } from "@mui/material/styles";
import Menu from './Menu';
import AudioCircle from "./AudioCircle";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { BrowserView, MobileView, isMobile } from 'react-device-detect';

function Portfolio() {
  const theme = useTheme();

  const [eventCount, seteventsCount] = useState(0);
  const [displayedEvents, setDisplayedEvents] = useState(isMobile ? 2 : 5); 
  const [selectedCategory, setSelectedCategory] = useState('all');

  // const renderSeeMoreButton = () => (
  //   <div className="see-more">
  //     <Link to="/more-audio">
  //       <Button
  //         className="btn-more"
  //         variant="outlined"
  //         endIcon={<KeyboardDoubleArrowRightIcon />}
  //       >
  //         See More
  //       </Button>
  //     </Link>
  //   </div>
  // );

  return (
    <section id="music">
      <span className="musicTitle">Music</span>
      <Menu active={selectedCategory} setActive={setSelectedCategory} setCategory={setSelectedCategory} />
      <br />
      <AudioCircle category={selectedCategory} limit={displayedEvents} />

      {/* {(isMobile && displayedEvents > 3) || (!isMobile && displayedEvents > 10) && renderSeeMoreButton()} */}
      <div className="see-more-audio">
      <Link to="/more-audio" >
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
    </section>
  );
}

export default Portfolio;
