import { connect } from 'react-redux';
import {actions} from '../../../redux/modules/vehiculo/vehiculo'
import ListadoGrado from './ListadoVehiculo';


const ms2p = (state) => {
    return {
        ...state.vehiculo,        
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(ListadoGrado);