import React, { useState } from "react";
import "./contact.css";
import ContactBg from "../../assets/img/contact_banner.jpg"
import { useTranslation } from "react-i18next";

function Contact() {

  const { t , i18n } = useTranslation()
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can access formData here and send it to your backend or perform any other actions
    console.log("Form Data:", formData);
  };

  return (
    <section id="contact">
      <div className="contactContainer">
        <div className="titleContainer">
          <h3 className="contactTitle">Contact</h3>
        </div>
        {/* <div className="contact-bg">
          <img className="contactbg-img" src={ContactBg} alt="" />
        </div><br /> <br /> */}
        <div className="contactbox">
          <span className="contactDesc">
          {t('contact_desc')}
          </span>
          <form className="contactForm" onSubmit={handleSubmit}>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              className="email"
              placeholder="Your Email"
              value={formData.email}
            />
            <button className="submitbtn" type="submit">
              Sign Up
            </button>
            {/* <div className="links">
            <img src={Facebook} alt="Facebook" className="link" />
            <img src={Insta} alt="Instagram" className="link" />
            <img src={Twitter} alt="Twitter" className="link" />
            <img src={Youtube} alt="Youtube" className="link" />
          </div> */}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
