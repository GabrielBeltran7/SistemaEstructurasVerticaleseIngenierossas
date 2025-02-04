import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./componentHome.module.css";
import ComponentCarrousel from "../ComponentCarrousel/componentCarrousel";

import { auth } from "../../../api/firebase/FirebaseConfig/FirebaseConfig";
import { getUserProfile, getUserProfileByEmail } from "../../Redux/Actions";
import { useDispatch } from "react-redux";
const ComponentHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dateUser = auth.currentUser;

  const userEmail = dateUser?.email ?? "";

  useEffect(() => {
    dispatch(getUserProfileByEmail(userEmail));
  }, [userEmail]);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [userEmail]);

  const navigateLogin = () => {
    navigate("/login");
  };

  const navigateRegister = () => {
    navigate("/register");
  };
  return (
    <div className={style.container}>
      {!userEmail ? (
        <div className={style.containerbutton}>
          <button className={style.button} onClick={navigateLogin}>
            Iniciar Sesión
          </button>
        </div>
      ) : (
        <label className={style.label}>Bienvenidos a</label>
      )}

      <label className={style.label}>
        Estructuras Verticales e Ingenieros SAS
      </label>
      <div className={style.carouselContainer}>
        <ComponentCarrousel />
      </div>
    </div>
  );
};

export default ComponentHome;
