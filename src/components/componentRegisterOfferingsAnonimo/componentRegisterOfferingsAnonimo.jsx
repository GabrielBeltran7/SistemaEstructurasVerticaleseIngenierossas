import React, { useState, useEffect } from "react";
import style from "./componentRegisterOfferingsAnonimo.module.css";
import { auth } from "../../../api/firebase/FirebaseConfig/FirebaseConfig";
import { useDispatch, useSelector } from "react-redux";

import { postOfferings, getUserProfileByEmail } from "../../Redux/Actions";
import { onAuthStateChanged } from "firebase/auth";
import BackButton from "../backButton/backButton";
import BackButtonAdmin from "../backButtonAdmin/backButtonAdmin";
import { useNavigate, useParams } from "react-router-dom";

const ComponentRegisterOfferings = () => {
  const dateUser = auth.currentUser;
  const userId = dateUser?.uid ?? "";
  const userEmail = dateUser?.email ?? "";
  const dispatch = useDispatch();
  const { id } = useParams();
const navigate = useNavigate()
  const allUsers = useSelector((state) => state.allUsers);
  const userByemail = useSelector((state) => state.UserProfileByEmail);
  
  useEffect(() => {
    dispatch(getUserProfileByEmail(userEmail));
  }, [userEmail]);

  const userfilter = allUsers.find((user) => user.id === id) || {};
 

  const [formData, setFormData] = useState({});
  const obtenerFechaActual = () => {
    const fecha = new Date();
    return `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}-${fecha.getDate().toString().padStart(2, '0')}`;
  };
  const [inputs, setInputs] = useState({
    userAdmin:userEmail,
    iduser: "Anonimo",
    nombre: "Anonimo",
    apellidos: "Anonimo",
    email: "Anonimo",
    fechadeofrenda: obtenerFechaActual(),
    cantidadofrendada: "",
    tipodeofrenda:""
  });

  useEffect(() => {
    setInputs({
      iduser: "Anonimo",
      nombre: "Anonimo",
      apellidos: "Anonimo",
      email: "Anonimo",
      userAdmin:userEmail || "",
      fechadeofrenda: obtenerFechaActual(),
    });
  }, []);

  const handleChangeInputs = (event) => {
    const { name, value } = event.target;
    if (name === "cantidadofrendada" && !/^\d*\.?\d*$/.test(value)) {
      return; // No actualiza el estado si no cumple con el formato deseado
    }
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  const handleSaveSubmit = (e) => {
    e.preventDefault();
    dispatch(postOfferings(inputs));
    dispatch(getUserProfileByEmail(userEmail));

    setInputs({
      userAdmin:userEmail,
    iduser: "Anonimo",
    nombre: "Anonimo",
    apellidos: "Anonimo",
    email: "Anonimo",
    fechadeofrenda: obtenerFechaActual(),
    cantidadofrendada: "",
    tipodeofrenda:""
      
    });
    setTimeout(() => {
      navigate('/homeadmin');
    }, 2000); 
  };

  useEffect(() => {
    setTimeout(() => {
      setFormData({});
    }, 1500);
  }, [userId]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
      } else {
      }
    });
  }, []);

  return userByemail.admin === "Administrador" ? (
    <>
    
      <div className={style.bodyContainer}>
        <BackButtonAdmin />
      </div>

      <div className={style.container}>
        <h2 className={style.labelTitle}>Registrar Ofrendas</h2>

        <form className={style.form} onSubmit={handleSaveSubmit}>
          <div className={style.div}>
            <div className={style.inputContainer}>
              <label>
                {" "}
                <input
                  placeholder="Nombre"
                  type="text"
                  name="nombre"
                  value={inputs.nombre}
                  onChange={handleChangeInputs}
                  className={style.inputdiv}
                  readOnly
                  required
                />
              </label>
            </div>
            <div className={style.inputContainer}>
              <label>
                {" "}
                <input
                  placeholder="Apellidos:"
                  type="text"
                  name="apellidos"
                  value={inputs.apellidos}
                  onChange={handleChangeInputs}
                  className={style.inputdiv}
                  readOnly
                  required
                />
              </label>
            </div>
          </div>

          <div className={style.inputContainer}>
            <label>
              {" "}
              <input
                placeholder="Correo:"
                type="email"
                name="email"
                value={inputs.email}
                onChange={handleChangeInputs}
                className={style.input}
                readOnly
                required
              />
            </label>
          </div>
         
          <div className={style.inputContainer}>
              <label>
                Tipo de Ofrenda:
                <select
                  name="tipodeofrenda"
                  value={inputs.tipodeofrenda}
                  onChange={handleChangeInputs}
                  className={style.input}
                  required
                >
                  <option value="">Seleccione un tipo de ofrenda</option>
                  <option value="Donación">Donación</option>
                 
                  <option value="Beso">Beso</option>
                </select>
              </label>
            </div>

          <div className={style.inputContainer}>
            <label>
              {" "}
              Fecha de Ofrenda
              <input
                placeholder="Fecha de Ofrenda"
                type="date"
                name="fechadeofrenda"
                value={inputs.fechadeofrenda}
                onChange={handleChangeInputs}
                className={style.input}
                required
              />
            </label>
          </div>
 


          <div className={style.inputContainer}>
            <label>
              <input
                placeholder="$ Cantidad de ofrenda"
                type="Number"
                name="cantidadofrendada"
                value={inputs.cantidadofrendada}
                onChange={handleChangeInputs}
                className={style.input}
                required
              />
            </label>
          </div>

          <div className={style.buttoncontainer}>
            <div className={style.inputContainer}>
              <button type="submit" className={style.button}>
                Enviar
              </button>
            </div>
          </div>
        </form>
        <div className={style.offering}></div>
      </div>
      
    </>
  
  ): <label>Por favor inicia Sesion</label>
};

export default ComponentRegisterOfferings;
