import React, { Component } from "react";
import PropTypes from "prop-types";
import { TableHeaderColumn } from "react-bootstrap-table";
import Grid from "../Utils/Grid";
import { standardActions } from "../Utils/Grid/StandardActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Cards from './Cards';


class Sucursal extends Component {
    componentWillMount = () => {
        this.props.listar();
    };

    render() {
        const {
            data,
            loader,
            searchChange,
            onPageChange,
            onSortChange,
            eliminar,
            listar,
            page,
        } = this.props;

        const datos = data.results;

        return (
            <div className="d-flex flex-column w-100 px-3">
                <div className="page-header pl-1 pt-3 no-gutters row">
                    <div className="text-sm-left text-center text-md-left mb-sm-0 col-12 col-sm-4">
                        <div
                            style={{
                                border: "1px solid #B3B8BC",
                                borderRadius:
                                    "0.8640833497047424px 22px 22px 0.8640833497047424px",
                                width: 100,
                                height: 25,
                                lineHeight: "23px",
                                textAlign: "center",
                                letterSpacing: "-0.36px",
                            }}
                            className="txt-12"
                        >
                            Grado
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-wrap mb-2  mt-4">
                    <h3 className="txt-22-n color-003 w-50">Grados</h3>

                    <div className="d-flex flex-row w-50 align-items-center justify-content-end">
                        <a className="btn btn-secondary mr-1" href="/#/grado/create">
                            Agregar grado
                        </a>

                        <div className="flex-fill d-flex align-items-center ml-3">
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => searchChange(e.target.value)}
                                placeholder="Buscar..."
                                style={{
                                    border: "2px solid #E5E5E5",
                                    borderRadius: "12px",
                                    paddingRight: "35px",
                                }}
                            />
                            <FontAwesomeIcon
                                icon={faSearch}
                                className="icono color-4AC"
                                style={{
                                    marginLeft: -35,
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="mb-4 col-12">
                    <div className="mb-4 card card-small">
                        <div className="border-bottom card-header"><h6 className="m-0">Administrar Grados</h6></div>
                            <div className="p-0 px-3 pt-3">
                                <Grid
                                    data={data}
                                    loading={loader}
                                    onPageChange={listar}
                                    page={page}
                                    onSortChange={onSortChange}
                                >
                                    

                                    <TableHeaderColumn dataField="nombre" dataSort>
                                        Nombre
                                    </TableHeaderColumn>

                                    <TableHeaderColumn
                                        dataField="nivel"
                                        dataSort
                                        dataFormat={(cell) => {
                                            return cell.nombre;
                                        }} //cell tiene solo el dato de datafiel
                                        //arrow si contiene todos los datos
                                    >
                                        Nivel
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        isKey
                                        dataField="id"
                                        dataAlign="center"
                                        dataSort
                                        dataFormat={standardActions({
                                            editar: "grado",
                                            leer: "grado",
                                            eliminar,
                                        })}
                                    >
                                        Acciones
                                    </TableHeaderColumn>
                                </Grid>
                            </div>
                    </div>
                </div>
                <div className="row">
                {datos.map((proyecto) => (
                        <Cards
                        key={proyecto.id}
                        datos={proyecto}
                    >   
                        </Cards>
                    ))}
            
                </div>
            </div>
        );
    }
}

export default Sucursal;
