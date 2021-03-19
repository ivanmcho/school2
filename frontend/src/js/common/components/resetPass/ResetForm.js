import React from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import {
    validate,
    validatorFromFunction,
    validators,
    combine,
} from "validate-redux-form";
import { renderField, renderNumber } from "../Utils/renderField";

const ResetForm = (props) => {
    const { handleSubmit, pristine, reset, submitting, me } = props;
    return (
        <form
            name="loginForm"
            className="form-validate"
            onSubmit={handleSubmit}
        >
            <div className="form-group has-feedback">
                <label className="txt-12 color-057" htmlFor="passwordActual">
                    Contraseña actual
                </label>
                <Field
                    name="passwordActual"
                    label="passwordActual"
                    component={renderField}
                    type="password"
                    className="form-control"
                />
            </div>
            <div className="form-group has-feedback">
                <label className="txt-12 color-057" htmlFor="password">
                    Contraseña nueva
                </label>
                <Field
                    name="password"
                    label="Contraseña"
                    component={renderField}
                    type="password"
                    className="form-control"
                />
            </div>
            <div className="form-group has-feedback">
                <label className="txt-12 color-057" htmlFor="confirmPassword">
                    Confirmar contraseña nueva:
                </label>
                <Field
                    name="confirmPassword"
                    label="Confirmar Contraseña"
                    component={renderField}
                    type="password"
                    className="form-control"
                />
            </div>

            <div className="buttons-box">
                {me.rol ? (
                    (me.rol.nombre == "Cliente" ? (
                        <Link
                            className="btn btn-secondary mr-1"
                            to="/dashboardCliente"
                        >
                            Cancelar
                        </Link>
                    ) : (
                        <Link className="btn btn-secondary mr-1" to="/">
                            Cancelar
                        </Link>
                    ))
                ) : (
                    <Link className="btn btn-secondary mr-1" to="/">
                        Cancelar
                    </Link>
                )}

                <button
                    type="submit"
                    className="btn btn-primary m-1 align-self-center"
                >
                    Guardar
                </button>
            </div>
        </form>
    );
};

export const matchPassword = (pass, confirm) =>
    validatorFromFunction((value) => {
        return pass === confirm;
    });

export default reduxForm({
    form: "register", // a unique identifier for this form
    validate: (data) => {
        return validate(data, {
            confirmPassword: combine(
                validators.exists()("Este campo es requerido"),
                matchPassword(data.password, data.confirmPassword)()(
                    "Las contraseñas no coinciden"
                )
            ),

            passwordActual: validators.exists()("Este campo es requerido"),

            password: validators.exists()("Este campo es requerido"),
        });
    },
})(ResetForm);
