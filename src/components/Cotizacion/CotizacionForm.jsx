import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postCotizacion } from "../../Redux/Actions"; 
import UploadImages from "../SubirImagenesCloudonary/UploadImages";
import styles from "./CotizacionForm.module.css";

const CotizacionForm = () => {
  const dispatch = useDispatch();
  const { nombre, apellidos, email } = useSelector((state) => state.UserProfileByEmail);
  const urlImagen = useSelector((state) => state.urlimagen);

  const initialState = {
    NombredeCliente: "",
    CompañiadelCliente: "",
    DirecciondelCliente: "",
    CelulardelCliente: "",
    EmaildelCliente: "",
    DetalledelServicio: "",
    monto: "",
    date: "",
    referencia: "",
    objetivo: "",
    LugardeEjecucion: "",
    Plazodeejecucion: "",
    CiudaddelCliente: "",
    imagenes: [],
  };

  // Primero intentamos cargar los datos desde el localStorage
  const savedData = localStorage.getItem("proposalForm");
  const [formData, setFormData] = useState(savedData ? JSON.parse(savedData) : initialState);

  const [error, setError] = useState(""); 

  // Guardamos los datos en el localStorage cada vez que cambian
  useEffect(() => {
    if (formData !== initialState) {
      localStorage.setItem("proposalForm", JSON.stringify(formData));
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (urlImagen.length === 0) {
      setError("Debe seleccionar al menos una imagen.");
      return; 
    }

    setError("");

    const formattedData = {
      ...formData,
      NombreEmpleado: nombre || "", 
      ApellidoEmpleado: apellidos || "", 
      EmailEmpledado: email || "",
      estado: "Pendiente",
      imagenes: urlImagen?.map((img) => img?.secure_url) || [], 
    };

    // Enviar los datos a la acción Redux
    dispatch(postCotizacion(formattedData));

    // Limpiar el formulario y eliminar los datos del localStorage después de enviar el formulario
    setFormData(initialState);
    localStorage.removeItem("proposalForm");
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.row}>
          <label className={styles.label}>Fecha:
            <input type="date" name="date" value={formData.date} onChange={handleChange} required className={styles.input} />
          </label>
        </div>
        <label className={styles.label}>Nombre Empresa:
          <input type="text" name="CompañiadelCliente" value={formData.CompañiadelCliente} onChange={handleChange} required className={styles.input} />
        </label>
        <label className={styles.label}>Nombre del Representante Legal:
          <input type="text" name="NombredeCliente" value={formData.NombredeCliente} onChange={handleChange} required className={styles.input} />
        </label>
        <label className={styles.label}>Dirección del Cliente:
          <input type="text" name="DirecciondelCliente" value={formData.DirecciondelCliente} onChange={handleChange} required className={styles.input} />
        </label>
        <label className={styles.label}>Celular del Cliente:
          <input type="number" name="CelulardelCliente" value={formData.CelulardelCliente} onChange={handleChange} required className={styles.input} />
        </label>
        <label className={styles.label}>Correo del Cliente:
          <input type="email" name="EmaildelCliente" value={formData.EmaildelCliente} onChange={handleChange} required className={styles.input} />
        </label>
        <label className={styles.label}>Ciudad del Cliente:
          <input type="text" name="CiudaddelCliente" value={formData.CiudaddelCliente} onChange={handleChange} required className={styles.input} />
        </label>
        <label className={styles.label}>Referencia:
          <textarea name="referencia" value={formData.referencia} onChange={handleChange} required className={styles.input} />
        </label>
        <label className={styles.label}>Objetivo de la Propuesta:
          <textarea name="objetivo" value={formData.objetivo} onChange={handleChange} required className={styles.textarea} />
        </label>
        <label className={styles.label}>Actividades a Desarrollar:
          <textarea name="DetalledelServicio" value={formData.DetalledelServicio} onChange={handleChange} required className={styles.textarea} />
        </label>
        <label className={styles.label}>Lugar de Ejecucion:
          <textarea name="LugardeEjecucion" value={formData.CompañiadelCliente} onChange={handleChange} required className={styles.textarea} />
        </label>
        <label className={styles.label}>Plazo de Ejecución:
          <textarea name="Plazodeejecucion" value={formData.Plazodeejecucion} onChange={handleChange} required className={styles.textarea} />
        </label>
        <label className={styles.label}>Valor:
          <input name="monto" type="number" value={formData.monto} onChange={handleChange} required className={styles.input} />
        </label>
        <label>
          <UploadImages />
        </label>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.button}>Generar Cotización</button>
      </form>
    </div>
  );
};

export default CotizacionForm;
