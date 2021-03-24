import { connect } from "react-redux";
import { actions } from "../../../redux/modules/asignacion/asignacion";
import Listado from "./ListadoAsignacion";

const ms2p = (state) => {
    return {
        ...state.asignacion,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(Listado);
