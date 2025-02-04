import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import rootReducer from "./Reducer.js";
import {thunk} from "redux-thunk";

export const store = createStore(
  rootReducer,
  composeWithDevTools(  // Usando composeWithDevTools para habilitar DevTools
    applyMiddleware(thunk)  // Aplicar middleware de thunk
  )
);
