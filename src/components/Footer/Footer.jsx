import React from 'react';
import { FaFacebook, FaYoutube, FaTwitter, FaInstagram } from 'react-icons/fa';
import style from "./Footer.module.css"


const Footer = () => {
    return (
        <>
        <div className={style.containerprincipal}>
          <a href="#" ><FaFacebook /></a>
          <a href="#" ><FaYoutube /></a>
          <a href="#" ><FaTwitter /></a>
          <a href="#" ><FaInstagram /></a>
        </div>
        </>
      );
}

export default Footer