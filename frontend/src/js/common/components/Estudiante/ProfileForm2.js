import React from "react";
import { Field, reduxForm, FieldArray } from "redux-form";
import {
    validate,
    validatorFromFunction,
    validators,
    combine,
} from "validate-redux-form";
import { renderField } from "../Utils/renderField";

import { api } from "../../../utility/api";
import {
    renderCurrency,
    renderNumber,
    renderFilePicker,
    renderTextArea,
} from "Utils/renderField/renderField";

const estados = [
    { label: "Activo", value: true },
    { label: "Inactivo", value: false },
];

const getGrupos = (search) => {
    let grupos = [];
    return api
        .get("categoria", { search })
        .then((response) => {
            if (response) {
                response.results.forEach((Res) => {
                    grupos.push({ value: Res.id, label: Res.nombre });
                });
            }
            return grupos;
        })
        .catch(() => {
            return [];
        });
};

const getRoles = (search) => {
    let roles = [];
    return api
        .get("roles", { search })
        .then((response) => {
            if (response) {
                response.results.forEach((Res,index) => {
                    roles.push( { value: Res.id, label: Res.nombre } );
                } );
                
            }
            console.log('Roles?',roles);
            return roles;
        })
        .catch(() => {
            return [];
        });
};
const getRolesCliente = (search) => {
    let roles = [];
    let roleCliente = []
    return api
        .get("roles", { search })
        .then((response) => {
            if (response) {
                response.results.forEach((Res,index) => {
                    roles.push( { value: Res.id, label: Res.nombre } );
                    if ( roles[ index ].label == 'Cliente' ) {
                        roleCliente.push( roles[ index ] );
                    }
                } );
                
            }
            return roleCliente;
        })
        .catch(() => {
            return [];
        });
};

const getProyecto = (search) => {
    let proyecto = [];
    return api
        .get("proyecto", { search })
        .then((response) => {
            if (response) {
                response.results.forEach((Res) => {
                    proyecto.push({ value: Res.id, label: Res.nombre });
                });
            }
            console.log('proyecto',proyecto);
            return proyecto;
        })
        .catch(() => {
            return [];
        });
};

const getScrum = (search) => {
    let scrum = [];
    return api
        .get("user/userScrum")
        .then((response) => {
            if (response) {
                response.results.forEach((Res) => {
                    scrum.push({ value: Res.id, label: Res.first_name + ' '+ Res.last_name });
                });
            }
            console.log('user scrum ',scrum);
            return scrum;
        })
        .catch(() => {
            return [];
        });
};

const getPuesto = (search) => {
    let puesto = [];
    return api
        .get("puesto", { search })
        .then((response) => {
            if (response) {
                response.results.forEach((Res) => {
                    puesto.push({ value: Res.id, label: Res.nombre });
                });
            }
            console.log('place user: ',puesto);
            return puesto;
        })
        .catch(() => {
            return [];
        });
};



const Roles = [
    { label: "Administrador", value: 0 },
    { label: "Cliente", value: 1 },
    { label: "Agente", value: 2 },
    { label: "Programador", value: 3 },
    { label: "root", value: 4 },
    { label: "otros", value: 5 },
];

