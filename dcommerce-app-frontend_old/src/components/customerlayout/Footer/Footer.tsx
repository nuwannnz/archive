import React from "react";

function Footer() {
  return (
    <div
      style={{ width: "100%", backgroundColor: "#f8f8f8", textAlign: "center" }}
    >
      Footer
      <div className="footer-container">
        <div className="footer-description">
          <div className="footer-logo">logo</div>
          <div className="find-it-fast">find It Fast</div>
          <div className="customer-care">customer care</div>
          <div className="follow-us">follow us</div>
        </div>
        {/* <div className="contact-container">
          <div className="contact-info">contact</div>
        </div> */}
      </div>
      <div className="copyright-footer">
        <div className="copyright-info">
          © Copyright {new Date().getFullYear()} DCommerce. All rights reserved.
        </div>
        {/* <div className="bank-details">bank details</div> */}
      </div>
    </div>
  );
}

export default Footer;
