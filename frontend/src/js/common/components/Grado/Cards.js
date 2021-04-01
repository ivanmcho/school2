import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ datos }) => {
    console.log("Dentro de card:", datos);


    return (
        <React.Fragment>               
                    <div className=" col-lg-3">
                    <Link
                    //to={`ticket/${datos.id}/ver`}
                    //to={`estudiantes/`} asi le incluimos la anterior direccion
                    to={`grado/${datos.id}/ver`} 
                    style={{ textDecoration: "none", color: "#5a6169" }}
                    
                >
                        <div className="mb-4 card card-small">
                                <div class="card-body">
                                    <h5 className="card-title">{datos.nombre}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                                    <p className="card-text">{datos.descripcion}</p>
                                    <a href="#" className="card-link">Card link</a>
                                    <a href="#" className="card-link">Another link</a>
                                </div>
                        </div>
                        </Link>
                    </div>
        </React.Fragment>
    );
};

export default Cards;
