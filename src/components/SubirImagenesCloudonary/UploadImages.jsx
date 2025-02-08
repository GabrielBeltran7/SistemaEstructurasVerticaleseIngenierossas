

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import styles from "./UploadImages.module.css";
import { imagenurl } from "../../Redux/Actions";
import Compressor from "compressorjs";

const UploadImages = () => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const totalImages = files.length + images.length;

    if (totalImages > 8) {
      alert("Solo puedes subir hasta 8 imágenes.");
      return;
    }

    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleRemoveAllImages = async () => {
    if (images.length === 0) return;

    const result = await Swal.fire({
      icon: "warning",
      title: "¿Estás seguro?",
      text: "Esto eliminará todas las imágenes seleccionadas.",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      setImages([]);
      Swal.fire({
        icon: "success",
        title: "Imágenes eliminadas con éxito",
        timerProgressBar: true,
        timer: 2500,
      });
    }
  };

  const uploadImagesAndDispatch = async (uploadedImages) => {
    dispatch(imagenurl(uploadedImages));
    Swal.fire({
      icon: "success",
      title: "Imágenes guardadas en la base de datos. Exitosamente",
      timerProgressBar: true,
      timer: 3000,
    });
    setImages([]);
  };




  const handleUpload = async (event) => {
    event.preventDefault();
    setUploading(true);
  
    const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dnigz3zfp/image/upload";
    const uploadPreset = "upload_unsigned";
  
    try {
      const uploadPromises = images.map((image) => {
        return new Promise((resolve, reject) => {
          new Compressor(image, {
            quality: 0.8, // Reducir calidad
            convertSize: 500000, // Convertir si es mayor a 500KB
            success(compressedImage) {
              const formData = new FormData();
              formData.append("file", compressedImage);
              formData.append("upload_preset", uploadPreset);
            fetch(cloudinaryUrl, {
                method: "POST",
                body: formData,
              })
                .then((response) => response.json())
                .then(resolve)
                .catch(reject);
            },
            error(err) {
              reject(err);
            },
          });
        });
      });
  
      const results = await Promise.all(uploadPromises);
      console.log("formato de imagenes", results)
  
      uploadImagesAndDispatch(results);
    } catch (error) {
      console.error("Error al subir imágenes", error);
      alert("Error al subir las imágenes. Por favor intenta de nuevo.");
    } finally {
      setUploading(false);
    }
  };
  

  const CustomButton = ({ onClick, disabled, children }) => (
    <button
      onClick={(event) => {
        event.preventDefault();
        onClick(event);
      }}
      disabled={disabled}
      className={styles.button}
    >
      {children}
    </button>
  );



  return (
    <Card className={styles.cardContainer}>
      <CardContent>
        <h2 className={styles.cardTitle}>Subir un Maximo de 8 Imágenes</h2>
        <div className={styles.inputContainer}>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className={styles.fileInput}
          />
          <span className={styles.buttoneliminarimagenes}>
            {images.length} {images.length === 1 ? "imagen" : "imágenes"} seleccionadas
          </span>
        </div>
        <div className={styles.imageGrid}>
          {images.map((image, index) => (
            <div key={index} className={styles.imagePreview}>
              <img
                src={URL.createObjectURL(image)}
                alt={`preview-${index}`}
                className={styles.image}
              />
              <button
                className={styles.removeButton}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  handleRemoveImage(index);
                }}
              >
                X
              </button>
            </div>
          ))}
        </div>
        <div className={styles.buttonGroup}>
          <CustomButton onClick={handleUpload} disabled={uploading || images.length === 0}>
            {uploading ? "Subiendo..." : "Guardar Imágenes en la Base de Datos"}
          </CustomButton>
          <CustomButton onClick={handleRemoveAllImages} disabled={images.length === 0}>
            Eliminar Todas las Imágenes
          </CustomButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default UploadImages;






// import React, { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { useDispatch } from "react-redux";
// import Swal from "sweetalert2";
// import styles from "./UploadImages.module.css";
// import { imagenurl } from "../../Redux/Actions";

