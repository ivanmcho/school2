import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";

// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "nivel", //identificador dentro del store.
    "nivel", //endpoint donde realizará las peticiones.
    "NivelForm", //Nombre del formulario.
    "/nivel", //url del componente en el frontend.
);

export default handleActions(reducers, initialState);