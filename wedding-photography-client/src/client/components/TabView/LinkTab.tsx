import React from "react";
import "./LinkTab.css"; // Import your CSS file for styling

interface LinkTabProps {
  label: string;
  imageUrl: string;
  value: string;
  onClick: () => void;
}
function LinkTab({ label, onClick, imageUrl }: LinkTabProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className="link-tab" onClick={handleClick}>
      <div className="link-content">
        <div className="circle-tab">
          <img className="tab-img" src={imageUrl} alt={label} />
        </div>
        <div className="label">{label}</div>
      </div>
    </div>
  );
}

export default LinkTab;