// const UploadImages = () => {
//   const [images, setImages] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   const dispatch = useDispatch();

//   const handleImageChange = (event) => {
//     const files = Array.from(event.target.files);
//     const totalImages = files.length + images.length;

//     if (totalImages > 8) {
//       alert("Solo puedes subir hasta 8 imágenes.");
//       return;
//     }

//     setImages((prevImages) => [...prevImages, ...files]);
//   };

//   const handleRemoveImage = (index) => {
//     setImages((prevImages) => prevImages.filter((_, i) => i !== index));
//   };

//   const handleRemoveAllImages = async () => {
//     if (images.length === 0) return;

//     const result = await Swal.fire({
//       icon: "warning",
//       title: "¿Estás seguro?",
//       text: "Esto eliminará todas las imágenes seleccionadas.",
//       showCancelButton: true,
//       confirmButtonText: "Sí, eliminar",
//       cancelButtonText: "Cancelar",
//     });

//     if (result.isConfirmed) {
//       setImages([]);
//       Swal.fire({
//         icon: "success",
//         title: "Imágenes eliminadas con éxito",
//         timerProgressBar: true,
//         timer: 2500,
//       });
//     }
//   };

//   const uploadImagesAndDispatch = async (uploadedImages) => {
//     dispatch(imagenurl(uploadedImages));
//     Swal.fire({
//       icon: "success",
//       title: "Imágenes guardadas en la base de datos. Exitosamente",
//       timerProgressBar: true,
//       timer: 3000,
//     });
//     setImages([]);
//   };

//   const handleUpload = async (event) => {
//     event.preventDefault();
//     setUploading(true);

//     const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dnigz3zfp/image/upload";
//     const uploadPreset = "upload_unsigned";

//     try {
//       const uploadPromises = images.map(async (image) => {
//         const formData = new FormData();
//         formData.append("file", image);
//         formData.append("upload_preset", uploadPreset);

//         const response = await fetch(cloudinaryUrl, {
//           method: "POST",
//           body: formData,
//         });

//         return response.json();
//       });

//       const results = await Promise.all(uploadPromises);
   

//       // Llama a la función para despachar
//       uploadImagesAndDispatch(results);
//     } catch (error) {
//       console.error("Error al subir imágenes", error);
//       alert("Error al subir las imágenes. Por favor intenta de nuevo.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const CustomButton = ({ onClick, disabled, children }) => (
//     <button
//       onClick={(event) => {
//         event.preventDefault();
//         onClick(event);
//       }}
//       disabled={disabled}
//       className={styles.button}
//     >
//       {children}
//     </button>
//   );

//   return (
//     <Card className={styles.cardContainer}>
//       <CardContent>
//         <h2 className={styles.cardTitle}>Subir un Maximo de 8 Imágenes</h2>
//         <div className={styles.inputContainer}>
//           <input
//             type="file"
//             multiple
//             accept="image/*"
//             onChange={handleImageChange}
//             className={styles.fileInput}
//           />
//           <span className={styles.buttoneliminarimagenes}>
//             {images.length} {images.length === 1 ? "imagen" : "imágenes"} seleccionadas
//           </span>
//         </div>
//         <div className={styles.imageGrid}>
//           {images.map((image, index) => (
//             <div key={index} className={styles.imagePreview}>
//               <img
//                 src={URL.createObjectURL(image)}
//                 alt={`preview-${index}`}
//                 className={styles.image}
//               />
//               <button
//                 className={styles.removeButton}
//                 onClick={(event) => {
//                   event.preventDefault();
//                   event.stopPropagation();
//                   handleRemoveImage(index);
//                 }}
//               >
//                 X
//               </button>
//             </div>
//           ))}
//         </div>
//         <div className={styles.buttonGroup}>
//           <CustomButton onClick={handleUpload} disabled={uploading || images.length === 0}>
//             {uploading ? "Subiendo..." : "Guardar Imágenes en la Base de Datos"}
//           </CustomButton>
//           <CustomButton onClick={handleRemoveAllImages} disabled={images.length === 0}>
//             Eliminar Todas las Imágenes
//           </CustomButton>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default UploadImages;