const ProfileForm2 = (props) => {
     const { handleSubmit, me, actualizar, ver, setAvatar, isNested } = props;
    const {
        showForm,
        show_form,
        value,
        registrarProyecto,
        registrarEmpresa,
        registrarUserDesdeTicket,
        MostrarOcultarModal,
    } = props;
    let styleForm='p-0 pt-3 d-flex flex-column flex-md-row'
    let styleHeader = 'mb-4 card card-small'
    const setStyle = ( style ) => {
        styleHeader = ''
        styleHeader = style
        
    }
    
    // console.log(props);
    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                { isNested? (setStyle('card card-small w-100')):<br></br>}
                <div className={ styleHeader} style={{minWidth:'500px'}}>
                    <div className="border-bottom card-header m-1">
                        { isNested? <h5 className="m-0 p-0 color-003"><strong>Agregar Cliente</strong></h5>:
                        <h3 className="m-0 txt-22-n color-003">
                            { actualizar && !ver? "Actualizar Usuario": null}
                            { !actualizar && !ver? "Agregar Estudiante": null}
                            { actualizar && ver? "Ver Usuario": null}
                        </h3>}
                    </div>
                    { isNested? ()=>(styleForm='p-0 m-0 d-flex flex-column flex-md-row'):null }
                    <div className={styleForm}>
                        <div className="d-flex flex-column flex-1 mx-3">
                            <div className="form-group has-feedback flex-1 mx-3">
                                <label
                                    className="txt-12-n color-057"
                                    htmlFor="username"
                                >
                                    Correo
                                </label>
                                <Field
                                    name="username"
                                    placeholder="E-mail"
                                    component={renderField}
                                    type="email"
                                    className="form-control"
                                    disabled={ver}
                                />
                            </div>
                            <div className="form-group has-feedback flex-1 mx-3">
                                <label
                                    className="txt-12-n color-057"
                                    htmlFor="first_name"
                                >
                                    Nombre
                                </label>
                                <Field
                                    name="first_name"
                                    placeholder="Nombre"
                                    component={renderField}
                                    type="text"
                                    className="form-control"
                                    disabled={ver}
                                />
                            </div>

                            <div className="form-group has-feedback flex-1 mx-3">
                                <label
                                    className="txt-12-n color-057"
                                    htmlFor="last_name"
                                >
                                    Apellido
                                </label>
                                <Field
                                    name="last_name"
                                    placeholder="Apellido"
                                    component={renderField}
                                    type="text"
                                    className="form-control"
                                    disabled={ver}
                                />
                            </div>
                            <div className="form-group has-feedback flex-1 mx-3">
                                    <label
                                        className="txt-12-n color-057"
                                        htmlFor="address"
                                    >
                                        Direccion
                                    </label>
                                    <Field
                                        name="address"
                                        placeholder="Direccion"
                                        component={renderTextArea}
                                        type="text"
                                        className="form-control"
                                        disabled={ver}
                                    />
                            </div>
                            <div className="form-group has-feedback flex-1 mx-3">
                                        <label
                                            className="txt-12-n color-057"
                                            htmlFor="first_name"
                                        >
                                            Telefono
                                        </label>
                                        <Field
                                            name="phone"
                                            type="text"
                                            className="form-control"
                                            disabled={ver}
                                            decimalScale={2}
                                            numberFormat="#### ####"
                                            prefix="Q "
                                            placeholder="#### ####"
                                            component={renderNumber}
                                        />
                                </div>
                        </div>
                        <div className="d-flex flex-column flex-1 mx-3">
                            <div className="form-group has-feedback flex-1 mx-3">
                                <label
                                    className="txt-12-n color-057"
                                    htmlFor="last_name"
                                >
                                    Carnet
                                </label>
                                <Field
                                    name="carnet"
                                    placeholder="Carnet"
                                    component={renderField}
                                    type="text"
                                    className="form-control"
                                    disabled={ver}
                                />
                            </div>
                            <div className="form-group has-feedback flex-1 mx-3">
                                <label
                                    className="txt-12-n color-057"
                                    htmlFor="last_name"
                                >
                                    Contacto
                                </label>
                                <Field
                                    name="contacto"
                                    placeholder="Contacto"
                                    component={renderField}
                                    type="text"
                                    className="form-control"
                                    disabled={ver}
                                />
                            </div>
                            

                            <div className="form-group has-feedback flex-1 mx-3">
                                    <label
                                        className="txt-12-n color-057"
                                        htmlFor="first_name"
                                    >
                                        Telefono de Contacto
                                    </label>
                                    <Field
                                        name="telefono_contacto"                                    
                                        type="text"
                                        className="form-control"
                                        disabled={ver}
                                        decimalScale={2}
                                        numberFormat="#### ####"
                                        prefix="Q "
                                        placeholder="#### ####"
                                        component={renderNumber}
                                    />
                            </div>

                                <div className="form-group has-feedback flex-1 mx-3">
                                    <label
                                        className="txt-12-n color-057"
                                        htmlFor="last_name"
                                    >
                                        Direccion de Contacto
                                    </label>
                                    <Field
                                        name="direccion_contacto"
                                        placeholder="Direccion Contacto"
                                        component={renderTextArea}
                                        type="text"
                                        className="form-control"
                                        disabled={ver}
                                    />
                                </div>
                            
                        </div>
                        
                    </div>
                    <br />
                    <br />
                    <div className=" d-flex justify-content-center  my-4">
                   
                        { isNested || registrarUserDesdeTicket ?
                            (
                                // <a 
                                // type="button"
                                // className= "btn btn-info"
                                // onClick= {()=>MostrarOcultarModal(false)}
                                // className="btn-secundario2 ml-2" 
                                // >
                                //     Cancelar
                                // </a>
                                null
                            )
                        : 
                        (<a 
                        className="btn btn-primary mr-1"
                        href="/#/usuarios" >Regresar </a>)}

                        {!ver && (
                            <button
                                type={isNested || registrarUserDesdeTicket ? "button" : "submit"}
                                onClick={isNested ? handleSubmit : null}
                                className="btn btn-primary mr-1"
                            >
                                {actualizar ? "Actualizar" : "Registrar"}
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </React.Fragment>
    );
};

export default reduxForm({
    form: "profile2", // a unique identifier for this form
    validate: (data) => {
        return validate(data, {
            first_name: validators.exists()("Este campo es requerido"),
            email: validators.exists()("Este campo es requerido"),
            last_name: validators.exists()("Este campo es requerido"),
        });
    },
} )( ProfileForm2 );
