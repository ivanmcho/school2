import { connect } from "react-redux";
import { actions } from "../../../redux/modules/asignacion/asignacion";

import CrearAsignacion from "./CrearAsignacion";

const ms2p = (state) => {
    return {
        // ...state.perfil,
        // ...state.perfil,
        ...state.asignacion,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(CrearAsignacion);
