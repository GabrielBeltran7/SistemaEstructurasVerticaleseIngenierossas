import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postCotizacion } from "../../Redux/Actions"; 
import UploadImages from "../SubirImagenesCloudonary/UploadImages";
import styles from "./CotizacionForm.module.css";

const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

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
    Tiempodeejecucion: "",
    Plazodeejecucion: "",
    CiudaddelCliente: "",
    imagenes: [],
    
  };

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("proposalForm");
    return savedData ? JSON.parse(savedData) : initialState;
  });

  const [error, setError] = useState(""); 

  useEffect(() => {
    localStorage.setItem("proposalForm", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const formatDate = (inputDate) => {
    if (!inputDate) return "";
    const fecha = new Date(inputDate);
    return `${fecha.getDate()} de ${months[fecha.getMonth()]} ${fecha.getFullYear()}`;
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
      date: formatDate(formData.date),
      NombreEmpleado: nombre || "", 
      ApellidoEmpleado: apellidos || "", 
      EmailEmpledado: email || "",
      estado: "pendiente",
      imagenes: urlImagen?.map((img) => img?.secure_url) || [], 
    };

    dispatch(postCotizacion(formattedData));
    
    // Limpiar formulario y localStorage después del envío exitoso
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
        <label className={styles.label}>Plazo de Ejecución:
          <textarea name="Tiempodeejecucion" value={formData.Tiempodeejecucion} onChange={handleChange} required className={styles.textarea} />
        </label>
        <label className={styles.label}>Lugar de Ejecución:
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




// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { postCotizacion } from "../../Redux/Actions"; 
// import UploadImages from "../SubirImagenesCloudonary/UploadImages";
// import styles from "./CotizacionForm.module.css";

// // Constants for months
// const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

// const CotizacionForm = () => {
//   const dispatch = useDispatch();
//   const { nombre, apellidos, email } = useSelector((state) => state.UserProfileByEmail);
//   const urlImagen = useSelector((state) => state.urlimagen);

//   const initialState = {
//     MombredeCliente: "",
//     CompañiadelCliente: "",
//     DirecciondelCliente: "",
//     CelulardelCliente: "",
//     EmaildelCliente: "",
//     DetalledelServicio: "",
//     monto: "",
//     date: "",
//     referencia: "",
//     objetivo: "",
//     Tiempodeejecucion: "",
//     Plazodeejecucion: "",
//     CiudaddelCliente: "",
//     imagenes: [] // Store images in an array
//   };

//   const [formData, setFormData] = useState(initialState);
//   const [error, setError] = useState(""); // State for error messages

//   useEffect(() => {
//     if (formData) {
//       localStorage.setItem("proposalForm", JSON.stringify(formData));
//     }
//   }, [formData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const formatDate = (inputDate) => {
//     if (!inputDate) return "";
//     const fecha = new Date(inputDate);
//     return `${fecha.getDate()} de ${months[fecha.getMonth()]} ${fecha.getFullYear()}`;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (urlImagen.length === 0) {
//       setError("Debe seleccionar al menos una imagen.");
//       return; // Prevent form submission if no image is selected
//     }

//     setError(""); // Reset the error message if images are selected

//     const formattedData = {
//       ...formData,
//       date: formatDate(formData.date),
//       NombreEmpleado: nombre || "", 
//       ApellidoEmpleado: apellidos || "", 
//       EmailEmpledado: email || "",
//       imagenes: urlImagen?.map((img) => img?.secure_url) || [], // Map over images to simplify
//     };

//     dispatch(postCotizacion(formattedData));
//     setFormData(initialState);
//     localStorage.removeItem("proposalForm");
//   };

//   return (
//     <div className={styles.container}>
//       <form onSubmit={handleSubmit} className={styles.form}>
//         <div className={styles.row}>
//           <label className={styles.label}>Fecha:
//             <input type="date" name="date" value={formData.date} onChange={handleChange} required className={styles.input} />
//           </label>
//         </div>
//         <label className={styles.label}>Nombre Empresa:
//           <input type="text" name="CompañiadelCliente" value={formData.CompañiadelCliente} onChange={handleChange} required className={styles.input} />
//         </label>
//         <label className={styles.label}>Nombre del Representante Legal:
//           <input type="text" name="MombredeCliente" value={formData.MombredeCliente} onChange={handleChange} required className={styles.input} />
//         </label>
//         <label className={styles.label}>Dirección del Cliente:
//           <input type="text" name="DirecciondelCliente" value={formData.DirecciondelCliente} onChange={handleChange} required className={styles.input} />
//         </label>
//         <label className={styles.label}>Celular del Cliente:
//           <input type="number" name="CelulardelCliente" value={formData.CelulardelCliente} onChange={handleChange} required className={styles.input} />
//         </label>
//         <label className={styles.label}>Correo del Cliente:
//           <input type="email" name="EmaildelCliente" value={formData.EmaildelCliente} onChange={handleChange} required className={styles.input} />
//         </label>
//         <label className={styles.label}>Ciudad del Cliente:
//           <input type="text" name="CiudaddelCliente" value={formData.CiudaddelCliente} onChange={handleChange} required className={styles.input} />
//         </label>
//         <label className={styles.label}>Referencia:
//           <textarea name="referencia" value={formData.referencia} onChange={handleChange} required className={styles.input} />
//         </label>
//         <label className={styles.label}>Objetivo de la Propuesta:
//           <textarea name="objetivo" value={formData.objetivo} onChange={handleChange} required className={styles.textarea} />
//         </label>
//         <label className={styles.label}>Actividades a Desarrollar:
//           <textarea name="DetalledelServicio" value={formData.DetalledelServicio} onChange={handleChange} required className={styles.textarea} />
//         </label>
//         <label className={styles.label}>Plazo de Ejecución:
//           <textarea name="Tiempodeejecucion" value={formData.Tiempodeejecucion} onChange={handleChange} required className={styles.textarea} />
//         </label>
//         <label className={styles.label}>Lugar de Ejecución:
//           <textarea name="Plazodeejecucion" value={formData.Plazodeejecucion} onChange={handleChange} required className={styles.textarea} />
//         </label>
//         <label className={styles.label}>Valor:
//           <input name="monto" type="number" value={formData.monto} onChange={handleChange} required className={styles.input} />
//         </label>
//         <label>
//           <UploadImages />
//         </label>
//         {error && <p className={styles.error}>{error}</p>} {/* Show error message */}
//         <button type="submit" className={styles.button}>Generar Cotización</button>
//       </form>
//     </div>
//   );
// };

// export default CotizacionForm;

