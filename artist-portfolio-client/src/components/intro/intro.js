import React from "react";
import "./intro.css";
import Button from '@mui/material/Button';
import background_intro from "../../assets/img/img-singer.svg";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import { useTranslation } from "react-i18next";

const Intro = () => {

  const { t , i18n } = useTranslation()

  return (
    <section id="intro">
      <div className="intro-container">
        <div className="introContent">
          <span className="introtext">
            {t('intro_text')}
            <br />
            {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; out <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; now
            <br /> */}
          </span>
          <span className="intropara">
            {t('intro_para')}
          </span>
          <div className="links">
            <AppleIcon className="link" />
            <FacebookOutlinedIcon className="link" />
            <InstagramIcon className="link" />
            <TwitterIcon className="link" />
            <GoogleIcon className="link" />
          </div>

          <div className="button-grid">
            <span className="button-listen"><Button variant="outlined" style={{ borderColor: "#9AB7D3", color: "#d1c6c6" }}>{t('intro_button1')}</Button></span>
            <span className="button-shop"><Button variant="outlined" style={{ borderColor: "#9AB7D3", color: "#d1c6c6" }}>{t('intro_button2')}</Button></span>
          </div>
        </div>

        <div className="backImg">
          <img className="background_intro" src={background_intro} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Intro;
