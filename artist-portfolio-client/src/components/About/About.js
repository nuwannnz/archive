import React from "react";
import "./About.css";
import AboutBg from "../../assets/img/cover.svg";
import Sign from "../../assets/img/sign.svg";
import { useTranslation } from "react-i18next";

function About() {

  const { t , i18n } = useTranslation()

  return (
    <section id="about">
      <h3 className="aboutTitle">About</h3>
      <div className="about-content">
        <div className="about-bg">
          <img className="aboutbg-img" src={AboutBg} alt="" />
        </div>
        <div className="about-text">
          <div className="aboutYearTitle">
            <span className="aboutYear">{t('about_experience_year')}</span>
            <span className="aboutTitleText">{t('about_title')}</span>
          </div><br /> <br/>
          <p className="aboutDesc">
          {t('about_description')}
          </p>
          <div className="e-sign">
                <img className="sign-img" src={Sign} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
