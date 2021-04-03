import {handleActions} from 'redux-actions';
import {NotificationManager} from 'react-notifications';
import {api} from "../../../utility/api";


const SET_DATA_REPORTE = "SET_DATA_REPORTE";

const setReporte = (data) => ({
    type: SET_DATA_REPORTE,
    data,
} );

export const reportePrincipal = () => (dispatch, getStore) =>{
    const initial_state = getStore().reporte;
    const params={
        usuario: initial_state.usuario
    }
    api.get('/reporte/reportePrincipal', params).then((response)=>{
        dispatch(setReporte(response))
    }).catch((error)=>{
        NotificationManager.error(
        `Ocurrio un error el repote ${error}`,
        "Error",
        0
        );
    });
}

export const actions = {
    reportePrincipal,
}

export const reducers = {
    [SET_DATA_REPORTE]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },

};

export const initialState = {
    data: null,
    usuario: 0,

};

export default handleActions(reducers, initialState);