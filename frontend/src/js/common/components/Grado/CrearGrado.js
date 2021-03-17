import React, { Component } from "react";
import Formulario from "./Formulario";

class CrearGrado extends Component {
    componentWillMount = () => {
        const { match, leerGrado } = this.props;
        if (match.params.id) {
            const id = match.params.id;
            leerGrado(id);
        }
    };

    actualizarFormulario = (data) => {
        const { editarGrado } = this.props;
       editarGrado(data.id, data);
    };

    render() {
        const {
            match,
            crearGrado,
            location,
        } = this.props;

        const funcionEnvio = match.params.id
            ? this.actualizarFormulario
            : crearGrado;

        // const {showForm, show_form} = this.props;

        console.log("Crear Grado", this.props);
        return (
            <div className="d-flex flex-column w-100">
                <Formulario
                    onSubmit={funcionEnvio}
                    funcionRegistro={this.props.funcionEnvio}
                    actualizar={match.params.id ? true : false}
                    ver={location.pathname.includes("ver")}
                />
            </div>
        );
    }
}

export default CrearGrado;
