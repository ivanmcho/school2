import React from "react";
import { Field, reduxForm } from "redux-form";
import { renderField } from "../Utils/renderField";
import { AsyncSelectField,renderTextArea } from "../Utils/renderField/renderField";
import { api } from "../../../utility/api";
// import CreateModal from '../Utils/renderField/createModal';

import {
    validate,
    validatorFromFunction,
    validators,
    combine,
} from "validate-redux-form";

const getUsers = (search) => {
    let usuarios = [];
    return api
        .get("user", { search })
        .then((response) => {
            if (response) {
                console.log("Usuarios:", response);
                response.results.forEach((usuario) => {
                    usuarios.push({ value: usuario.username, label: usuario.first_name });
                });
            }
            //console.log("Usuarios:", usuarios);
            return usuarios;
        })
        .catch(() => {
            return [];
        });
};

const GradoForm = (props) => {
    const { handleSubmit, actualizar, ver, isNested } = props;


    return (
        <div className="d-flex flex-column w-100">
            <form onSubmit={handleSubmit}>
                {!isNested && <br></br>}
                <div
                    className={`${!isNested && "card card-small mb-4 p-4 "}`}
                    style={{
                        maxWidth: 530,
                    }}
                >
                    <div>
                        <h3 className="m-0 txt-22-n color-003">
                            {actualizar ? "Actualizar" : "Crear"} vehiculo
                        </h3>
                    </div>

                    <div className="p-0 pt-3">
                        <div className="form-group has-feedback flex-1 mb-2">
                            <label className="txt-12-n color-057">
                                Propietario
                            </label>
                            <Field
                                name="usuario"
                                placeholder="Propietario"
                                component={AsyncSelectField}
                                className="form-control"
                                loadOptions={getUsers}
                                disabled={ver}
                            ></Field>
                        </div>
                    </div>

                    <div className="p-0 pt-3">
                        <div className="form-group has-feedback flex-1 mb-4">
                            <label className="txt-12-n color-057">Nombre</label>
                            <Field
                                component={renderField}
                                name="nombre"
                                disabled={ver}
                            />
                        </div>
                    </div>
                    <div className="p-0 pt-3">
                        <div className="form-group has-feedback flex-1 mb-4">
                            <label className="txt-12-n color-057">modelo</label>
                            <Field
                                component={renderField}
                                name="modelo"
                                disabled={ver}
                            />
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className=" d-flex justify-content-center">
                        {isNested ? null : (
                            <a
                                className= "btn btn-secondary mr-1"
                                href="/#/vehiculos"
                            >
                                Cancelar
                            </a>
                        )}
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
        </div>
    );
};

export default reduxForm({
    form: "VehiculoForm", // a unique identifier for this form
    validate: (data) => {
        return validate(data, {
            
        });
    },
})(GradoForm);
