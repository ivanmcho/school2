import React, { Component } from "react";
import Formulario from "./Formulario";

class CrearGrado extends Component {
    componentWillMount = () => {
        const { match, leerVehiculo } = this.props;
        if (match.params.id) {
            const id = match.params.id;
            leerVehiculo(id);
        }
    };

    actualizarFormulario = (data) => {
        const { editarVehiculo } = this.props;
        editarVehiculo(data.id, data);
    };

    render() {
        const {
            match,
            CrearVehiculo,
            location,
        } = this.props;

        const funcionEnvio = match.params.id
            ? this.actualizarFormulario
            : CrearVehiculo;

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
