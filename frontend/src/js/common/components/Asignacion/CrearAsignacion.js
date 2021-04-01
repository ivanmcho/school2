import React, { Component } from "react";
import ProfileForm2 from "./Formulario";

class Asignacion extends Component {
    state={
        crear: true,
        archivo: null,
    }
    componentWillMount = () => {
        const { match, leer } = this.props;
        if (match.params.id) {
            this.setState({crear: false})
            const id = match.params.id;
            leer(id);
        }
    };


    setArchivo = (archivo) => {
        this.setState({archivo})

    }

    registro = (data) => {
        const {registrar} = this.props
        registrar({...data, archivo: null},[{ file: this.state.archivo, name: 'imagen_portada'}]);
    }


    actualizar = (data) => {
        const {editar} = this.props
        editar({...data, archivo: null},[{ file: this.state.archivo, name: 'imagen_portada'}]);
    }
    //leerEstudiante
    render() {
        // const { me } = this.props;
        console.log("props: ", this.props);
        const { match, archivo, location, clearFile } = this.props;
        const{ crear } = this.state;
        const funcionEnvio = crear 
        ? this.registro 
        : this.actualizar;
        console.log("Desde Asigancion: ", archivo);
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
                    setArchivo={this.setArchivo}
                    archivo={archivo}
                    clearFile = {clearFile}
                />
            </div>
        );
    }
}

export default Asignacion;
