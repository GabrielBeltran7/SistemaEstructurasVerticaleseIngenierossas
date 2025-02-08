import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import styles from "./UploadImages.module.css";
import { imagenurl } from "../../Redux/Actions";

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

  const optimizeImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
  
          // Tamaño fijo para móviles (vertical)
          const maxWidth = 1080;
          const maxHeight = 1920;
  
          canvas.width = maxWidth;
          canvas.height = maxHeight;
          ctx.drawImage(img, 0, 0, maxWidth, maxHeight);
  
          let quality = 0.9; // Calidad inicial
          const targetSizeKB = 280; // Objetivo medio entre 250 KB y 300 KB
  
          const compressImage = (quality) =>
            new Promise((resolveQuality) => {
              canvas.toBlob(
                async (blob) => {
                  let fileSizeKB = blob.size / 1024; // Convertir bytes a KB
  
                  // Reducir calidad si el archivo es muy grande
                  while (fileSizeKB > 300 && quality > 0.3) {
                    quality -= 0.05; // Reducir calidad en intervalos de 5%
                    const newBlob = await new Promise((res) =>
                      canvas.toBlob(res, "image/jpeg", quality)
                    );
                    fileSizeKB = newBlob.size / 1024;
                    blob = newBlob;
                  }
  
                  // Aumentar calidad si el archivo es muy pequeño
                  while (fileSizeKB < 250 && quality < 0.95) {
                    quality += 0.02; // Aumentar calidad en intervalos de 2%
                    const newBlob = await new Promise((res) =>
                      canvas.toBlob(res, "image/jpeg", quality)
                    );
                    fileSizeKB = newBlob.size / 1024;
                    blob = newBlob;
                  }
  
                  resolveQuality(new File([blob], file.name, { type: "image/jpeg" }));
                },
                "image/jpeg",
                quality
              );
            });
  
          compressImage(quality).then(resolve);
        };
      };
    });
  };
  
  const handleUpload = async (event) => {
    event.preventDefault();
    setUploading(true);

    const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dnigz3zfp/image/upload";
    const uploadPreset = "upload_unsigned";

    try {
      // Optimizar todas las imágenes antes de subirlas
      const optimizedImages = await Promise.all(images.map(optimizeImage));

      const uploadPromises = optimizedImages.map(async (image) => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", uploadPreset);

        const response = await fetch(cloudinaryUrl, {
          method: "POST",
          body: formData,
        });

        return response.json();
      });

      const results = await Promise.all(uploadPromises);

      uploadImagesAndDispatch(results);
    } catch (error) {
      console.error("Error al subir imágenes", error);
      alert("Error al subir las imágenes. Por favor intenta de nuevo.");
    } finally {
      setUploading(false);
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
        <h2 className={styles.cardTitle}>Subir un Máximo de 8 Imágenes</h2>
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
