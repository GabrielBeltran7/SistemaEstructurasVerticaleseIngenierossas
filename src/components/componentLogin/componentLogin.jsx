import React, { useState } from "react";
import styles from "./componentLogin.module.css";
import { FaSignInAlt, FaUserPlus, FaEnvelope, FaLock } from "react-icons/fa";
import BackButton from "../backButton/backButton";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../api/firebase/FirebaseConfig/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";

const ComponentLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigateRecoverPassword = () => {
    navigate("/passwordrecover");
  };

  const navigateRegister = () => {
    navigate("/register");
  };
  const navigateProfile = () => {
    navigate("/profile");
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      navigateProfile()
      Swal.fire({
        icon: 'success',
        title: 'Bienvenido.',
        timerProgressBar: true,
        timer: 1500,
      });

 const dateUser = auth.currentUser;




    } catch (error) {
      if (error.code === 'auth/invalid-login-credentials') {
        Swal.fire({
          icon: 'error',
          title: 'Revisa tu correo o contraseña',
          text: 'Intenta Nuevamente.',
          confirmButtonColor: '#d33',
          timer: 5000,
        });
      } else {
        // Otros errores
       
        Swal.fire({
          icon: 'error',
          title: 'Error al Iniciar sesion',
          text: 'Intenta Nuevamente.',
          confirmButtonColor: '#d33',
          timer: 5000,
        });
      }
    }
  };

  return (
    <>
      <div className={styles.bodyContainer}>
        <BackButton />
      </div>
      <div className={styles.container}>
        <label className={styles.labelTitle}>Iniciar Sesión</label>
        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.inputContainer}>
            <FaEnvelope className={styles.icon} />
            <input
              placeholder="Correo"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputContainer}>
            <FaLock className={styles.icon} />
            <input
              placeholder="Contraseña"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>

          <button type="submit" className={styles.button}>
            <FaSignInAlt /> Iniciar Sesión
          </button>

          {/* <button
            type="button"
            onClick={navigateRegister}
            className={styles.button}
          >
            <FaUserPlus /> Crear Cuenta
          </button> */}

          <div className={styles.div} onClick={navigateRecoverPassword}>
            <label className={styles.contra}>¿Olvidaste tu Contraseña? </label>
            <label className={styles.contraRecuperala}> Recupérala!</label>
          </div>
        </form>
      </div>
    </>
  );
};

export default ComponentLogin;

