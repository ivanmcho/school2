import { connect } from 'react-redux';
import {actions} from '../../../redux/modules/servicio/servicio'
import ListadoGrado from './ListadoServicio';


const ms2p = (state) => {
    return {
        ...state.servicio,        
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(ListadoGrado);