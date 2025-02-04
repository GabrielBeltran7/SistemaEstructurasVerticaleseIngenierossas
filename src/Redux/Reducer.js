import {
  GET_ALLUSER,
  GET_USER_BY_EMAIL,
  RESET_STATE,
  GET_ALL_COTIZACION,
  POTS_URL_IMAGEN,
} from "./ActionsTypes";
let inicialState = {
  allUsers: [],
  UserProfileByEmail: [],
  allOffering: [],
  urlimagen: [],
  reportecotizaciones: [],
};
const rootReducer = (state = inicialState, action) => {
  switch (action.type) {
    case RESET_STATE:
      return inicialState;

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
