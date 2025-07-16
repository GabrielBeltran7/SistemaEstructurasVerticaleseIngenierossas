import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postCotizacion, getImagenesPreestablecidasCotizacion } from "../../Redux/Actions"; 
import UploadImages from "../SubirImagenesCloudonary/UploadImages";
import styles from "./CotizacionForm.module.css";

const CotizacionForm = () => {
  const dispatch = useDispatch();
  const imagenesprestablecidas = useSelector((state) => state.imagenesprestablecidas);
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

  const savedData = localStorage.getItem("proposalForm");
  const [formData, setFormData] = useState(savedData ? JSON.parse(savedData) : initialState);
  const [error, setError] = useState(""); 
  const [usarImagenesPreestablecidas, setUsarImagenesPreestablecidas] = useState(false);
  const [reciboZonasComunes, setReciboZonasComunes] = useState(false);

  useEffect(() => {
    dispatch(getImagenesPreestablecidasCotizacion());
  }, [dispatch]);

  useEffect(() => {
    if (formData !== initialState) {
      localStorage.setItem("proposalForm", JSON.stringify(formData));
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      if (name === "CompañiadelCliente") {
        return {
          ...prevData,
          CompañiadelCliente: value,
          LugardeEjecucion: value,
        };
      }
      return { ...prevData, [name]: value };
    });
  };

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setUsarImagenesPreestablecidas(checked);
    if (checked) {
      dispatch({ type: "LIMPIAR_IMAGENES_MANUALES" });
    }
  };

  const handleReciboCheckboxChange = (e) => {
    const checked = e.target.checked;
    setReciboZonasComunes(checked);

    if (checked) {
      setFormData((prevData) => ({
        ...prevData,
        referencia: "Acompañamiento Entrega Areas COmunez",
        objetivo: "Acompañamiento Entrega de Áreas Comunes Teniendo en cuenta normatividad vigente.",
        DetalledelServicio: `Acompañamiento legal especializado en propiedad horizontal para recibir áreas comunes y revisión de normatividad de ley 675 de 2001  
Revisión de planos estructurales arquitectónicos y estudio de suelos
Revisión de cumplimiento de la norma nsr10 en los diseños estructurales
Comparativo de licencia de construcción con entrega física final
Evaluación de equipos esenciales 
Evaluación de estado de áreas comunales 
Revisión de malos procesos constructivos 
Evaluación y pruebas fiscas de red contra incendio y cumplimiento de norma 
Entrega de informes técnicos con evidencia fotográfica y justificación sobre los hallazgos
Entrega de garantías de equipos y archivo del mismo inventariado.
Acompañamiento a la administración y consejo de administración hasta la entrega final de la propiedad horizontal.`,
        Plazodeejecucion: "30 dias",
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        referencia: "",
        objetivo: "",
        DetalledelServicio: "",
        Plazodeejecucion: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let imagenesSeleccionadas = [];

    if (usarImagenesPreestablecidas) {
      imagenesSeleccionadas = imagenesprestablecidas;
    } else {
      imagenesSeleccionadas = urlImagen?.map((img) => img?.secure_url) || [];
    }

    if (imagenesSeleccionadas.length < 3) {
      setError("Debe seleccionar al menos 3 imagenes.");
      return;
    }

    setError("");

    const formattedData = {
      ...formData,
      NombreEmpleado: nombre || "", 
      ApellidoEmpleado: apellidos || "", 
      EmailEmpledado: email || "",
      estado: "Pendiente",
      imagenes: imagenesSeleccionadas,
    };

    dispatch(postCotizacion(formattedData));
    setFormData(initialState);
    localStorage.removeItem("proposalForm");
    setReciboZonasComunes(false);
    setUsarImagenesPreestablecidas(false);
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
          {/* Checkbox Recibo Zonas Comunes */}
        <div className={styles.checkboxContainer}>
          <input 
            type="checkbox" 
            id="reciboZonasComunes" 
            checked={reciboZonasComunes} 
            onChange={handleReciboCheckboxChange}
          />
          <label htmlFor="reciboZonasComunes" className={styles.checkboxLabel}>
            Recibo de zonas comunes
          </label>
        </div>

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
          <textarea name="LugardeEjecucion" value={formData.LugardeEjecucion} onChange={handleChange} required className={styles.textarea} disabled />
        </label>
        <label className={styles.label}>Plazo de Ejecución:
          <textarea name="Plazodeejecucion" value={formData.Plazodeejecucion} onChange={handleChange} required className={styles.textarea} />
        </label>
        <label className={styles.label}>Valor:
          <input name="monto" type="number" value={formData.monto} onChange={handleChange} required className={styles.input} />
        </label>

      
        {/* Checkbox Imágenes Preestablecidas */}
        <div className={styles.checkboxContainer}>
          <input 
            type="checkbox" 
            id="usarPreestablecidas" 
            checked={usarImagenesPreestablecidas} 
            onChange={handleCheckboxChange} 
          />
          <label htmlFor="usarPreestablecidas" className={styles.checkboxLabel}>
            Usar imágenes preestablecidas
          </label>
        </div>

        {/* Upload manual si no usa imágenes preestablecidas */}
        {!usarImagenesPreestablecidas && (
          <label>
            <UploadImages />
          </label>
        )}

        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.button}>Generar Cotización</button>
      </form>
    </div>
  );
};

export default CotizacionForm;

