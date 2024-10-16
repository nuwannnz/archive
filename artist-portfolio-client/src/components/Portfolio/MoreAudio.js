import React, {useEffect, useState} from "react";
import Menu from "./Menu";
import AudioCircle from "./AudioCircle";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import "./MoreAudio.css";
import FirstPageIcon from '@mui/icons-material/FirstPage';

function MoreAudio() {

  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Scroll to the top of the page when the component is loaded
    window.scrollTo(0, 0);
  }, []);

  return (
    <section id="more-audio">
      
      <div className="back-btn">
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

      <span className="musicTitle-more">Music</span>
      <Menu active={selectedCategory} setActive={setSelectedCategory} setCategory={setSelectedCategory} />
      <br />
      <div className="audio-circle-container">
        <AudioCircle category={selectedCategory} />
      </div>

    </section>
  );
}

export default MoreAudio;
