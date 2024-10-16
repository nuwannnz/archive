import React, { useEffect, useState, useRef } from "react";
import TourBg from "../../assets/img/event-bg.svg";
import Button from "@mui/material/Button";
import "./Event.css";
import TimelineEvent from "./TimelineEvent";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { Link } from "react-router-dom";

const EventCircle = (props) => {

  const { limit , seteventsCount } = props;
  // const { limit , seteventsCount , eventData } = props;

  const eventData = [
    {
      month: "November",
      date: "21",
      year: "2023",
      center: "Videotron Center",
      venue: "Manhattan, NY, United States"
    },
    {
      month: "January",
      date: "11",
      year: "2024",
      center: "Spotify On Stage",
      venue: "Suncorp Stadium, Brisbane, Australia"
    },
    {
      month: "March",
      date: "05",
      year: "2024",
      center: "Halloween Land",
      venue: "Manhattan, NY, United States"
    },
    // Add more event data as needed
  ];

  useEffect(() => {
    if(eventData){
        seteventsCount(eventData.length)
    }
  },[eventData])

  return (
    <>
      {eventData.slice(0, limit).map((event, index) => (
        <TimelineEvent key={index} {...event} />
      ))}
    </>
  );
};

export default EventCircle;
