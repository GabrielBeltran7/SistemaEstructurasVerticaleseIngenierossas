import React from 'react'

import style from "./backButtonAdmin.module.css"
import { useNavigate } from 'react-router-dom';

const BackButtonAdmin = () => {
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate("/homeadmin"); 
  };
  return (
    <div >
        <button className={style.backButton} onClick={navigateBack}>
        Atrás
      </button>
    </div>
  )
}

export default BackButtonAdmin