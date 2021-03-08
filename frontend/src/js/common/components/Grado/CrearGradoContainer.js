import { connect } from 'react-redux';
import {actions} from '../../../redux/modules/grado/grado'

import CrearGrado from './CrearGrado';


const ms2p = (state) => {
    return {
        ...state.grado,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(CrearGrado);