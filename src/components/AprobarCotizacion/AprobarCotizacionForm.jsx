import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCotizacion, getCotizacionByNumero } from "../../Redux/Actions";
import styles from "./AprobarCotizacionForm.module.css";
import { useParams } from "react-router-dom";

const AprobarCotizacionForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const Cotizacion = useSelector((state) => state.cotizacionNumero);

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

  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(getCotizacionByNumero(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (Cotizacion) {
      setFormData(Cotizacion);
    }
  }, [Cotizacion]);

  useEffect(() => {
    localStorage.setItem("proposalForm", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.imagenes.length === 0) {
      setError("Debe seleccionar al menos una imagen.");
      return;
    }
    setError("");
    dispatch(updateCotizacion(formData));
  };

  const fields = [
    { label: "Nombre Empresa", name: "CompañiadelCliente", required: true },
    { label: "Nombre del Representante Legal", name: "NombredeCliente", required: true },
    { label: "Dirección del Cliente", name: "DirecciondelCliente", required: true },
    { label: "Celular del Cliente", name: "CelulardelCliente", required: true, type: "number" },
    { label: "Correo del Cliente", name: "EmaildelCliente", required: true, type: "email" },
    { label: "Ciudad del Cliente", name: "CiudaddelCliente", required: true },
    { label: "Referencia", name: "referencia", required: true },
    { label: "Objetivo de la Propuesta", name: "objetivo", required: true, type: "textarea" },
    { label: "Actividades a Desarrollar", name: "DetalledelServicio", required: false, type: "textarea" },
    { label: "Lugar de Ejecución", name: "LugardeEjecucion", required: true, type: "textarea" },
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

        {/* Sección para mostrar imágenes */}
        <div className={styles.imageContainer}>
          <h1 className={styles.laberestadocotizacion}>Imágenes Preaprobadas</h1>
          {formData.imagenes && formData.imagenes.length > 0 ? (
            <div className={styles.imageGrid}>
              {formData.imagenes.map((imagen, index) => (
                <div key={index} className={styles.imageItem}>
                  <img src={imagen} alt={`Imagen ${index + 1}`} className={styles.image} />
                </div>
              ))}
            </div>
          ) : (
            <p>No hay imágenes seleccionadas.</p>
          )}
        </div>

        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.button}>Actualizar Cotización</button>
      </form>
    </div>
  );
};

export default AprobarCotizacionForm;



