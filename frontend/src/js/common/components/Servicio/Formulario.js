import React from "react";
import { Field, reduxForm } from "redux-form";
import { renderField } from "../Utils/renderField";
import { AsyncSelectField, renderTextArea, renderCurrency } from "../Utils/renderField/renderField";
import { api } from "../../../utility/api";
// import CreateModal from '../Utils/renderField/createModal';

import {
    validate,
    validatorFromFunction,
    validators,
    combine,
} from "validate-redux-form";

const getVehiculos = (search) => {
    let vehiculos = [];
    return api
        .get("vehiculo", { search })
        .then((response) => {
            if (response) {
                console.log("vehiculos:", response);
                response.results.forEach((vehiculo) => {
                    vehiculos.push({ value: vehiculo.id, label: vehiculo.nombre });
                });
            }
            //console.log("Usuarios:", usuarios);
            return vehiculos;
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
                            {actualizar ? "Actualizar" : "Crear"} Servicio
                        </h3>
                    </div>

                    <div className="p-0 pt-3">
                        <div className="form-group has-feedback flex-1 mb-2">
                            <label className="txt-12-n color-057">
                                Vehiculo
                            </label>
                            <Field
                                name="vehiculo"
                                placeholder="Vehiculo"
                                component={AsyncSelectField}
                                className="form-control"
                                loadOptions={getVehiculos}
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
                            <label className="txt-12-n color-057">Precio</label>
                            <Field
                                name="precio"
                                disabled={ver}
                                component={renderCurrency}
                            />
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className=" d-flex justify-content-center">
                        {isNested ? null : (
                            <a
                                className= "btn btn-secondary mr-1"
                                href="/#/servicios"
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
    form: "ServicioForm", // a unique identifier for this form
    validate: (data) => {
        return validate(data, {
            
        });
    },
})(GradoForm);
