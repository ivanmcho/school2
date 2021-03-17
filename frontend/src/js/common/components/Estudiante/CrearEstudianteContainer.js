import { connect } from "react-redux";
import { actions } from "../../../redux/modules/estudiante/estudiante";

import Estudiante from "./CrearEstudiante";

const ms2p = (state) => {
    return {
        // ...state.perfil,
        // ...state.perfil,
        ...state.estudiante,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(Estudiante);
