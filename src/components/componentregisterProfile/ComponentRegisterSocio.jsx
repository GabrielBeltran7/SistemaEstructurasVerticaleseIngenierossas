import React, { useState, useEffect } from "react";
import style from "./ComponentRegisterSocio.module.css";
import { auth } from "../../../api/firebase/FirebaseConfig/FirebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import {
  postProfile,
  getUserProfileByEmail,
  updateProfile,
} from "../../Redux/Actions";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import BackButton from "../backButton/backButton";

const ComponentRegisterSocio = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userByemail = useSelector((state) => state.UserProfileByEmail);

  const dateUser = auth.currentUser;
  const userId = dateUser?.uid ?? "";
  const userEmail = dateUser?.email ?? "";



  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    fechaNacimiento: "",
    fechaAfiliacion: "",
    estatura: "",
    posicion: "",
    telefono: "",
    direccion: "",
    disponibilidad: "",
    urquilla: "",
    email: "",
   
    admin: "Usuario",
    user: "activo",
  });

 

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "estatura" && !/^\d*\.?\d*$/.test(value)) {
      return; // No actualiza el estado si no cumple con el formato deseado
    }
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };



  const handleSaveSubmit = (e) => {
    e.preventDefault();
    dispatch(postProfile(formData));

  

    setFormData({
      nombre: "",
      apellidos: "",
      fechaNacimiento: "",
      fechaAfiliacion: formattedDate,
      estatura: "",
      posicion: "",
      disponibilidad: "",
      urquilla: "",
      email:"",
     
      telefono: "",
      direccion: "",
      admin: "Usuario",
      user: "activo",
    });
    setTimeout(() => {
      navigate('/homeadmin');
    }, 2000); 
  };


  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  useEffect(() => {
    setTimeout(() => {
      setFormData({
        ...formData,
       
        fechaAfiliacion: formattedDate,
      });
    }, 1500);
  }, []);

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
  return  (
    <>
      <div className={style.bodyContainer}>
        <BackButton />
      </div>

      <div className={style.container}>
        <h2 className={style.labelTitle}>Registrar Socios</h2>
        
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
                  Fecha de Afiliacion
                  <input
                    placeholder="Fecha de afiliación"
                    type="date"
                    name="fechaAfiliacion"
                    value={formData.fechaAfiliacion}
                    onChange={handleInputChange}
                    className={style.inputdate}
                  />
                </label>
              </div>

              
            </div>

            <div className={style.inputContainer}>
              <label>
                <input
                  placeholder="Estatura en metros"
                  type="text"
                  name="estatura"
                  value={formData.estatura}
                  onChange={handleInputChange}
                  className={style.input}
                  required
                />
              </label>
            </div>

            <div className={style.inputContainer}>
              <label>
                <input
                  placeholder=" Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={style.input}
                  required
                />
              </label>
            </div>

            <div className={style.inputContainer}>
              <label>
                Posición:
                <select
                  name="posicion"
                  value={formData.posicion}
                  onChange={handleInputChange}
                  className={style.input}
                  required
                >
                  <option value="">Seleccione...</option>
                  <option value="Derecha">Derecha</option>
                  <option value="Izquierda">Izquierda</option>
                  <option value="No aplica">No Aplica</option>
                </select>
              </label>
            </div>
            <div className={style.inputContainer}>
              <label>
                Disponibilidad:
                <select
                  name="disponibilidad"
                  value={formData.disponibilidad}
                  onChange={handleInputChange}
                  className={style.input}
                  required
                >
                  <option value="">Seleccione...</option>
                  <option value="Semana Mayor">Semana Mayor</option>
                  <option value="Viernes Santo">Viernes Santo</option>
                  <option value="Ambas">Ambas</option>
                  <option value="No aplica">No Aplica</option>
                </select>
              </label>
            </div>
            <div className={style.inputContainer}>
              <label>
                ¿Urquilla?:
                <select
                  name="urquilla"
                  value={formData.urquilla}
                  onChange={handleInputChange}
                  className={style.input}
                  required
                >
                  <option value="">Seleccione...</option>
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                  <option value="No aplica">No Aplica</option>
                </select>
              </label>
            </div>

            <div className={style.buttoncontainer}>
              <div className={style.inputContainer}>
                <button type="submit" className={style.button}>
                  Guardar
                </button>
              </div>
            </div>
          </form>
        
      </div>
    </>
  ) 
};

export default ComponentRegisterSocio;
