import React from "react";
// import bg1 from "../assets/img/bg1.jpg";
// import bg2 from "../assets/img/bg3.jpg";
// import bg3 from "../assets/img/bg4.jpg";
import ImageSlider from "../components/slider/ImageSlider";
import { useDomainStratergy } from "../../hooks/useDomainStratergy";

function Slideshow() {
  const domainStratergy = useDomainStratergy();

  // const slides = [
  //   {
  //     backgroundImageSrc: bg1,
  //     backgroundAttachment: "fixed",
  //   },
  //   {
  //     backgroundImageSrc: bg2,
  //     backgroundAttachment: "fixed",
  //   },
  //   {
  //     backgroundImageSrc: bg3,
  //     backgroundAttachment: "fixed",
  //   },
  // ];

  const slides = domainStratergy?.images.slideshow().map((src) => ({
    backgroundImageSrc: src,
    backgroundAttachment: "fixed",
  }));

  return (
    <div id="slider">
      <ImageSlider slides={slides ?? []} />
    </div>
  );
}

export default Slideshow;
