
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCotizacion, getCotizacionByNumero } from "../../Redux/Actions";
import styles from "./AprobarCotizacionForm.module.css";
import { useParams } from "react-router-dom";
import GenerateProposal from "../GenerateProposal/GenerateProposal";

const AprobarCotizacionForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
   //Estado para manejar CheckBox
  const [imagenesSeleccionadas, setImagenesSeleccionadas] = useState([]);
   const { email } = useSelector((state) => state.UserProfileByEmail);
  const Cotizacion = useSelector((state) => state.cotizacionNumero);
  
  const [showGeneratePropasar, setShowGeneratePropasar] = useState(false); // Estado para controlar la visibilidad

  const [formData, setFormData] = useState({
 
    NombredeCliente: "",
    CompañiadelCliente: "",
    DirecciondelCliente: "",
    CelulardelCliente: "",
    EmaildelCliente: "",
    DetalledelServicio: "",
    Numerocotizacion: "",
    monto: "",
    date: "",
    referencia: "",
    objetivo: "",
    LugardeEjecucion: "",
    Plazodeejecucion: "",
    CiudaddelCliente: "",
    estado: "",
    imagenes: [],
  });

  //funcion para manejar CheckBox
  const handleCheckboxChange = (imagen) => {
    setImagenesSeleccionadas((prev) => {
      if (prev.includes(imagen)) {
        return prev.filter((img) => img !== imagen); // Si ya está, la elimina
      } else if (prev.length < 3) {
        return [...prev, imagen]; // Solo agrega si hay menos de 3 seleccionadas
      } else {
        return prev; // No permite más de 3
      }
    });
  };
  
  

  const handleGeneratePDF = (proposalData) => {
    if (proposalData) {
      
    }
  };

  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(getCotizacionByNumero(id));
    }
  }, [id, dispatch]);




  useEffect(() => {
    if (Cotizacion) {
      setFormData({
        ...Cotizacion,
        LugardeEjecucion: `${Cotizacion.CompañiadelCliente}, ${ Cotizacion.DirecciondelCliente}`, // Concatenamos dirección + empresa
      });
    }
  }, [Cotizacion]);
  




  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };



  const handleSubmit = async (e) => { 
    e.preventDefault();
  
    if (imagenesSeleccionadas.length !== 3) {
      setError("Debe seleccionar exactamente 3 imágenes.");
      return;
    }
  
    setError("");
  
    const formattedData = {
      ...formData,
      imagenesAprobadas: imagenesSeleccionadas, // Guarda las imágenes seleccionadas
      EmailAdministrador: email || "",
    };
  
    try {
      await dispatch(updateCotizacion(formattedData)); 
      await dispatch(getCotizacionByNumero(formattedData.Numerocotizacion)); 
    } catch (err) {
      setError("Hubo un error al actualizar la cotización.");
      console.error("Error al actualizar:", err);
    }
  };
  


  const fields = [
    { label: "Nombre Empresa", name: "CompañiadelCliente", required: true },
    { label: "Lugar de Ejecución", name: "LugardeEjecucion", required: true, type: "textarea" }, // Se mantiene en el formulario
    { label: "Nombre del Representante Legal", name: "NombredeCliente", required: true },
    { label: "Dirección del Cliente", name: "DirecciondelCliente", required: true },
    { label: "Celular del Cliente", name: "CelulardelCliente", required: true, type: "number" },
    { label: "Correo del Cliente", name: "EmaildelCliente", required: true, type: "email" },
    { label: "Ciudad del Cliente", name: "CiudaddelCliente", required: true },
    { label: "Referencia", name: "referencia", required: true },
    { label: "Objetivo de la Propuesta", name: "objetivo", required: true, type: "textarea" },
    { label: "Actividades a Desarrollar", name: "DetalledelServicio", required: false, type: "textarea" },
    { label: "Plazo de Ejecución", name: "Plazodeejecucion", required: true, type: "textarea" },
    { label: "Valor", name: "monto", required: true, type: "number" },
  ];
  

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.row}>
          <label className={styles.label}>
            Fecha:
            <input
              type="text"
              name="date"
              value={formData.date || ""}
              onChange={handleChange}
              required
              className={styles.input}
              disabled
            />
          </label>
          <label className={styles.label}>
            Numero de Cotizacion:
            <input
              type="text"
              name="Numerocotizacion"
              value={formData.Numerocotizacion || ""}
              onChange={handleChange}
              required
              className={styles.input}
              disabled
            />
          </label>
        </div>

        {fields.map(({ label, name, required, type = "text" }) => (
          <label key={name} className={styles.label}>
            {label}:
            {type === "textarea" ? (
              <textarea
                name={name}
                value={formData[name] || ""}
                onChange={handleChange}
                required={required}
                className={styles.textarea}
              />
            ) : (
              <input
                type={type}
                name={name}
                value={formData[name] || ""}
                onChange={handleChange}
                required={required}
                className={styles.input}
              />
            )}
          </label>
        ))}

        {/* Selector para estado de la cotización */}
        <label className={styles.label}>
          <h1 className={styles.laberestadocotizacion}>Estado de la Cotización:</h1>
          <select
            name="estado"
            value={formData.estado || ""}
            onChange={handleChange}
            required
            className={`${styles.select} ${
              formData.estado === "Pendiente" ? styles.pending :
              formData.estado === "Aprobado" ? styles.approved : ""
            }`}
          >
            <option value="">Seleccione un estado</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Aprobado">Aprobado</option>
          </select>
        </label>

       
      {/* Sección para mostrar imágenes con checkboxes */}
<div className={styles.imageContainer}>
  <h1 className={styles.laberestadocotizacion}>Imágenes Preaprobadas Selecciona 3</h1>
  {formData.imagenes && formData.imagenes.length > 0 ? (
    <div className={styles.imageGrid}>
      {formData.imagenes.map((imagen, index) => (
        <div key={index} className={styles.imageItem}>
          <input
  type="checkbox"
  id={`checkbox-${index}`}
  className={styles.checkbox}
  checked={imagenesSeleccionadas.includes(imagen)}
  onChange={() => handleCheckboxChange(imagen)}
  disabled={!imagenesSeleccionadas.includes(imagen) && imagenesSeleccionadas.length >= 3} // Bloquea si ya hay 3
/>
          <label htmlFor={`checkbox-${index}`} className={styles.imageLabel}>
            <img src={imagen} alt={`Imagen ${index + 1}`} className={styles.image} />
          </label>
        </div>
      ))}
    </div>
  ) : (
    <p>No hay imágenes seleccionadas.</p>
  )}
</div>
 {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.button}>Actualizar Cotización</button>

        {Cotizacion?.estado === "Aprobado" && (
          <button
            type="button"
            className={styles.button}
            onClick={() => {
              handleGeneratePDF(Cotizacion); // Llamada a la función de generación de PDF
              setShowGeneratePropasar(true); // Activa la visibilidad de GenerateProposal
            }}
          >
            Generar Cotización en PDF
          </button>
        )}
        <label className={styles.generarCotizacion}>
          {showGeneratePropasar && <GenerateProposal proposalData={Cotizacion} />}
        </label>
      </form>
    </div>
  );
};

export default AprobarCotizacionForm;
