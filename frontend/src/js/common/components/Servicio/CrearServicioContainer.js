import { connect } from 'react-redux';
import {actions} from '../../../redux/modules/servicio/servicio'

import CrearGrado from './CrearServicio';


const ms2p = (state) => {
    return {
        ...state.servicio,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(CrearGrado);