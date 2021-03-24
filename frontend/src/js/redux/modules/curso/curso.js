import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";

// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "curso", //identificador dentro del store.
    "curso", //endpoint donde realizará las peticiones.
    "CursoForm", //Nombre del formulario.
    "/cursos", //url del componente en el frontend.
);

export default handleActions(reducers, initialState);