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
    AsyncSelectField
} from "Utils/renderField/renderField";

const getProfesion = (search) => {
    let profesiones = [];
    console.log("Profesiones");
    return api
        .get("profesion", { search })
        .then((response) => {
            if (response) {
                response.results.forEach((profesion) => {
                    profesiones.push({ value: profesion.id, label: profesion.nombre });
                });
            }
            console.log("Profesiones:", profesiones);
            return profesiones;
        })
        .catch(() => {
            return [];
        });
};
const CatedraticoForm = (props) => {
    const { handleSubmit, me, actualizar, ver, setAvatar, isNested } = props;
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
                        { isNested? <h5 className="m-0 p-0 color-003"><strong>Agregar Catedratico</strong></h5>:
                        <h3 className="m-0 txt-22-n color-003">
                            { actualizar && !ver? "Actualizar Catedratico": null}
                            { !actualizar && !ver? "Agregar Catedratico": null}
                            { actualizar && ver? "Ver Catedratico": null}
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
                            
                        </div>
                        <div className="d-flex flex-column flex-1 mx-3">
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
                                <div className="form-group has-feedback flex-1 mx-3">
                                        <label
                                            className="txt-12-n color-057"
                                            htmlFor="first_name"
                                        >
                                            Profesion
                                        </label>
                                        <Field
                                            name="profesion"
                                            placeholder="Profesion"
                                            component={AsyncSelectField}
                                            className="form-control"
                                            loadOptions={getProfesion}
                                            disabled={ver}
                                        ></Field>
                                </div>
                        </div>
                        
                    </div>
                    <br />
                    <br />
                    <div className=" d-flex justify-content-center  my-4">
                   
                        <a 
                        className = "btn btn-secondary mr-1"
                        href="/#/catedraticos" >Regresar </a>

                        {!ver && (
                            <button
                                type={isNested ? "button" : "submit"}
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
    form: "CatedraticoForm", // a unique identifier for this form
    validate: (data) => {
        return validate(data, {
            first_name: validators.exists()("Este campo es requerido"),
            email: validators.exists()("Este campo es requerido"),
            last_name: validators.exists()("Este campo es requerido"),
        });
    },
} )( CatedraticoForm );
