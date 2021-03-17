import { connect } from "react-redux";
import { actions } from "../../../redux/modules/usuarios/usuariosPersonal";
import Listado from "./Listado";

const ms2p = (state) => {
    return {
        ...state.usuariosPersonal,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(Listado);
