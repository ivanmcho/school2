import { connect } from "react-redux";
import { actions } from "../../../redux/modules/catedratico/catedratico";
import Listado from "./ListadoCatedratico";

const ms2p = (state) => {
    return {
        ...state.catedratico,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(Listado);
