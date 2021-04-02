import { handleActions } from "redux-actions";
import { createReducer } from "../baseReducer/baseReducer";
import { api } from "api";
import { initialize as initializeForm } from "redux-form";
import { NotificationManager } from "react-notifications";
import { push } from "react-router-redux/lib/actions";


const baseReducer = createReducer(
    "vehiculo", //identificador dentro del store.
    "vehiculo", //endpoint donde realizará las peticiones.
    "VehiculoForm", //Nombre del formulario.
    "/vehiculos" //url del componente en el frontend.
);


const leerVehiculo= id => (dispatch) => {
    api.get(`vehiculo/${id}`).then((response) => {
        console.log("Lendo", response)
        
        response.usuario = {value:response.propietario.username, label: response.propietario.first_name}
        console.log("Lendo2", response)
        dispatch(initializeForm("VehiculoForm", response));
    }).catch(() => {
    }).finally(() => {
    });
};

const CrearVehiculo = (data) => (dispatch) => {
    console.log("Data del formulario", data);
    const formData = {
        propietario: data.usuario.value,
        nombre: data.nombre,
        modelo: data.modelo,
    }
    api.post("vehiculo", formData)
        .then(() => {
            NotificationManager.success('Registro creado', 'Éxito', 3000);
            dispatch(push("/vehiculos"))
        })
        .catch((error) => {})
        .finally(() => {});
};


const editarVehiculo = (id, data) => (dispatch) => {
    const formData = {
        propietario: data.usuario.value,
        nombre: data.nombre,
        modelo: data.modelo,
    }

    api.put(`vehiculo/${id}`, formData).then(() => {
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

    CrearVehiculo,
    leerVehiculo,
    editarVehiculo,
    ...baseReducer.actions,
};

export const initialState = {
    ...baseReducer.initialState,
};

export default handleActions(reducers, initialState);
