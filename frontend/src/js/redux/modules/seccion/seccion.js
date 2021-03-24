import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";

// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "seccion", //identificador dentro del store.
    "seccion", //endpoint donde realizará las peticiones.
    "SeccionForm", //Nombre del formulario.
    "/secciones", //url del componente en el frontend.
);

export default handleActions(reducers, initialState);