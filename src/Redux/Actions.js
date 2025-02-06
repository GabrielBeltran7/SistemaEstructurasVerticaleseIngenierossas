/* eslint-disable no-unused-vars */
import { GET_ALLUSER, GET_USER_BY_EMAIL, GET_ALL_COTIZACION, GET_COTIZACION_SUCCESS, POTS_URL_IMAGEN, UPDATE_COTIZACION_SUCCESS} from "./ActionsTypes";
import { db } from "../../api/firebase/FirebaseConfig/FirebaseConfig";
import { addDoc, collection, getDocs, updateDoc, doc, query, limit, where, orderBy, runTransaction  } from 'firebase/firestore';
import Swal from "sweetalert2";






export const getCotizacionByNumero = (id) => {

  return async (dispatch) => {
    try {
      if (!id) {
        throw new Error("El número de cotización es obligatorio.");
      }

      // Crear la consulta para buscar la cotización por el campo Numerocotizacion
      const cotizacionesRef = collection(db, "Cotizacion");
      const q = query(cotizacionesRef, where("Numerocotizacion", "==", Number(id)));

      // Obtener los documentos que coinciden con la consulta
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("No se encontró la cotización con ese número.");
      }

      // Obtener los datos del primer documento encontrado (suponiendo que Numerocotizacion es único)
      const cotizacionNumero = querySnapshot.docs[0].data();


      // Opcional: Puedes despachar una acción para almacenar los datos en el estado global si usas Redux
      dispatch({
        type: GET_COTIZACION_SUCCESS,
        payload: cotizacionNumero,
      });

    } catch (error) {
      console.error("Error al obtener la cotización:", error);

      // Mostrar un mensaje de error (puedes usar SweetAlert, Toasts, etc.)
      Swal.fire({
        icon: "error",
        title: "Error al obtener la cotización",
        text: error.message,
        timerProgressBar: true,
        timer: 3500,
      });
    }
  };
};

export const updateCotizacion = (cotizacion) => {
  return async (dispatch) => {
    try {
      if (!cotizacion.Numerocotizacion) {
        throw new Error("El ID de la cotización es obligatorio.");
      }

      // Asegurarse de que Numerocotizacion sea un número
      const numeroCotizacion = Number(cotizacion.Numerocotizacion);
      if (isNaN(numeroCotizacion)) {
        throw new Error("El ID de la cotización debe ser un número válido.");
      }

      console.log("Validando actualización en updateCotizacion:", cotizacion);

      // Realizar una consulta para buscar el documento usando Numerocotizacion
      const cotizacionRef = collection(db, "Cotizacion");
      const q = query(cotizacionRef, where("Numerocotizacion", "==", numeroCotizacion));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Si encontramos el documento, actualizamos
        const docRef = querySnapshot.docs[0].ref;
        const updatedDataCotizacion = {
          NombredeCliente: cotizacion.NombredeCliente,
          CompañiadelCliente: cotizacion.CompañiadelCliente,
          DirecciondelCliente: cotizacion.DirecciondelCliente,
          CelulardelCliente: cotizacion.CelulardelCliente,
          EmaildelCliente: cotizacion.EmaildelCliente,
          DetalledelServicio: cotizacion.DetalledelServicio,
          monto: cotizacion.monto,
          date: cotizacion.date,
          referencia: cotizacion.referencia,
          objetivo: cotizacion.objetivo,
          LugardeEjecucion: cotizacion.LugardeEjecucion,
          Plazodeejecucion: cotizacion.Plazodeejecucion,
          CiudaddelCliente: cotizacion.CiudaddelCliente,
          estado: cotizacion.estado,
          imagenes: cotizacion.imagenes || [],
        };

        // Actualizamos el documento encontrado
        await updateDoc(docRef, updatedDataCotizacion);

        Swal.fire({
          icon: "success",
          title: "Cotización actualizada con éxito",
          timerProgressBar: true,
          timer: 2000,
        });
        getReportCotizaciones()
       
      } else {
        // Si no encontramos el documento con el Numerocotizacion proporcionado
        throw new Error("No se encontró la cotización con el número proporcionado.");
      }

    } catch (error) {
      console.error("Error al actualizar la cotización:", error);

      Swal.fire({
        icon: "error",
        title: "Error al actualizar la cotización",
        text: error.message,
        timerProgressBar: true,
        timer: 3500,
      });
    }
  };
};




