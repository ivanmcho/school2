import React, {Component} from 'react';
import {RenderCurrency} from '../Utils/renderField/renderReadField';
import Formulario from './Formulario';

class Reporte extends Component{
    componentWillMount = () => {
        const { reportePrincipal } = this.props;
        reportePrincipal();
    }
    render(){
        const {data} = this.props;
        console.log("Data REESS", data);
        return(
            <div className="mt-2">
                
                {data && 
                <React.Fragment>
                <div className="d-flex flex-row justify-content-between">
                    <Formulario
                        onSubmit={()=>console.log(" ")}
                    />
                    <h3>Report Principal</h3>
                    <h3><RenderCurrency value={data.total}/></h3>
                </div>
                <h4>Reporte de Usuarios</h4>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>Total de Vehiculos</th>
                            <th>Total gastado en servicios</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.listado_con_vehiculos.map((registro, i)=>
                            <tr key={i}>
                                <td>{registro.first_name}</td>
                                <td>{registro.total_vehiculos}</td>
                                <td><RenderCurrency value={registro.total_gastado}/></td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <h4>Vehiculos</h4>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Modelo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.listado_vehiculos.map((registro, i)=>
                            <tr key={i}>
                                <td>{registro.nombre}</td>
                                <td>{registro.modelo}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <h4>Servicios</h4>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Modelo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.listado_servicios.map((registro, i)=>
                            <tr key={i}>
                                <td>{registro.nombre}</td>
                                <td>{registro.precio}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                </React.Fragment>
                }
            </div>
        );
    }
}

export default Reporte;