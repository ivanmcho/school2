import { handleActions } from "redux-actions";
import { createReducer } from "../baseReducer/baseReducer";
import { api } from "api";
import { initialize as initializeForm } from "redux-form";
import { NotificationManager } from "react-notifications";
import { push } from "react-router-redux/lib/actions";


const baseReducer = createReducer(
    "grado", //identificador dentro del store.
    "grado", //endpoint donde realizará las peticiones.
    "GradoForm", //Nombre del formulario.
    "/grado" //url del componente en el frontend.
);


const leerGrado = id => (dispatch) => {
    api.get(`grado/${id}`).then((response) => {
        console.log(response)
        response.nivel = {value:response.nivel.id, label: response.nivel.nombre}        
        dispatch(initializeForm("GradoForm", response));
    }).catch(() => {
    }).finally(() => {
    });
};

const crearGrado = (data) => (dispatch) => {
    console.log("Data del formulario", data);
    const formData = {
        nivel: data.nivel.value,
        nombre: data.nombre,
        descripcion: data.descripcion,
    }
    api.post("grado", formData)
        .then(() => {
            NotificationManager.success('Registro creado', 'Éxito', 3000);
            dispatch(push("/grado"))
        })
        .catch((error) => {})
        .finally(() => {});
};


const editarGrado = (id, data) => (dispatch) => {
    const formData = {
        nivel: data.nivel.value,
        nombre: data.nombre,
        descripcion: data.descripcion,
    }

    api.put(`grado/${id}`, formData).then(() => {
        NotificationManager.success('Registro actualizado', 'Éxito', 3000);
    }).catch(() => {
        NotificationManager.error('Error en la edición', 'ERROR', 0);
    }).finally(() => {
        
    });
};


export const reducers = {
    ...baseReducer.reducers,

};

export const actions = {

    crearGrado,
    leerGrado,
    editarGrado,
    ...baseReducer.actions,
};

export const initialState = {
    ...baseReducer.initialState,
};

export default handleActions(reducers, initialState);
