import { connect } from "react-redux";
import { actions } from "../../../redux/modules/catedratico/catedratico";

import Catedratico from "./CrearCatedratico";

const ms2p = (state) => {
    return {
        // ...state.perfil,
        // ...state.perfil,
        ...state.catedratico,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(Catedratico);
