import React from "react";
import { Field, reduxForm } from "redux-form";
import { renderField } from "../Utils/renderField";
import { AsyncSelectField } from "../Utils/renderField/renderField";
import { api } from "../../../utility/api";
// import CreateModal from '../Utils/renderField/createModal';


const validate = (values) => {
    const errors = {};
    if (!values.nombre) {
        errors.nombre = "Campo requerido";
    }

    if (!values.empresa) {
        errors.empresa = "Campo requerido";
    }

    return errors;
};

const getNivel = (search) => {
    let niveles = [];
    return api
        .get("nivel", { search })
        .then((response) => {
            if (response) {
                response.results.forEach((nivel) => {
                    niveles.push({ value: nivel.id, label: nivel.nombre });
                });
            }
            console.log("niveles:", niveles);
            return niveles;
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
                            {actualizar ? "Actualizar" : "Crear"} Grado
                        </h3>
                    </div>

                    <div className="p-0 pt-3">
                        <div className="form-group has-feedback flex-1 mb-2">
                            <label className="txt-12-n color-057">
                                Nivel
                            </label>
                            <Field
                                name="nivel"
                                placeholder="Nivel"
                                component={AsyncSelectField}
                                loadOptions={getNivel}
                                disabled={ver}
                            ></Field>
                        </div>
                    </div>

                    <div className="p-0 pt-3">
                        <div className="form-group has-feedback flex-1 mb-4">
                            <label className="txt-12-n color-057">Nombre Grado</label>
                            <Field
                                component={renderField}
                                name="nombre"
                                disabled={ver}
                            />
                        </div>
                    </div>
                    <div className="p-0 pt-3">
                        <div className="form-group has-feedback flex-1 mb-4">
                            <label className="txt-12-n color-057">Descripcion</label>
                            <Field name="descripcion"  component={renderField} disabled={ver}/>
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className=" d-flex justify-content-center">
                        {isNested ? null : (
                            <a
                                className="btn btn-primary mr-1"
                                href="/#/grado"
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
    form: "GradoForm", // a unique identifier for this form
    validate,
})(GradoForm);
