import React from "react";
import { Field, reduxForm } from "redux-form";
import {
    validate,
    validatorFromFunction,
    validators,
    combine,
} from "validate-redux-form";
import { renderField, renderNumber } from "../Utils/renderField";
import { phone } from "../../../utility/validation";

const SucursalForm = (props) => {
    const { handleSubmit, actualizar, ver, isNested, showForm } = props;
    console.log("Ver: ",ver)

    return (
        <div className="d-flex flex-column w-100">
            <form onSubmit={handleSubmit}>
                <br></br>
                <div
                    className="mb-4 card card-small p-4"
                    style={{
                        maxWidth: 500,
                    }}
                >
                    <div>
                        <h3 className="m-0 txt-22-n color-003">
                            {actualizar ? "Actualizar" : "Crear"} Ciclo
                        </h3>
                    </div>
                    <div className="p-0 pt-3">
                        <div className="form-group has-feedback flex-1 mb-4">
                            <label className="txt-12-n color-057">Nombre</label>
                            <Field
                                component={renderField}
                                name="anio"
                                disabled={ver}
                            />
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className=" d-flex justify-content-center">
                        {isNested ? (
                            <button
                                type="button"
                                className="btn btn-secondary mr-1"
                                onClick={() => showForm(false)}
                            >
                                Cancelar
                            </button>
                        ) : (
                            <a
                                className="btn btn-secondary mr-1"
                                href="/#/ciclos"
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
    form: "CicloForm", // a unique identifier for this form
    validate: (data) => {
        return validate(data, {
            nombre: validators.exists()("Este campo es requerido"),
            
        });
    },
})(SucursalForm);
