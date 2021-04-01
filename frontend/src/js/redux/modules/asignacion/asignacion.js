import { handleActions } from "redux-actions";
import { push } from "react-router-redux";
import { initialize as initializeForm } from "redux-form";
import { NotificationManager } from "react-notifications";
import { api } from "api";
import _ from "lodash";

const SET_DATA = "SET_DATA";
const SET_LOADER = "SET_LOADER";
const SET_REGISTRO = "SET_REGISTRO";
const SEARCH_USERS = "SEARCH_USERS";
const PAGE = "VIEW_PAGE";
const SHOW_FORM = "SHOW_FORM";
const GUARDAR_LISTADO_TAREAS = 'GUARDAR_LISTADO_TAREAS';
const GUARDAR_REGISTRO_TAREA = 'GUARDAR_REGISTRO_TAREA';
const GUARDAR_ARCHIVO = 'GUARDAR_ARCHIVO';

// ------------------------------------
// Constants
// ------------------------------------
const setLoader = (loader) => ({
    type: SET_LOADER,
    loader,
});

const setSearch = (search) => ({
    type: SEARCH_USERS,
    search,
} );

const setPage = (page) => ({
    type: PAGE,
    page,
} );


// Este es el redux que se utiliza con profile2
export const listar = (page = 1) => (dispatch, getStore) => {
    const resource = getStore().asignacion;
    const params = { page };
    params.search = resource.search;
    console.log("Antes", getStore());
    dispatch({ type: SET_LOADER, loader: true });
    api.get("asignacion", params)
        .then((response) => {
            
            dispatch( { type: SET_DATA, data: response } );
            dispatch(setPage(page));
            console.log("Despues", getStore());
        })
        .catch((error) => {
            NotificationManager.error(error.detail, "ERROR", 0);
        })
        .finally(() => {
            dispatch({ type: SET_LOADER, loader: false });
        });
};


export const leer = id => (dispatch) => {
    api.get(`asignacion/${id}`).then((response) => {
        console.log("asignacion ", response)
        response.catedratico = {value:response.catedratico.id, label: response.catedratico.user.first_name};
        response.ciclo_escolar = {value:response.ciclo_escolar.id, label: response.ciclo_escolar.anio};
        response.curso = {value:response.curso.id, label: response.curso.nombre};
        response.seccion = {value:response.seccion.id, label: response.seccion.nombre};
        response.grado = {value:response.grado.id, label: response.grado.nombre};
        
        response.descripcion = response.descripcion;
        dispatch( { type: GUARDAR_ARCHIVO, archivo: response.imagen_portada} );
        console.log("ARCHIVOOO: ", response.imagen_portada);
        dispatch(initializeForm("AsignacionForm", response));
    }).catch(() => {
    }).finally(() => {
    });
};

export const editar = (id, data) => (dispatch, getStore) => {
    dispatch({ type: SET_LOADER, loader: true });
    console.log("desde USuarioPersonal");
    const estado = getStore();
    const formData = {
        
            profesion: data.profesion.value,
            user:{
                username: data.username,
                first_name: data.first_name,
                last_name: data.last_name,
                phone: data.phone,
                address: data.address,
                rol: 1,
                password: "Temporal",
            }
        
    }

    console.log(formData);

    api.put(`catedratico/${id}`, formData)
        .then((response) => {
            NotificationManager.success(
                "Usaurio Actualizado correctamente",
                "Éxito",
                3000
            );
            //dispatch(push("/usuarios"));
        })
        .catch((error) => {
            NotificationManager.error(error.detail, "ERROR", 0);
        })
        .finally(() => {
            dispatch({ type: SET_LOADER, loader: false });
        });
};

export const registrar = (data={}, attachments=[]) => (dispatch, getStore) => {
    const estado = getStore();
    console.log('Data: ', data)
    console.log('Attachmentes: ', attachments)
    const formData = {
            ciclo_escolar: data.ciclo_escolar.value,
            grado: data.grado.value,
            seccion: data.seccion.value,
            curso: data.curso.value,
            catedratico: data.catedratico.value,
            descripcion: data.descripcion
    }

    console.log("estado: ", estado);
    console.log("FormDataRegistrar: ", formData);
    api.postAttachments("asignacion", formData, attachments)
        .then((response) => {
            NotificationManager.success(
                "Usaurio registrado correctamente",
                "Éxito",
                3000
            );
            dispatch(push("/catedraticos"));
        })
        .catch((error) => {
            NotificationManager.error(error.detail, "ERROR", 0);
        })
        .finally(() => {}); 
};


const searchChange = (search) => (dispatch) => {
    dispatch(setSearch(search));
    dispatch(listar());
};

const eliminar = id => (dispatch) => {
    dispatch(setLoader(true));
    api.eliminar(`asignacion/${id}`).then(() => {
        dispatch(listar());
        NotificationManager.success('Registro eliminado', 'Éxito', 3000);
    }).catch(() => {
        NotificationManager.success('Error en la transacción', 'Éxito', 3000);
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const showForm = (show) => (dispatch) => {
    dispatch({ type: SHOW_FORM, show_form: show });
};

const clearFile = () => (dispatch) =>{
    dispatch( { type: GUARDAR_ARCHIVO, archivo: null} );
}

export const actions = {
    registrar,
    listar,
    searchChange,
    editar,
    showForm,
    leer,
    eliminar,
    clearFile,
};

export const reducers = {
    [SET_DATA]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },

    [SET_LOADER]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };
    },

    [SET_REGISTRO]: (state, { registro }) => {
        return {
            ...state,
            registro,
        };
    },
    [SHOW_FORM]: (state, { show_form }) => {
        return {
            ...state,
            show_form,
        };
    },

    [PAGE]: (state, { page }) => {
            return {
                ...state,
                page,
            };
    },
    [SEARCH_USERS]: (state, { search }) => {
        return {
            ...state,
            search,
        };
    },
    [GUARDAR_ARCHIVO]: (state, { archivo }) => {
        return {
            ...state,
            archivo,
        };
    },
};

export const initialState = {
    loader: false,
    me: {},
    page:1,
    show_form: false,
    data: {},
    registro: null,
    search: "",
    archivo: null,
};


export default handleActions(reducers, initialState);
