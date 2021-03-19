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

import CrearGrado from "./common/components/Grado/CrearGradoContainer";
import Grado from "./common/components/Grado/ListadoContainer";

import CrearEstudiante from "./common/components/Estudiante/CrearEstudianteContainer";
import Estudiantes from "./common/components/Estudiante/ListadoContainer";

import CrearCatedratico from "./common/components/Catedratico/CrearCatedraticoContainer";
import Catedraticos from "./common/components/Catedratico/ListadoContainer";

import CrearProfesion from "./common/components/Profesion/CrearProfesionContainer";
import Profesiones from "./common/components/Profesion/ListadoContainer";



module.exports = (
    <div>
        <div className="container__content">
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/registro" component={Registro} />
                <ProtectedRoute exact path="/" component={Demo} />
                <ProtectedRoute exact path="/page2" component={Examples} />
                {/*<ProtectedRoute exact path="/user-profile" component={Profile} />*/}
                <ProtectedRoute exact path="/grids" component={Grids} />
                <ProtectedRoute exact path="/notifications" component={Notificaciones} />
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

                <Route component={NotFound} />
            </Switch>
        </div>
        <NotificationContainer />
    </div>
);
