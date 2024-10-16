/* eslint-disable react/self-closing-comp */
import React from "react";
import SideMenu from "./SideMenu";

interface IContainerLayoutProps {
  children: React.ReactElement;
}
function SideMenuLayout({ children }: IContainerLayoutProps) {
  return (
    <div className="inner-container">
      <SideMenu />
      <div className="product-list">{children}</div>
    </div>
  );
}

export default SideMenuLayout;
