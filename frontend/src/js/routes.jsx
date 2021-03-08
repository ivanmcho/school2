import React from 'react';
import {
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import {Login, Profile, Registro} from './common/components/LoginRegister';
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

import CrearGrado from "./common/components/Grado/CrearGradoContainer";
import Grado from "./common/components/Grado/ListadoContainer";

module.exports = (
    <div>
        <div className="container__content">
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/registro" component={Registro} />
                <ProtectedRoute exact path="/" component={Demo} />
                <ProtectedRoute exact path="/page2" component={Examples} />
                <ProtectedRoute exact path="/user-profile" component={Profile} />
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


                <Route component={NotFound} />
            </Switch>
        </div>
        <NotificationContainer />
    </div>
);
