import { BaseDomainStratergy, DomainStratergy } from "../types";
import slide1 from "../../assets/domains/6566fad6f23391e789f9004d/slideshow/slide1.jpg";
import slide2 from "../../assets/domains/6566fad6f23391e789f9004d/slideshow/slide2.jpg";
import slide3 from "../../assets/domains/6566fad6f23391e789f9004d/slideshow/slide3.jpg";
import slide4 from "../../assets/domains/6566fad6f23391e789f9004d/slideshow/slide4.jpg";
import slide5 from "../../assets/domains/6566fad6f23391e789f9004d/slideshow/slide5.jpg";
import React from "react";

export const DefaultDomain: DomainStratergy = {
  ...BaseDomainStratergy,

  domainId: "6566fad6f23391e789f9004d",
  render: {
    ...BaseDomainStratergy.render,
    album: () => <></>,
  },
  images: {
    ...BaseDomainStratergy.images,
    slideshow: () => {
      return [slide1, slide3, slide2, slide4, slide5];
    },
  },
};
