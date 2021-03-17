import React, { Component } from "react";
import ProfileForm2 from "./Formulario";

class Profile extends Component {
    componentWillMount = () => {
        const { match, leerEstudiante } = this.props;
        if (match.params.id) {
            const id = match.params.id;
            leerEstudiante(id);
        }
    };

    actualizarFormulario = (data) => {
        const { editar, match } = this.props;
        const id = match.params.id;
        editar(id, data);
    };
    //leerEstudiante
    render() {
        // const { me } = this.props;
        console.log("props: ", this.props);
        const { match, registrarUser, actualizarUser, location } = this.props;

        const funcionEnvio = match.params.id 
        ? this.actualizarFormulario 
        : registrarUser;

        const {
            showForm,
            show_form,
        } = this.props;
        
        console.log("contendedor:", show_form);
        return (
            <div className="d-flex flex-column w-100">
                <ProfileForm2
                    onSubmit={funcionEnvio}
                    actualizar={match.params.id ? true : false}
                    ver={location.pathname.includes("ver")}
                    showForm={showForm}
                    show_form={show_form}
                />
            </div>
        );
    }
}

export default Profile;
