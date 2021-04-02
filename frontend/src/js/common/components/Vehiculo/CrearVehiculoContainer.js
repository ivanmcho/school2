import { connect } from 'react-redux';
import {actions} from '../../../redux/modules/vehiculo/vehiculo'

import CrearGrado from './CrearVehiculo';


const ms2p = (state) => {
    return {
        ...state.vehiculo,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(CrearGrado);