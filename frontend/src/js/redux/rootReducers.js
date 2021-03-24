import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'
import login from './modules/cuenta/login';
import register from './modules/cuenta/register';
import profile from './modules/cuenta/profile';
import usuarios from './modules/usuarios/usuarios';
import notificaciones from './modules/notificaciones/notificaciones';

import nivel from './modules/nivel/nivel'
import seccion from './modules/seccion/seccion'
import rol from './modules/rol/rol'
import grado from './modules/grado/grado'
import usuariosPersonal from "./modules/usuarios/usuariosPersonal";
import estudiante from "./modules/estudiante/estudiante";
import profesion from "./modules/profesion/profesion";
import catedratico from "./modules/catedratico/catedratico";
import asignacion from "./modules/asignacion/asignacion";
import curso from "./modules/curso/curso";

import resetPass from "./modules/resetPass/resetpass";
import verificationEmail from "./modules/verificationEmail/verificationEmail";


export default combineReducers({
    form: formReducer,
    login,
    register,
    profile,
    usuarios,
    routing,
    notificaciones,
    nivel,
    grado,
    usuariosPersonal,
    rol,
    estudiante,
    profesion,
    catedratico,
    asignacion,
    seccion,
    curso,
    resetPass,
    verificationEmail,
});
