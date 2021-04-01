import React from "react";
import { Field, reduxForm, FieldArray } from "redux-form";
import {
    validate,
    validatorFromFunction,
    validators,
    combine,
} from "validate-redux-form";


import { api } from "../../../utility/api";
import {
    renderCurrency,
    renderNumber,
    renderFilePicker,
    renderTextArea,
    AsyncSelectField
} from "Utils/renderField/renderField";

const getCiclo = (search) => {
    let ciclos = [];
    console.log("Ciclos");
    return api
        .get("ciclo", { search })
        .then((response) => {
            if (response) {
                response.results.forEach((ciclo) => {
                    ciclos.push({ value: ciclo.id, label: ciclo.anio });
                });
            }
            console.log("Ciclos:", ciclos);
            return ciclos;
        })
        .catch(() => {
            return [];
        });
};
const getGrado = (search) => {
    let grados = [];
    console.log("Grados");
    return api
        .get("grado", { search })
        .then((response) => {
            if (response) {
                response.results.forEach((grado) => {
                    grados.push({ value: grado.id, label: grado.nombre });
                });
            }
            console.log("grados:", grados);
            return grados;
        })
        .catch(() => {
            return [];
        });
};
const getSeccion = (search) => {
    let secciones = [];
    console.log("Secciones");
    return api
        .get("seccion", { search })
        .then((response) => {
            if (response) {
                response.results.forEach((seccion) => {
                    secciones.push({ value: seccion.id, label: seccion.nombre });
                });
            }
            console.log("Secciones:", secciones);
            return secciones;
        })
        .catch(() => {
            return [];
        });
};
const getCurso = (search) => {
    let cursos = [];
    
    return api
        .get("curso", { search })
        .then((response) => {
            console.log("response: ", response)
            if (response) {
                response.results.forEach((curso) => {
                    cursos.push({ value: curso.id, label: curso.nombre });
                });
            }
            console.log("cursos:", cursos);
            return cursos;
        })
        .catch(() => {
            return [];
        });
};

const getProfesor = (search) => {
    let profesores = [];
    
    return api
        .get("catedratico", { search })
        .then((response) => {
            console.log("response: ", response)
            if (response) {
                response.results.forEach((profesor) => {
                    profesores.push({ value: profesor.id, label: profesor.user.first_name });
                });
            }
            console.log("cursos:", profesores);
            return profesores;
        })
        .catch(() => {
            return [];
        });
};
const AsignacionForm = (props) => {
    const { handleSubmit, me, actualizar, ver, setArchivo, isNested, archivo } = props;
    let styleForm='p-0 pt-3 d-flex flex-column flex-md-row'
    let styleHeader = 'mb-4 card card-small'
    const setStyle = ( style ) => {
        styleHeader = ''
        styleHeader = style
        
    }
    
    console.log('ARCHIVO: ', archivo)
    
    // console.log(props);
    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                { isNested? (setStyle('card card-small w-100')):<br></br>}
                <div className={ styleHeader} style={{minWidth:'500px'}}>
                    <div className="border-bottom card-header m-1">
                        { isNested? <h5 className="m-0 p-0 color-003"><strong>Agregar Asigacion</strong></h5>:
                        <h3 className="m-0 txt-22-n color-003">
                            { actualizar && !ver? "Actualizar Asigacion": null}
                            { !actualizar && !ver? "Agregar Asigacion": null}
                            { actualizar && ver? "Ver Asigacion": null}
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
                                    Ciclo Escolar
                                </label>
                                <Field
                                    name="ciclo_escolar"
                                    placeholder="Ciclo Escolar"
                                    component={AsyncSelectField}
                                    className="form-control"
                                    loadOptions={getCiclo}
                                    disabled={ver}
                                />
                            </div>
                            <div className="form-group has-feedback flex-1 mx-3">
                                <label
                                    className="txt-12-n color-057"
                                    htmlFor="first_name"
                                >
                                    Grado
                                </label>
                                <Field
                                    name="grado"
                                    placeholder="Grado"
                                    component={AsyncSelectField}
                                    className="form-control"
                                    loadOptions={getGrado}
                                    disabled={ver}
                                />
                            </div>

                            <div className="form-group has-feedback flex-1 mx-3">
                                <label
                                    className="txt-12-n color-057"
                                    htmlFor="last_name"
                                >
                                    Seccion
                                </label>
                                <Field
                                    name="seccion"
                                    placeholder="Seccion"
                                    component={AsyncSelectField}
                                    className="form-control"
                                    loadOptions={getSeccion}
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
                                    Curso
                                </label>
                                <Field
                                    name="curso"
                                    placeholder="Curso"
                                    component={AsyncSelectField}
                                    className="form-control"
                                    loadOptions={getCurso}
                                    disabled={ver}
                                />
                            </div>
                            <div className="form-group has-feedback flex-1 mx-3">
                                <label
                                    className="txt-12-n color-057"
                                    htmlFor="first_name"
                                >
                                    Profesor
                                </label>
                                <Field
                                    name="catedratico"
                                    placeholder="Profesor"
                                    component={AsyncSelectField}
                                    className="form-control"
                                    loadOptions={getProfesor}
                                    disabled={ver}
                                />
                            </div>
                            <div className="form-group has-feedback flex-1 mx-3">
                                <label
                                    className="txt-12-n color-057"
                                    htmlFor="first_name"
                                >
                                    Descripcion
                                </label>
                                <Field 
                                name="descripcion"
                                component={renderTextArea}   
                                disabled={ver}/>
                            </div>
                            
                        </div>
                        <div className="d-flex flex-column flex-1 mx-3">
                            <div className="form-group has-feedback flex-1 mx-3">
                                <label
                                    className="txt-12-n color-057"
                                    htmlFor="address"
                                >
                                    Portada 
                                </label>
                                <Field 
                                    setFile={setArchivo} 
                                    name="archivo" 
                                    photo={archivo}
                                    component={renderFilePicker}
                                />
                                
                                <a href={archivo} target="_blank">Adjunto</a>
                            </div>
                            
                        </div>
                        
                    </div>
                    <br />
                    <br />
                    <div className=" d-flex justify-content-center  my-4">
                   
                        <a 
                        className = "btn btn-secondary mr-1"
                        href="/#/asignaciones" >Regresar </a>

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
    form: "AsignacionForm", // a unique identifier for this form
    validate: (data) => {
        return validate(data, {
            first_name: validators.exists()("Este campo es requerido"),
            email: validators.exists()("Este campo es requerido"),
            last_name: validators.exists()("Este campo es requerido"),
        });
    },
} )( AsignacionForm );
