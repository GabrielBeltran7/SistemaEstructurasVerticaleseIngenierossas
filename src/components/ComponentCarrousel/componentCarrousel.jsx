import React from "react";
import { Carousel } from "antd";
import style from "./componentCarrousel.module.css";

const componentCarrousel = () => (
  <Carousel effect="fade" autoplay className={style.carrousel}>
    <div className={style.image}>
      <img
        src="https://res.cloudinary.com/dnigz3zfp/image/upload/v1738351421/Supervisi%C3%B3n_de_Obras_ewjph2.webp"
        alt=""
      />
    </div>

    <div className={style.imageCuatro}>
      <img
        src="https://res.cloudinary.com/dnigz3zfp/image/upload/v1738351420/Interventoria_de_Obras_drmwnk.webp"
        alt=""
      />
    </div>
    <div className={style.imageCinco}>
      <img
        src="https://res.cloudinary.com/dnigz3zfp/image/upload/v1738351420/Dise%C3%B1o_y_Fabricaci%C3%B3n_de_Montajes_Estructurales_l3rhds.webp"
        alt=""
      />
    </div>
    <div className={style.imageSeis}>
      <img
        src="https://res.cloudinary.com/dnigz3zfp/image/upload/v1738351420/Elaboraci%C3%B3n_de_Pliegos_de_Condiciones_anijpt.webp"
        alt=""
      />
    </div>
    <div className={style.imageSiete}>
      <img
        src="https://res.cloudinary.com/dnigz3zfp/image/upload/v1738351420/Dise%C3%B1os_Estructurales_qufumu.webp"
        alt=""
      />
    </div>
    <div className={style.imageOcho}>
      <img
        src="https://res.cloudinary.com/dnigz3zfp/image/upload/v1738351421/Recibo_de_Zonas_Comunes_PH_wdkux0.webp"
        alt=""
      />
    </div>
  </Carousel>
);

export default componentCarrousel;
