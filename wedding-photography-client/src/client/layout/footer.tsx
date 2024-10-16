import React, { useContext } from "react";
import "./footer.css";
import { DomainContext } from "../context/DomainContext";

function Footer() {
  const domain = useContext(DomainContext);

  return (
    <div id="footer">
      <div className="footer-content">
        <span className="footer-heading">{domain?.name ?? "..."}</span>
        <br />
        <br />
        {/* <span className="footer-text">
          If you feel like you can trust us with your event, please get in touch
        </span> */}
        <div className="contact-info">
          <h4 className="contact_us_heading">Contact Us</h4>
          <div className="contact-links">
            <a href={`tel:${domain?.contact_details}`}>
              {domain?.contact_details}
            </a>
            <br />
            <a href={`mailto:${domain?.email}`}>{domain?.email}</a>
            <br />
            <span className="spanAddress">{domain?.address}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
