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


const EstudianteForm = (props) => {
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
                        { isNested? <h5 className="m-0 p-0 color-003"><strong>Agregar Estudiante</strong></h5>:
                        <h3 className="m-0 txt-22-n color-003">
                            { actualizar && !ver? "Actualizar Estudiante": null}
                            { !actualizar && !ver? "Agregar Estudiante": null}
                            { actualizar && ver? "Ver Estudiante": null}
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
                   
                        <a 
                        className = "btn btn-secondary mr-1"
                        href="/#/estudiantes" >Regresar </a>

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
    form: "EstudianteForm", // a unique identifier for this form
    validate: (data) => {
        return validate(data, {
            first_name: validators.exists()("Este campo es requerido"),
            email: validators.exists()("Este campo es requerido"),
            last_name: validators.exists()("Este campo es requerido"),
        });
    },
} )( EstudianteForm );
