import React from "react";
import CategoryPanel from "./CategoryPanel/CategoryPanel";
import "./SideMenu.css";

export default function SideMenu() {
  return (
    <div className="side-menu">
      <div
        // className="categories"
        style={{
          // maxHeight: "30rem",
          backgroundColor: "white",
          flex: 0.25,
        }}
      >
        <CategoryPanel />
      </div>
      {/* <div className="filters ">
        <div className="brands">brands</div>
        <div className="color">color</div>
        <div className="price">price</div>
        <div className="rating">rating</div>
      </div>
      <div
        className="side-image"
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 0.35,
          backgroundColor: "white",
        }}
      >
        image
      </div> */}
    </div>
  );
}
