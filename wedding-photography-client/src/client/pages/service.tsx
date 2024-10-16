import React from "react";
import "./service.css";
import TabView from "../components/TabView/single-tab";
import img3 from "../assets/img/party.png";
import img1 from "../assets/img/ring.png";
import img2 from "../assets/img/rose.png";

import img4 from "../assets/img/wed17.jpg";
import img5 from "../assets/img/wed9.jpg";
import img6 from "../assets/img/wed15.jpg";
import img7 from "../assets/img/wed5.jpg";
import img8 from "../assets/img/wed8.jpg";
import img9 from "../assets/img/flower.jpg";

import eng1 from "../assets/img/engagement/image1.jpg";
import eng2 from "../assets/img/engagement/image2.jpg";
import eng3 from "../assets/img/engagement/image3.jpg";
import eng4 from "../assets/img/engagement/image4.jpg";
import eng5 from "../assets/img/engagement/image5.jpg";
import eng6 from "../assets/img/engagement/image6.jpg";

import cashual1 from "../assets/img/casualShoot/image1.jpg";
import cashual2 from "../assets/img/casualShoot/image2.jpg";
import cashual3 from "../assets/img/casualShoot/image3.jpg";
import cashual4 from "../assets/img/casualShoot/image4.jpg";
import cashual5 from "../assets/img/casualShoot/image5.jpg";
import cashual6 from "../assets/img/casualShoot/image6.jpg";

function Service() {
  const tabData = [
    {
      label: "Wedding",
      imageUrl: img3,
      images: [
        {
          img: img5,
          hideTitle: true,
        },
        {
          img: img4,
          hideTitle: true,
        },
        {
          img: img6,
          hideTitle: true,
        },
        {
          img: img7,
          hideTitle: true,
        },
        {
          img: img8,
          hideTitle: true,
        },
        {
          img: img9,
          hideTitle: true,
        },
      ],
    },
    {
      label: "Engagement",
      imageUrl: img1,
      images: [
        {
          img: eng1,
          hideTitle: true,
        },
        {
          img: eng2,
          hideTitle: true,
        },
        {
          img: eng3,
          hideTitle: true,
        },
        {
          img: eng4,
          hideTitle: true,
        },
        {
          img: eng5,
          hideTitle: true,
        },
        {
          img: eng6,
          hideTitle: true,
        },
      ],
    },
    {
      label: "Casual Shoot",
      imageUrl: img2,
      images: [
        {
          img: cashual1,
          hideTitle: true,
        },
        {
          img: cashual2,
          hideTitle: true,
        },
        {
          img: cashual3,
          hideTitle: true,
        },
        {
          img: cashual4,
          hideTitle: true,
        },
        {
          img: cashual5,
          hideTitle: true,
        },
        {
          img: cashual6,
          hideTitle: true,
        },
      ],
    },
  ];

  return (
    <>
      <div id="service">
        <span className="service-heading">Offerings</span>
        <TabView tabData={tabData} />
      </div>
    </>
  );
}

export default Service;
