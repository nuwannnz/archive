import React, { useEffect, useState , useRef } from "react";

import V1 from "../../assets/img/v1.jpeg";
import LilyAudio from "../../assets/audio/Lily.mp3";
import V2 from "../../assets/img/v2.jpg";
import FadedAudio from "../../assets/audio/Faded.mp3";
import V3 from "../../assets/img/V3.jpeg";
import AloneAudio from "../../assets/audio/Alone.mp3";

import AudioCard from "./AudioCard";

const categoryData = {
  classic: [
    {
      image: V3,
      alt: "Live from space album cover",
      audioRef: "AloneAudio",
      title: "Alone",
    },
  ],
  trailer: [
    {
      image: V1,
      alt: "Live from space album cover",
      audioRef: "LilyAudio",
      title: "Lily",
    },

    {
      image: V3,
      alt: "Live from space album cover",
      audioRef: "AloneAudio",
      title: "Alone",
      
    },
    {
      image: V2,
      alt: "Live from space album cover",
      audioRef: "FadedAudio",
      title: "Faded",
    },
    
  ],
  newrelease: [
    {
      image: V2,
      alt: "Live from space album cover",
      audioRef: "FadedAudio",
      title: "Faded",
    },

    {
      image: V3,
      alt: "Live from space album cover",
      audioRef: "AloneAudio",
      title: "Alone",
    },
    
  ],
};


const AudioCircle = ({category, limit}) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [activeAudio, setActiveAudio] = useState(null);
  
    const audioRefs = {
      LilyAudio: useRef(new Audio(LilyAudio)),
      FadedAudio: useRef(new Audio(FadedAudio)),
      AloneAudio: useRef(new Audio(AloneAudio)),
    };
  
    const togglePlayPause = (audioKey) => {
      const audioRef = audioRefs[audioKey];
  
      if (activeAudio === audioKey) {
        if (audioRef.current.paused) {
          audioRef.current.play();
        } else {
          audioRef.current.pause();
        }
      } else {
        Object.keys(audioRefs).forEach((key) => {
          audioRefs[key].current.pause();
        });
        audioRef.current.play();
        setActiveAudio(audioKey);
      }
      setIsPlaying(!audioRef.current.paused);
    };
  
    useEffect(() => {
      const updateProgress = (audioKey) => {
        const progressLine = document.querySelector(`.progress-line-${audioKey}`);
        const audioRef = audioRefs[audioKey].current;
  
        if (progressLine) {
          progressLine.style.width = `${
            (audioRef.currentTime / audioRef.duration) * 100
          }%`;
        }
      };
  
      Object.keys(audioRefs).forEach((key) => {
        const audioRef = audioRefs[key].current;
        audioRef.addEventListener("timeupdate", () => updateProgress(key));
      });
  
      return () => {
        Object.keys(audioRefs).forEach((key) => {
          const audioRef = audioRefs[key].current;
          audioRef.removeEventListener("timeupdate", () => updateProgress(key));
        });
      };
    }, [audioRefs]);
  
    const handleProgressClick = (e, audioKey) => {
      const progressBar = e.currentTarget;
      const rect = progressBar.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const audioRef = audioRefs[audioKey].current;
    
      if (audioRef) {
        const newTime = (offsetX / progressBar.clientWidth) * audioRef.duration;
        audioRef.currentTime = newTime;
      }
    };
    
    let categoryItems = categoryData[category] || [];

    if (category === 'all') {
      categoryItems = Object.values(categoryData).flat();
    }

  return (
    <>
      <div className="audio-container">
        
      {categoryItems.slice(0, limit).map((item, index) => (
        <AudioCard
          key={index}
          {...item}
          title={item.title}
          activeAudio={activeAudio}
          isPlaying={isPlaying}
          togglePlayPause={() => togglePlayPause(item.audioRef)}
          handleProgressClick={(e) => handleProgressClick(e, item.audioRef)}
          progress={
            (audioRefs[item.audioRef].current.currentTime /
              audioRefs[item.audioRef].current.duration) *
            100
          }
        />
      ))}
      </div>
    </>
  );
};

export default AudioCircle;
