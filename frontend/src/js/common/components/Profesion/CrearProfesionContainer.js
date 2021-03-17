import { connect } from "react-redux";
import { actions } from "../../../redux/modules/profesion/profesion";

import CrearProfesion from "./CrearProfesion";

const ms2p = (state) => {
    return {
        ...state.profesion,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(CrearProfesion);
