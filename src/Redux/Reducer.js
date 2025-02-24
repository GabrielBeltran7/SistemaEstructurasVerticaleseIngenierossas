import {
  GET_ALLUSER,
  GET_USER_BY_EMAIL,
  RESET_STATE,
  GET_ALL_COTIZACION,
  POTS_URL_IMAGEN,
  UPDATE_COTIZACION_SUCCESS,
  GET_COTIZACION_SUCCESS,
  RESET_REPORT_COTIZACIONES, // <-- Importar la nueva acción
  GET_IMAGENES__PRESTABLECIDASCOTIZACION
} from "./ActionsTypes";

let inicialState = {
  allUsers: [],
  UserProfileByEmail: [],
  urlimagen: [],
  reportecotizaciones: [],
  updatedDataCotizacion: [],
  cotizacionNumero: [],
  imagenesprestablecidas:[]
};

const rootReducer = (state = inicialState, action) => {
  switch (action.type) {
    case RESET_STATE:
      return inicialState;


 case GET_IMAGENES__PRESTABLECIDASCOTIZACION:
        return {
          ...state,
          imagenesprestablecidas: action.payload, // Se vacía el estado temporalmente
        };


    case RESET_REPORT_COTIZACIONES:
      return {
        ...state,
        reportecotizaciones: [], // Se vacía el estado temporalmente
      };

    case GET_COTIZACION_SUCCESS:
      return {
        ...state,
        cotizacionNumero: action.payload,
      };

    case UPDATE_COTIZACION_SUCCESS:
      return {
        ...state,
        updatedDataCotizacion: action.payload,
      };

    case GET_ALLUSER:
      return {
        ...state,
        allUsers: action.payload,
      };

    case GET_ALL_COTIZACION:
      return {
        ...state,
        reportecotizaciones: action.payload,
      };

    case GET_USER_BY_EMAIL:
      return {
        ...state,
        UserProfileByEmail: action.payload,
      };

    case POTS_URL_IMAGEN:
      return {
        ...state,
        urlimagen: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
