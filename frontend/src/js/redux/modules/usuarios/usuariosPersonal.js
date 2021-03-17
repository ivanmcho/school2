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
    const resource = getStore().usuariosPersonal;
    const params = { page };
    params.search = resource.search;
    console.log("UUUUU", resource);
    dispatch({ type: SET_LOADER, loader: true });
    api.get("estudiante", params)
        .then((response) => {
            console.log("response", response);
            dispatch( { type: SET_DATA, data: response } );
            dispatch(setPage(page));
        })
        .catch((error) => {
            NotificationManager.error(error.detail, "ERROR", 0);
        })
        .finally(() => {
            dispatch({ type: SET_LOADER, loader: false });
        });
};


const leerEstudiante = id => (dispatch) => {
    api.get(`estudiante/${id}`).then((response) => {
        console.log("Estdiante ",response.user.username)
        response.username = response.user.username;
        response.address = response.user.address;
        response.first_name = response.user.first_name;
        response.last_name = response.user.last_name;
        response.phone = response.user.phone;
        console.log("EEEE ",response)
        //address y phone
        dispatch(initializeForm("profile2", response));
    }).catch(() => {
    }).finally(() => {
    });
};

export const editar = (id, data) => (dispatch, getStore) => {
    dispatch({ type: SET_LOADER, loader: true });
    console.log("desde USuarioPersonal");
    const estado = getStore();
    const formData = {
        
            carnet: data.carnet,
            contacto: data.contacto,
            direccion_contacto: data.direccion_contacto,
            telefono_contacto: data.telefono_contacto,
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

    api.put(`estudiante/${id}`, formData)
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

export const registrarUser = (data) => (dispatch, getStore) => {
    const estado = getStore();
    const formData = {
        
            carnet: data.carnet,
            contacto: data.contacto,
            direccion_contacto: data.direccion_contacto,
            telefono_contacto: data.telefono_contacto,
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

    // formData.idCategoria = formData.idCategoria.value;
    console.log("estado: ", estado);
    console.log("FormDataRegistrar: ", formData);
    api.post("estudiante", formData)
        .then((response) => {
            NotificationManager.success(
                "Usaurio registrado correctamente",
                "Éxito",
                3000
            );
            dispatch(push("/estudiantes"));
        })
        .catch((error) => {
            NotificationManager.error(error.detail, "ERROR", 0);
        })
        .finally(() => {});
};

export const actualizarUser = () => (dispatch, getStore) => {
    const estado = getStore();
    const formData = estado.form.profile2.values;
    if (
        formData.password === null ||
        formData.password === undefined ||
        formData.password === ""
    )
    console.log("estado: ", estado);
    console.log("FormData Actualizar:", formData);
    console.log(formData.id)
    api.put(`user/${formData.id}`, formData)
        .then((response) => {
            NotificationManager.success(
                "Usuario actualizado correctamente",
                "Éxito",
                3000
            );
            dispatch(push("/usuarios"));
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

const showForm = (show) => (dispatch) => {
    dispatch({ type: SHOW_FORM, show_form: show });
};

const registrarProyecto = () => (dispatch, getState) => {
    const formData = _.cloneDeep(getState().form.ProyectoForm.values);
    console.log("");
    // const proyectosArray = _.cloneDeep(getState().form.profile2.values.empresa);
    const Formulario = _.cloneDeep(getState().form.profile2.values);
    console.log("desde usuarios personal", Formulario);
    //!! verifica que no sea undefined
    const proyectosArray =
        !!Formulario && Formulario.proyecto ? Formulario.proyecto : [];

    console.log("proyectoArrays", proyectosArray);
    api.post("proyecto", formData)
        .then((response) => {
            const nuevo_elemento = {
                value: response.id,
                label: response.nombre,
            };
            proyectosArray.push(nuevo_elemento);
            console.log("proyectoArrays2", proyectosArray);
            dispatch(showForm(false));
            // let formValues = _.cloneDeep(getState().form.profile2.values);
            let formValues = Formulario;
            formValues = !!formValues ? formValues : {};
            formValues.proyecto = proyectosArray;
            dispatch(initializeForm("profile2", formValues));
        })
        .catch((error) => {})
        .finally(() => {});
};
const registrarEmpresa = () => (dispatch, getState) => {
    const formData = getState().form.EmpresaForm.values;
    api.post("empresa", formData)
        .then((response) => {
            const nuevo_elemento = {
                value: response.id,
                label: response.nombre,
            };
            dispatch(showForm(false));
            let formValues = getState().form.ProyectoForm.values;
            formValues = !!formValues ? formValues : {};
            formValues.empresa = nuevo_elemento;
            dispatch(initializeForm("ProyectoForm", formValues));
        })
        .catch((error) => {})
        .finally(() => {});
};

export const actions = {
    registrarUser,
    actualizarUser,
    listar,
    searchChange,
    editar,
    showForm,
    registrarEmpresa,
    registrarProyecto,
    leerEstudiante,    
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
};

export const initialState = {
    loader: false,
    me: {},
    page:1,
    show_form: false,
    data: {},
    registro: null,
    search: "",
};


export default handleActions(reducers, initialState);
