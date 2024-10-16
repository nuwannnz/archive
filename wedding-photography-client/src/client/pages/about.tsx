import React from "react";
import AboutBg from "../assets/img/aboutbg.jpg";
import bg from "../assets/img/Desktop - 1.svg";
import "./about.css";
import "../../css/custom_style.css";
import { useDomain } from "../../hooks/useDomain";

function About() {
  const domain = useDomain();

  return (
    <div id="about">
      <div className="aboutContent">
        <img className="backgroundImage" src={bg} alt="About Image"></img>
        <div className="textContent">
          <div className="textsq"></div>
          <p className="textpara">{domain?.about_us}</p>
          {/* <button className='btnmore'>Read More</button> */}
        </div>
        <div className="titleContent">
          {/* <div className='square'></div> */}
          <span className="textHeading">{domain?.name}</span>
          <br />
          <br />
          <span className="textSubHeading">{domain?.tag_line}</span>
        </div>
      </div>
    </div>
  );
}

export default About;
