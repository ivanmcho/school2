import { handleActions } from "redux-actions";
import { createReducer } from "../baseReducer/baseReducer";
import { api } from "api";
import { initialize as initializeForm } from "redux-form";
import { NotificationManager } from "react-notifications";
import { push } from "react-router-redux/lib/actions";


const baseReducer = createReducer(
    "servicio", //identificador dentro del store.
    "servicio", //endpoint donde realizará las peticiones.
    "ServicioForm", //Nombre del formulario.
    "/servicios" //url del componente en el frontend.
);


const leerServicio= id => (dispatch) => {
    api.get(`servicio/${id}`).then((response) => {
        console.log("Lendo", response)
        
        response.vehiculo = {value:response.vehiculo.id, label: response.vehiculo.nombre}
        console.log("Lendo2", response)
        dispatch(initializeForm("ServicioForm", response));
    }).catch(() => {
    }).finally(() => {
    });
};

const CrearServicio = (data) => (dispatch) => {
    console.log("Data del formulario", data);
    const formData = {
        vehiculo: data.vehiculo.value,
        nombre: data.nombre,
        precio: data.precio,
    }
    api.post("servicio", formData)
        .then(() => {
            NotificationManager.success('Registro creado', 'Éxito', 3000);
            dispatch(push("/servicios"))
        })
        .catch((error) => {})
        .finally(() => {});
};


const editarServicio = (id, data) => (dispatch) => {
    const formData = {
        vehiculo: data.vehiculo.value,
        nombre: data.nombre,
        precio: data.precio,
    }

    api.put(`servicio/${id}`, formData).then(() => {
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

    CrearServicio,
    leerServicio,
    editarServicio,
    ...baseReducer.actions,
};

export const initialState = {
    ...baseReducer.initialState,
};

export default handleActions(reducers, initialState);
