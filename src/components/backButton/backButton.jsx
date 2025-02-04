import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importa FontAwesomeIcon
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'; // Importa el icono de flecha hacia atrás
import style from './backButton.module.css';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate(-1); 
  };

  return (
    <div>
      <button className={style.backButton} onClick={navigateBack}>
        <FontAwesomeIcon icon={faArrowLeft} /> {/* Usa el icono aquí */}
        Atrás
      </button>
    </div>
  );
}

export default BackButton;
