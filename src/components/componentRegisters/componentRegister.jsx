
import Swal from "sweetalert2"
import {
  FaEnvelope,
  FaLock,
} from "react-icons/fa"; // Importa los iconos que necesitas
import React, { useState } from "react";
import style from "./componentRegister.module.css";
import { auth } from "../../../api/firebase/FirebaseConfig/FirebaseConfig.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const componentRegister = () => {

  const navigate = useNavigate();

  const navigateProfile = () => {
    navigate("/profile");
  };

  const [input, setInput] = useState({
    email: "",
    password: "",
    confipassword: ""
  });
  const [error, setError] = useState("");

  const handleChangeInput = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    const passwordRegex = /.{6,}/;
    return passwordRegex.test(password);
  };

  const isValidConfipassword = () => {
    return input.password === input.confipassword;
  };
  const onSubmitInputs = async (event) => {
    event.preventDefault();
  
    if (!isValidEmail(input.email)) {
      setError("Ingresa un correo válido");
  
      setTimeout(() => {
        setError("");
      }, 4000);
    } else if (!isValidPassword(input.password)) {
      setError("Ingrese una contraseña de 6 caracteres");
  
      setTimeout(() => {
        setError("");
      }, 4000);
    } else if (!isValidConfipassword()) {
      setError("Las contraseñas no coinciden");
  
      setTimeout(() => {
        setError("");
      }, 4000);
    } else {
      try {
        
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          input.email,
          input.password
        );
      
       
        Swal.fire({
          icon: 'success',
          title: 'Usuario Registrado con Éxito.',
          timerProgressBar: true,
          timer: 4500,
        });
        navigateProfile()
      } catch (error) {
       
        if (error.code === 'auth/email-already-in-use') {
          Swal.fire({
            icon: 'error',
            title: 'Correo ya registrado',
            text: 'Debe iniciar sesión.',
            confirmButtonColor: '#d33',
            timer: 5000,
          });
        } else {
          // Otros errores
         
          Swal.fire({
            icon: 'error',
            title: 'Error al registrar el usuario',
            text: 'Vuelva a intentarlo.',
            confirmButtonColor: '#d33',
            timer: 5000,
          });
        }
      }
      setError("");
      setInput({
        email: "",
        password: "",
        confipassword: ""
      });
    }
  };
  

  return (
    <>
      <div className={style.bodyContainer}>
        
      </div>
      <div className={style.container}>
        <label className={style.labelTitle}>Regístrate</label>
        <form className={style.form}>
          <div className={style.inputContainer}>
          <FaEnvelope className={style.icon} />
            <input
              className={style.input}
              name="email"
              type="email"
              placeholder="Correo"
              onChange={handleChangeInput}
              value={input.email}
            />
          </div>
          <div className={style.inputContainer}>
          <FaLock className={style.icon} />
            <input
              className={style.input}
              name="password"
              type="password"
              placeholder="Ingresa tu Contraseña"
              onChange={handleChangeInput}
              value={input.password}
              required
            />
          </div>
          <div className={style.inputContainer}>
          <FaLock className={style.icon} />
            <input
              className={style.input}
              name="confipassword"
              type="password"
              placeholder="Confirma tu Contraseña"
              onChange={handleChangeInput}
              value={input.confipassword}
              required
            />
          </div>
          <div className={style.diverror}>
            {error && <label className={style.errorLabel}>{error}</label>}
          </div>
          <div className={style.inputContainer}>
            <button className={style.button} onClick={onSubmitInputs}>
              Registrar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default componentRegister;
