import React, { useState, useEffect } from "react";
import style from "./componentUpdateUserAdmin.module.css";
import { auth } from "../../../api/firebase/FirebaseConfig/FirebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import departamentosData from "./departamentos.json"; 


import {
  getUserProfileByEmail,
  updateProfile,
} from "../../Redux/Actions";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate, useParams } from "react-router-dom";

const componentUpdateUserAdmin = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userByemail = useSelector((state) => state.UserProfileByEmail);
  const allUsers = useSelector((state) => state.allUsers);

  const userfilter = allUsers.find((user) => user.id === id) || {};

  const dateUser = auth.currentUser;
  const userEmail = dateUser?.email ?? "";

  useEffect(() => {
    dispatch(getUserProfileByEmail(userEmail));
  }, [userEmail]);

  const [inputs, setInputs] = useState({
    nombre: "",
    apellidos: "",
    telefono: "",
    direccion: "",
    fechaNacimiento: "",
    fechaAfiliacion: "",
    ciudad: "",
    educacion: "",
    numerotarjetaprofesional: "",
    cargo: "",
    departamento: "",
    adminupdate: userEmail || "", 
    email: "",
    id: "",
    rol: "",
    user: "",
  });

  useEffect(() => {
    setInputs({
      nombre: userfilter.nombre || "",
      apellidos: userfilter.apellidos || "",
      fechaNacimiento: userfilter.fechaNacimiento || "",
      fechaAfiliacion: userfilter.fechaAfiliacion || "",
      ciudad: userfilter.ciudad || "",
      departamento: userfilter.departamento || "",
      educacion: userfilter.educacion || "",
      numerotarjetaprofesional: userfilter.numerotarjetaprofesional || "",
      cargo: userfilter.cargo || "",
      email: userfilter.email || "",
      id: userfilter.id || "",
      rol: userfilter.rol || "",
      user: userfilter.user || "",
      telefono: userfilter.telefono || "",
      direccion: userfilter.direccion || "",
    });
  }, [userfilter]);

  const handleChangeInputs = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ ...inputs, adminupdate: userEmail }));
    dispatch(getUserProfileByEmail(userEmail));
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // El usuario está autenticado
      } else {
        // El usuario no está autenticado
      }
    });
  }, []);

  const navigateHomeAdmin = () => {
    navigate("/homeadmin");
  };

  return userByemail.length === 0 ? null : (
    <>
      <div className={style.container}>
        <h2 className={style.labelTitle}></h2>
        {userEmail ?  (
          <form className={style.form} onSubmit={handleUpdateSubmit}>
            <div className={style.div}>
              <div className={style.inputContainer}>
                <label>
                  <input
                    placeholder="Nombre"
                    type="text"
                    name="nombre"
                    value={inputs.nombre}
                    onChange={handleChangeInputs}
                    className={style.inputdiv}
                    required
                    
                  />
                </label>
              </div>
              <div className={style.inputContainer}>
                <label>
                  <input
                    placeholder="Apellidos:"
                    type="text"
                    name="apellidos"
                    value={inputs.apellidos}
                    onChange={handleChangeInputs}
                    className={style.inputdiv}
                    required
                   
                  />
                </label>
              </div>
            </div>
            <div className={style.div}>
              <div className={style.inputContainer}>
                <label>
                  <input
                    placeholder="Telefono"
                    type="Number"
                    name="telefono"
                    value={inputs.telefono}
                    onChange={handleChangeInputs}
                    className={style.inputdiv}
                    required
                   
                  />
                </label>
              </div>
              <div className={style.inputContainer}>
                <label>
                  <input
                    placeholder="Direccion:"
                    type="text"
                    name="direccion"
                    value={inputs.direccion}
                    onChange={handleChangeInputs}
                    className={style.inputdiv}
                    required
                    
                  />
                </label>
              </div>
            </div>
            <div className={style.inputContainer}>
              <label>
                <input
                  placeholder="Ciudad"
                  type="text"
                  name="ciudad"
                  value={inputs.ciudad}
                  onChange={handleChangeInputs}
                  className={style.input}
                  required
                  
                />
              </label>
            </div>

            <div className={style.inputContainer}>
              <label>
                <select
                  name="departamento"
                  value={inputs.departamento}
                  onChange={handleChangeInputs}
                  className={style.input}
                  required
                  
                >
                  <option>
                    Selecciona un departamento
                  </option>
                  {departamentosData.colombia.departments.map((dep) => (
                    <option key={dep.id} value={dep.name}>
                      {dep.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className={style.inputContainer}>
              <label>
                <input
                  placeholder="Titulo Academico"
                  type="text"
                  name="educacion"
                  value={inputs.educacion}
                  onChange={handleChangeInputs}
                  className={style.input}
                  required
                  

                />
              </label>
            </div>

            <div className={style.inputContainer}>
              <label>
                <input
                  placeholder="Numero de Tarjeta Profesional"
                  type="number"
                  name="numerotarjetaprofesional"
                  value={inputs.numerotarjetaprofesional}
                  onChange={handleChangeInputs}
                  className={style.input}
                  required
                  
                />
              </label>
            </div>

            <div className={style.inputContainer}>
              <label>
                <input
                  placeholder="Cargo"
                  type="text"
                  name="cargo"
                  value={inputs.cargo}
                  onChange={handleChangeInputs}
                  className={style.input}
                  required
                  
                />
              </label>
            </div>

            <div className={style.divdate}>
              <div className={style.inputContainer}>
                <label>
                  Fecha de Nacimiento
                  <input
                    placeholder="Fecha de nacimiento"
                    type="date"
                    name="fechaNacimiento"
                    value={inputs.fechaNacimiento}
                    onChange={handleChangeInputs}
                    className={style.inputdate}
                    required
                    
                  />
                </label>
              </div>
              <div className={style.inputContainer}>
                <label>
                  Fecha de Ingreso
                  <input
                    placeholder="Fecha de Ingreso"
                    type="date"
                    name="fechaAfiliacion"
                    value={inputs.fechaAfiliacion}
                    onChange={handleChangeInputs}
                    className={style.inputdate}
                    
                  />
                </label>
              </div>
            </div>

            <div className={style.buttoncontainer}>
              <div className={style.inputContainer}>
                <button type="submit" className={style.button}>
                  Actualizar
                </button>
              </div>
            </div>
          </form>
        ) : (
          <label className={style.labelerror}>Por Favor Inicia Sesion</label>
        )}
      </div>
    </>
  );
};

export default componentUpdateUserAdmin;

