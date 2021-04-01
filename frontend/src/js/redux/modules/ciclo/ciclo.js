import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";

// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "ciclo", //identificador dentro del store.
    "ciclo", //endpoint donde realizará las peticiones.
    "CicloForm", //Nombre del formulario.
    "/ciclos", //url del componente en el frontend.
);

export default handleActions(reducers, initialState);