import React, {Component} from "react";
import { Field, Form, reduxForm } from "redux-form";
import { AsyncSelectField,renderTextArea } from "../Utils/renderField/renderField";
import { api } from "../../../utility/api";

const getClientes = (search) => {
    let clientes = [];
    return api
        .get("user", { search })
        .then((response) => {
            if (response) {
                response.results.forEach((dato) => {
                    clientes.push({ value: dato.id, label: dato.username });
                });
            }
            console.log("niveles:", clientes);
            return clientes;
        })
        .catch(() => {
            return [];
        });
};

class Formulario extends Component{
    render(){
        const {handleSubmit} = this.props;

        return(
            <form onSubmit={handleSubmit} className='w-25'>
                <label>Usuarios</label>
                <Field
                    name='nombre'
                    component = {AsyncSelectField}
                    loadOptions={getClientes}
                />
                    
            </form>
        )
    }
}


export default reduxForm({
    form: 'filtros_reporte', // a unique identifier for this form
})(Formulario);