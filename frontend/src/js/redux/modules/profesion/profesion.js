import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";

// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "profesion", //identificador dentro del store.
    "profesion", //endpoint donde realizará las peticiones.
    "ProfesionForm", //Nombre del formulario.
    "/profesiones", //url del componente en el frontend.
);

export default handleActions(reducers, initialState);