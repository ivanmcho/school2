import React from 'react';
import {
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import {Login,  Registro} from './common/components/LoginRegister';
import Demo from './common/components/Demo/Demo';
import ProtectedRoute from './ProtectedRoute';
import ProtectedEstudent from './ProtectedEstudent';
import ProtectedTeacher from './ProtectedTeacher';
import Examples from './common/components/Examples/Basic';
import NotFound from './common/components/layout/NotFound/NotFound';

import '../assets/fonts/fonts.css';

require('../../node_modules/font-awesome/css/font-awesome.css');
require('../../node_modules/bootstrap/dist/css/bootstrap.css');
import 'bootstrap/dist/css/bootstrap.min.css';
import Grids from "./common/components/Examples/Grids";
import Notificaciones from './common/components/Examples/Notificaciones';
import ExampleTabs from './common/components/Examples/Tabs/Tabs';
require('../style/index.css');


import CrearNivel from "./common/components/Nivel/CrearNivelContainer";
import Nivel from "./common/components/Nivel/ListadoContainer";

import CrearRol from "./common/components/Rol/CrearRolContainer";
import Rol from "./common/components/Rol/ListadoContainer";

import CrearSeccion from "./common/components/Seccion/CrearSeccionContainer";
import Secciones from "./common/components/Seccion/ListadoContainer";

import CrearCurso from "./common/components/Curso/CrearCursoContainer";
import Cursos from "./common/components/Curso/ListadoContainer";

import CrearGrado from "./common/components/Grado/CrearGradoContainer";
import Grado from "./common/components/Grado/ListadoContainer";

import CrearEstudiante from "./common/components/Estudiante/CrearEstudianteContainer";
import Estudiantes from "./common/components/Estudiante/ListadoContainer";

import CrearCatedratico from "./common/components/Catedratico/CrearCatedraticoContainer";
import Catedraticos from "./common/components/Catedratico/ListadoContainer";

import CrearProfesion from "./common/components/Profesion/CrearProfesionContainer";
import Profesiones from "./common/components/Profesion/ListadoContainer";

import CrearAsignacion from "./common/components/Asignacion/CrearAsignacionContainer";
import Asignaciones from "./common/components/Asignacion/ListadoContainer";

import ResetPass from "./common/components/resetPass/ResetPassContainer";

import VerificationEmail from "./common/components/LoginRegister/VerificationEmail/VerificationContainer";

module.exports = (
    <div>
        <div className="container__content">
            <Switch>
                <Route
                    exact
                    path="/verification/:token"
                    component={VerificationEmail}
                />
                <Route exact path="/login" component={Login} />
                <Route exact path="/registro" component={Registro} />
                <ProtectedRoute exact path="/" component={Demo} />
                <ProtectedRoute exact path="/page2" component={Examples} />
                {/*<ProtectedRoute exact path="/user-profile" component={Profile} />*/}
                <ProtectedEstudent exact path="/grids" component={Grids} />
                <ProtectedTeacher exact path="/notifications" component={Notificaciones} />
                <ProtectedRoute exact path="/tabs" component={ExampleTabs} />

                {/* __________________Nivel_____ */}
                <ProtectedRoute exact path="/nivel" component={Nivel} />
                <ProtectedRoute
                    exact
                    path="/nivel/:id/ver"
                    component={CrearNivel}
                />
                <ProtectedRoute
                    exact
                    path="/nivel/:id/editar"
                    component={CrearNivel}
                />
                <ProtectedRoute
                    exact
                    path="/nivel/create"
                    component={CrearNivel}
                />
                {/* __________________Rol_____ */}
                <ProtectedRoute exact path="/rol" component={Rol} />
                <ProtectedRoute
                    exact
                    path="/rol/:id/ver"
                    component={CrearRol}
                />
                <ProtectedRoute
                    exact
                    path="/rol/:id/editar"
                    component={CrearRol}
                />
                <ProtectedRoute
                    exact
                    path="/rol/create"
                    component={CrearRol}
                />
                {/* ____________Grado________ */}
                <ProtectedRoute exact path="/grado" component={Grado} />
                <ProtectedRoute
                    exact
                    path="/grado/:id/ver"
                    component={CrearGrado}
                />
                <ProtectedRoute
                    exact
                    path="/grado/:id/editar"
                    component={CrearGrado}
                />
                <ProtectedRoute
                    exact
                    path="/grado/create"
                    component={CrearGrado}
                />
                {/* ____________Estudiante________ */}
                <ProtectedRoute
                    exact
                    path="/estudiante/create"
                    component={CrearEstudiante}
                />
                <ProtectedRoute
                    exact
                    path="/estudiante/:id/ver"
                    component={CrearEstudiante}
                />
                <ProtectedRoute
                    exact
                    path="/estudiante/:id/editar"
                    component={CrearEstudiante}
                />
                <ProtectedRoute exact path="/estudiantes" component={Estudiantes} />

                {/* ____________Catedratico________ */}
                <ProtectedRoute
                    exact
                    path="/catedratico/create"
                    component={CrearCatedratico}
                />
                <ProtectedRoute
                    exact
                    path="/catedratico/:id/ver"
                    component={CrearCatedratico}
                />
                <ProtectedRoute
                    exact
                    path="/catedratico/:id/editar"
                    component={CrearCatedratico}
                />
                <ProtectedRoute exact path="/catedraticos" component={Catedraticos} />

                {/* __________Profesion________ */}
                <ProtectedRoute
                    exact
                    path="/profesion/create"
                    component={CrearProfesion}
                />
                <ProtectedRoute
                    exact
                    path="/profesion/:id/ver"
                    component={CrearProfesion}
                />
                <ProtectedRoute
                    exact
                    path="/profesion/:id/editar"
                    component={CrearProfesion}
                />
                <ProtectedRoute exact path="/profesiones" component={Profesiones} />

                {/* __________Asignacion________ */}
                <ProtectedRoute
                    exact
                    path="/asignacion/create"
                    component={CrearAsignacion}
                />
                <ProtectedRoute
                    exact
                    path="/asignaicon/:id/ver"
                    component={CrearAsignacion}
                />
                <ProtectedRoute
                    exact
                    path="/asignacion/:id/editar"
                    component={CrearAsignacion}
                />
                <ProtectedRoute exact path="/asignaciones" component={Asignaciones} />
                {/* __________Seccion________ */}
                <ProtectedRoute
                    exact
                    path="/seccion/create"
                    component={CrearSeccion}
                />
                <ProtectedRoute
                    exact
                    path="/seccion/:id/ver"
                    component={CrearSeccion}
                />
                <ProtectedRoute
                    exact
                    path="/seccion/:id/editar"
                    component={CrearSeccion}
                />
                <ProtectedRoute exact path="/secciones" component={Secciones} />

                {/* __________Curso________ */}
                <ProtectedRoute
                    exact
                    path="/curso/create"
                    component={CrearCurso}
                />
                <ProtectedRoute
                    exact
                    path="/curso/:id/ver"
                    component={CrearCurso}
                />
                <ProtectedRoute
                    exact
                    path="/curso/:id/editar"
                    component={CrearCurso}
                />
                <ProtectedRoute exact path="/cursos" component={Cursos} />

                {/* __________Reset_Password________ */}
                <ProtectedRoute exact path="/resetpass" component={ResetPass} />

                <Route component={NotFound} />
            </Switch>
        </div>
        <NotificationContainer />
    </div>
);
