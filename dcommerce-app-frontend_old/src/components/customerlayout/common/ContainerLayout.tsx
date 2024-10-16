/* eslint-disable react/self-closing-comp */
import React from "react";

interface IContainerLayoutProps {
  children: React.ReactElement;
}
function ContainerLayout({ children }: IContainerLayoutProps) {
  return (
    <div className="container-layout">
      <div className="customer-content">{children}</div>
    </div>
  );
}

export default ContainerLayout;