export const apdateStateUser = (inputs) => {

 
  return async (dispatch) => {
    try {
      const userCollection = collection(db, 'user');
      const userDocRef = doc(userCollection, inputs.id);

      // Crear un objeto con los datos actualizados
      const updatedData = {
        id: inputs.id,
        user: inputs.user,
      };

      // Actualizar el documento con los datos actualizados
      await updateDoc(userDocRef, updatedData);

      Swal.fire({
        icon: 'success',
        title: 'Datos actualizados con éxito',
        timerProgressBar: true,
        timer: 2000,
      });
    } catch (error) {
      console.error('Error al actualizar los datos:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar los datos',
        timerProgressBar: true,
        timer: 3500,
      });
    }
  };
};
export const UpdateUserChangeState = (inputs) => {


  return async (dispatch) => {
    try {
      const userCollection = collection(db, 'user');
      const userDocRef = doc(userCollection, inputs.id);

      // Crear un objeto con los datos actualizados
      const updatedData = {
        id: inputs.id,
        estado: inputs.estado,
      };

      // Actualizar el documento con los datos actualizados
      await updateDoc(userDocRef, updatedData);

      Swal.fire({
        icon: 'success',
        title: 'Datos actualizados con éxito',
        timerProgressBar: true,
        timer: 2000,
      });
    } catch (error) {
      console.error('Error al actualizar los datos:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar los datos',
        timerProgressBar: true,
        timer: 3500,
      });
    }
  };
};


export const apdateRoluser = (inputs) => {


  return async (dispatch) => {
    try {
      const userCollection = collection(db, 'user');
      const userDocRef = doc(userCollection, inputs.id);

      // Crear un objeto con los datos actualizados
      const updatedData = {
        id: inputs.id,
        rol: inputs.rol,
      };
      // Actualizar el documento con los datos actualizados
      await updateDoc(userDocRef, updatedData);

      Swal.fire({
        icon: 'success',
        title: 'Datos actualizados con éxito',
        timerProgressBar: true,
        timer: 2000,
      });
    } catch (error) {
      console.error('Error al actualizar los datos:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar los datos',
        timerProgressBar: true,
        timer: 3500,
      });
    }
  };
};


export const getFilterporFecha = (inputfilter) => {
  
  return async (dispatch) => {
    try {
      const fechainicio = inputfilter.fechainicio
      const fechafin = inputfilter.fechafin
     
      const userCollection = collection(db, 'ofrendas');
 
      // Crea una consulta usando las fechas
      const dateFilter = query(
        userCollection,
        where('fechadeofrenda', '>=', fechainicio),
        where('fechadeofrenda', '<=', fechafin),
        limit(100)
      );

      const querySnapshot = await getDocs(dateFilter);

      const reportoffering = [];
      querySnapshot.forEach((doc) => {
        reportoffering.push({ id: doc.id, ...doc.data() });
      });
     if(reportoffering.length ===0){

      Swal.fire({
        icon: 'error',
        title: 'No ahi datos para mostrar en esta fecha',
        timerProgressBar: true,
        timer: 2000,
      });
     }

      dispatch({
        type: GET_OFFERING,
        payload: reportoffering,
      });
    } catch (error) {
      // Maneja los errores de manera adecuada, por ejemplo, puedes enviarlos a un servicio de registro de errores o mostrar un mensaje al usuario.
      console.error('Error fetching offering data:', error);
    }
  };
};


export const getReportCotizaciones = () => {
  return async (dispatch) => {
    try {
      const userCollection = collection(db, "Cotizacion");
      const q = query(userCollection, limit(100));
      const querySnapshot = await getDocs(q);
      
      // Inicializar el arreglo antes del loop
      const reportecotizaciones = [];

      querySnapshot.forEach((doc) => {
        reportecotizaciones.push({ id: doc.id, ...doc.data() });
      });


      dispatch({
        type: GET_ALL_COTIZACION,
        payload: reportecotizaciones,
      });
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      Swal.fire({
        icon: "error",
        title: "Error al obtener los datos",
        timerProgressBar: true,
        timer: 3500,
      });
    }
  };
};




export const postOfferings = (offerings) => {
 
  return async (dispatch) => {
    try {
      const userCollection = collection(db, 'ofrendas');
      const newDocRef = await addDoc(userCollection, offerings);
      Swal.fire({
        icon: 'success',
        title: 'Gracias por tu Ofrenda',
        timerProgressBar: true,
        timer: 3000,
      });
      
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar la Ofrenda',
        timerProgressBar: true,
        timer: 3500,
      });
    }
  };
};
export const updateProfile = (inputs) => {
  
  return async (dispatch) => {
    try {
      const userCollection = collection(db, 'user');
      const userDocRef = doc(userCollection, inputs.id);

      // Crear un objeto con los datos actualizados
      const updatedData = {
        nombre: inputs.nombre,
        apellidos: inputs.apellidos,
        fechaNacimiento: inputs.fechaNacimiento,
        fechaAfiliacion: inputs.fechaAfiliacion,
        educacion: inputs.educacion,
        numerotarjetaprofesional: inputs.numerotarjetaprofesional,
        cargo: inputs.cargo,
        ciudad: inputs.ciudad,
        departamento: inputs.departamento,
        email: inputs.email,
        telefono: inputs.telefono,
        direccion: inputs.direccion,
        adminupdate:inputs.adminupdate
   
      };

      // Actualizar el documento con los datos actualizados
      await updateDoc(userDocRef, updatedData);

      Swal.fire({
        icon: 'success',
        title: 'Datos actualizados con éxito',
        timerProgressBar: true,
        timer: 2000,
      });
    } catch (error) {
      console.error('Error al actualizar los datos:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar los datos',
        timerProgressBar: true,
        timer: 3500,
      });
    }
  };
};


