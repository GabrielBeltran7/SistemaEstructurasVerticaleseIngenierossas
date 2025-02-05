import React, { useState, useEffect } from "react";
import style from "./ComponentProfile.module.css";
import { auth } from "../../../api/firebase/FirebaseConfig/FirebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import departamentosData from "./departamentos.json"; 

import {
  postProfile,
  getUserProfileByEmail,
  updateProfile,
} from "../../Redux/Actions";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";


const ComponentProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userByemail = useSelector((state) => state.UserProfileByEmail);
  console.log("boton guardar", userByemail)
  

  const dateUser = auth.currentUser;
  const userId = dateUser?.uid ?? "";
  const userEmail = dateUser?.email ?? "";

  useEffect(() => {
    dispatch(getUserProfileByEmail(userEmail));
  }, [userEmail]);

  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    fechaNacimiento: "",
    fechaAfiliacion: "",
    educacion:"",
    numerotarjetaprofesional:"",
    cargo: "",
    departamento: "",
    telefono: "",
    direccion: "",
    email: userEmail,
    userId: userId,
    rol: "Usuario",
    user: "activo",
    estado:"deshabilitado"

  });

  const [inputs, setInputs] = useState({
    nombre: "",
    apellidos: "",
    telefono: "",
    direccion: "",
    fechaNacimiento: "",
    fechaAfiliacion: "",
    ciudad: "",
    educacion:"",
    numerotarjetaprofesional:"",
    cargo: "",
    departamento: "",

    email: "",
    id: "",
    rol: "",
    user: "",
  });
  useEffect(() => {
    setInputs({
      nombre: userByemail.nombre || "",
      apellidos: userByemail.apellidos || "",
      fechaNacimiento: userByemail.fechaNacimiento || "",
      fechaAfiliacion: userByemail.fechaAfiliacion || "",
      ciudad: userByemail.ciudad || "",
      departamento: userByemail.departamento || "",
      educacion: userByemail.educacion || "",
      numerotarjetaprofesional:userByemail.numerotarjetaprofesional|| "",
      cargo: userByemail.cargo || "",
      email: userByemail.email || "",
      id: userByemail.id || "",
      rol: userByemail.rol || "",
      user: userByemail.user || "",
      telefono: userByemail.telefono || "",
      direccion: userByemail.direccion || "",
    });
  }, [userByemail]);

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeInputs = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  const handleSaveSubmit = (e) => {
    e.preventDefault();
    dispatch(postProfile(formData));
    dispatch(getUserProfileByEmail(userEmail));

    setFormData({
      nombre: "",
      apellidos: "",
      fechaNacimiento: "",
      fechaAfiliacion: formattedDate,
      ciudad: "",
      departamento: "",
      educacion:"",
      numerotarjetaprofesional:"",
      cargo: "",
      email: userEmail,
      userId: userId,
      telefono: "",
      direccion: "",
      rol: "Usuario",
      user: "activo",
    });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(inputs));
    dispatch(getUserProfileByEmail(userEmail));
  };

  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  useEffect(() => {
    setTimeout(() => {
      setFormData({
        ...formData,
        email: userEmail,
        userId: userId,
        fechaAfiliacion: formattedDate,
      });
    }, 1500);
  }, [userId]);

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
  return userByemail.length === 0 ? (
    < >
     

      <div className={style.container}>
        <h2 className={style.labelTitle}>Registrar Datos Personales</h2>
        {userEmail ? (
          <form className={style.form} onSubmit={handleSaveSubmit}>
            <div className={style.div}>
              <div className={style.inputContainer}>
                <label>
                  <input
                    placeholder="Nombre"
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
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
                    value={formData.apellidos}
                    onChange={handleInputChange}
                    className={style.inputdiv}
                    required
                  />
                </label>
              </div>
            </div>

            <div className={style.div}>
              <div className={style.inputContainer}>
                <label>
                  {" "}
                  <input
                    placeholder="Telefono"
                    type="Number"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className={style.inputdiv}
                    required
                  />
                </label>
              </div>
              <div className={style.inputContainer}>
                <label>
                  {" "}
                  <input
                    placeholder="Direccion:"
                    type="text"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
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
                  value={formData.ciudad}
                  onChange={handleInputChange}
                  className={style.input}
                  required
                />
              </label>
            </div>




            <div className={style.inputContainer}>
              <label>
                <select
                  name="departamento"
                  value={formData.departamento}
                  onChange={handleInputChange}
                  className={style.input}
                  required
                >
                  <option value="" disabled>
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
                  value={formData.educacion}
                  onChange={handleInputChange}
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
                  value={formData.numerotarjetaprofesional}
                  onChange={handleInputChange}
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
                  value={formData.cargo}
                  onChange={handleInputChange}
                  className={style.input}
                  required
                />
              </label>
            </div>

          

            <div className={style.divdate}>
              <div className={style.inputContainer}>
                <label>
                  {" "}
                  Fecha de Nacimiento
                  <input
                    placeholder="Fecha de nacimiento"
                    type="date"
                    name="fechaNacimiento"
                    value={formData.fechaNacimiento}
                    onChange={handleInputChange}
                    className={style.inputdate}
                    required
                  />
                </label>
              </div>
              <div className={style.inputContainer}>
                <label>
                  {" "}
                  Fecha de Ingreso
                  <input
                    placeholder="Fecha de Ingreso"
                    type="date"
                    name="fechaAfiliacion"
                    value={formData.fechaAfiliacion}
                    onChange={handleInputChange}
                    className={style.inputdate}
                  />
                </label>
              </div>
            </div>

            <div className={style.buttoncontainer}>
              <div className={style.inputContainer}>
                <button type="submit" className={style.button}>
                  Guardar
                </button>
              </div>
            </div>
          </form>
        ) : (
          <label className={style.labelerror}>Por Favor Inicia Sesion</label>
        )}
      </div>
    </>
  ) : (
    <>
      
      <div className={style.container}>
        <h2 className={style.labelTitle}>Mis Datos Personales</h2>
        {userEmail ? (
          <form className={style.form} onSubmit={handleUpdateSubmit} >
            <div className={style.div} >
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
                    required
                    disabled
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
                    required
                    disabled
                  />
                </label>
              </div>
            </div>
            <div className={style.div}>
              <div className={style.inputContainer}>
                <label>
                  {" "}
                  <input
                    placeholder="Telefono"
                    type="Number"
                    name="telefono"
                    value={inputs.telefono}
                    onChange={handleChangeInputs}
                    className={style.inputdiv}
                    required
                    disabled
                  />
                </label>
              </div>
              <div className={style.inputContainer}>
                <label>
                  {" "}
                  <input
                    placeholder="Direccion:"
                    type="text"
                    name="direccion"
                    value={inputs.direccion}
                    onChange={handleChangeInputs}
                    className={style.inputdiv}
                    required
                    disabled
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
                  disabled
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
                  disabled
                >
                  <option value="" disabled>
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
                  disabled
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
                  disabled
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
                  disabled
                />
              </label>
            </div>


            <div className={style.divdate}>
              <div className={style.inputContainer}>
                <label>
                  {" "}
                  Fecha de Nacimiento
                  <input
                    placeholder="Fecha de nacimiento"
                    type="date"
                    name="fechaNacimiento"
                    value={inputs.fechaNacimiento}
                    onChange={handleChangeInputs}
                    className={style.inputdate}
                    required
                    disabled
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
                    disabled
                  />
                </label>
              </div>
            </div>

            {/* <div className={style.buttoncontainer}>
              <div className={style.inputContainer}>
                <button type="submit" className={style.button} disabled>
                  Actualizar
                </button>
              </div>
            </div> */}
          </form>
        ) : (
          <label className={style.labelerror}>Por Favor Inicia Sesion</label>
        )}
      </div>
    </>
  );
};

export default ComponentProfile;
