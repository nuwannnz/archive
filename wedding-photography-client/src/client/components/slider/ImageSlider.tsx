import React, { useState, useEffect } from "react";
import "./ImageSlider.css";
import ImageGallery from "react-image-gallery";

interface ImageSliderProps {
  slides: {
    backgroundImageSrc: string;
    backgroundAttachment: string;
  }[];
}

function ImageSlider({ slides = [] }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
      setCurrentIndex(nextIndex);
    }, 5000); // Adjust the interval (in milliseconds) as needed

    return () => clearInterval(interval);
  }, [currentIndex, slides.length]);

  return (
    <>
      <div id="slider-wrapper">
        <ImageGallery
          showFullscreenButton={false}
          showPlayButton={false}
          showThumbnails={false}
          showNav={false}
          showBullets
          lazyLoad
          items={slides.map((slide) => ({
            original: slide.backgroundImageSrc,
          }))}
          autoPlay={true}
        />
      </div>
    </>
  );
}

export default ImageSlider;
