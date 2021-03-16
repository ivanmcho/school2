import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";

// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "rol", //identificador dentro del store.
    "rol", //endpoint donde realizará las peticiones.
    "RolForm", //Nombre del formulario.
    "/rol", //url del componente en el frontend.
);

export default handleActions(reducers, initialState);