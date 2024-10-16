import React, { useContext, useMemo, useState } from "react";
import "./navbar.css";
import "../../css/custom_style.css";
import { Link } from "react-scroll";
import { useDomainStratergy } from "../../hooks/useDomainStratergy";
import { useDomain } from "../../hooks/useDomain";

const Navbar = () => {
  const domain = useDomain();
  const domainStratergy = useDomainStratergy();

  const [isMenuOpen, setMenuOpen] = useState(false);
  const logo = useMemo(() => {
    if (domainStratergy) {
      return domainStratergy.images.logo();
    }
    return undefined;
  }, [domainStratergy]);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${isMenuOpen ? "open" : ""}`}>
      <div className="nav-content">
        <div className="logo-container">
          {logo ? (
            <img src={logo} alt="logo" style={{ maxWidth: "250px" }} />
          ) : (
            <h2 className="title">{domain?.name}</h2>
          )}
        </div>
        <div
          className={`menu-toggle ${isMenuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <div className={`desktopMenu ${isMenuOpen ? "open" : ""}`}>
          <Link
            activeClass="active"
            to="slider"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="desktopMenuListItem"
          >
            Home
          </Link>
          <Link
            activeClass="active"
            to="about"
            spy={true}
            smooth={true}
            offset={-50}
            duration={500}
            className="desktopMenuListItem"
          >
            About Us
          </Link>
          <Link
            activeClass="active"
            to="service"
            spy={true}
            smooth={true}
            offset={-75}
            duration={500}
            className="desktopMenuListItem"
          >
            Services
          </Link>
          {/* <Link
            activeClass="active"
            to="album"
            spy={true}
            smooth={true}
            offset={-80}
            duration={500}
            className="desktopMenuListItem"
          >
            Portfolio
          </Link> */}
          <Link
            activeClass="active"
            to="contact"
            spy={true}
            smooth={true}
            offset={-75}
            duration={500}
            className="desktopMenuListItem"
          >
            Contact Us
          </Link>
        </div>

        <button
          className="contactbtn"
          onClick={() => {
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <h4 className="contact-text">Book Your Session</h4>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