export const getUserProfileByEmail = (email) => {

  return async (dispatch) => {
    try {
      const userCollection = collection(db, 'user');
      const querySnapshot = await getDocs(userCollection);
      const userProfileData = [];
      querySnapshot.forEach((doc) => {
        const userData = { id: doc.id, ...doc.data() };
    
        userProfileData.push(userData);
        if (userData.email === email) {
          dispatch({
            type: GET_USER_BY_EMAIL,
            payload: userData,
          });
        }
      });
   
    } catch (error) {
      // Manejar el error
      Swal.fire({
        icon: 'error',
        title: 'Error al obtener los datos',
        timerProgressBar: true,
        timer: 3500,
      });
    }
  };
};


export const imagenurl = (urlimagen) => {
 
  return async (dispatch) => {
    try {
      dispatch({
        type: POTS_URL_IMAGEN,
        payload: urlimagen,
      });

    } catch (error) {
      console.error(error);
    
    }
  };
};


export const postCotizacion = (cotizacion) => {

  return async (dispatch) => {
    try {
      const userCollection = collection(db, 'Cotizacion');
      
      // Aseguramos que monto sea un número
      cotizacion.monto = parseFloat(cotizacion.monto) || 0;  // Convertir monto a número (si no se puede convertir, lo dejamos en 0)
      
      // Iniciar una transacción
      await runTransaction(db, async (transaction) => {
        const lastCotizacionQuery = query(userCollection, orderBy("Numerocotizacion", "desc"), limit(1));
        const lastCotizacionSnapshot = await getDocs(lastCotizacionQuery);
        
        let nextCotizacionNumber = 1; // Valor predeterminado si no hay ninguna cotización

        if (!lastCotizacionSnapshot.empty) {
          const lastCotizacionDoc = lastCotizacionSnapshot.docs[0].data();
          nextCotizacionNumber = parseInt(lastCotizacionDoc.Numerocotizacion, 10) + 1;  // Asegurando que sea un número
        }

        // Asignar el nuevo número de cotización al objeto de cotización
        cotizacion.Numerocotizacion = nextCotizacionNumber;

        // Ahora guardamos la nueva cotización en la base de datos
        await addDoc(userCollection, cotizacion);
      });
     

      Swal.fire({
        icon: 'success',
        title: 'Cotización registrada con éxito',
        timerProgressBar: true,
        timer: 2500,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar la cotización, intenta nuevamente',
        timerProgressBar: true,
        timer: 3500,
      });
    }
  };
};


export const postProfile = (user) => {
 
  return async (dispatch) => {
    try {
      const userCollection = collection(db, 'user');
      
      // Verificar si el correo electrónico ya está registrado
      const emailQuery = query(userCollection, where('email', '==', user.email));
      const emailSnapshot = await getDocs(emailQuery);

      if (!emailSnapshot.empty) {
        // El correo electrónico ya está registrado
        Swal.fire({
          icon: 'error',
          title: 'Este correo electrónico ya está registrado',
          timerProgressBar: true,
          timer: 3500,
        });
        return; // No continuar con el registro
      }
      
      // Si el correo electrónico no está registrado, proceder con el registro
      const newDocRef = await addDoc(userCollection, user);
      Swal.fire({
        icon: 'success',
        title: 'Datos registrados con éxito',
        timerProgressBar: true,
        timer: 2000,
      });

    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar los datos',
        timerProgressBar: true,
        timer: 3500,
      });
    }
  };
};




export const getUserProfile = () => {
  return async (dispatch) => {
    try {
      const userCollection = collection(db, 'user');
      const querySnapshot = await getDocs(userCollection);

      const userProfileData = [];
      querySnapshot.forEach((doc) => {
        userProfileData.push({ id: doc.id, ...doc.data() });
      });

      dispatch({
        type: GET_ALLUSER,
        payload: userProfileData,
      });

  
    } catch (error) {
   
    }
  };
};










































