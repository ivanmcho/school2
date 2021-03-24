import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logOut, getMe } from "./redux/modules/cuenta/login";

// maquetado base
import SideBarEstudent from "./common/components/layout/Sidebar/SideBarEstudent";
import Footer from "./common/components/layout/Footer/Footer";

import Navbar from "./common/components/layout/Navbar/Navbar";
import { VerifyLogin } from "./common/components/layout";


class PrivateRouteBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggleOpen: true,
        };
    }

    navToggle = () => {
        this.setState({ toggleOpen: !this.state.toggleOpen });
    };

    isAuthenticated = () => {
        const token = localStorage.getItem("token");
        const { getMe, login: { me } } = this.props;
        if (!!token && !!me.username) {
            return true;
        } else if(token) {
            getMe();
            return "Verifying"
        }
        return false;
    };
    isEstudent = () => {
        const { getMe, login: { me } } = this.props;
        try{
            if (me.rol.nombre === 'Estudiante') {
                console.log("Es estudiante")
                return true;
            }else{
                return false;
            }
        } catch (error) {
            return false
        }
    };

    render() {
        const {
            component: Component,
            logOut,
            login: { me },
            ...rest
        } = this.props;
        const isAuthenticated = this.isAuthenticated();
        const isEstudent = this.isEstudent();
        let tipo = "main-content p-0";
        if (isEstudent === true) {
            tipo =
                "main-content p-0 col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2";
        }
        return (
            <Route
                {...rest}
                render={(props) =>
                    isAuthenticated ? (
                        isAuthenticated === true ? (
                            <div>
                                {isEstudent === true ? (
                                    <SideBarEstudent
                                        toggleOpen={this.state.toggleOpen}
                                        navToggle={this.navToggle}
                                        logOut={logOut}
                                        user={me}
                                    />
                                ) : <Redirect
                                to={{
                                    pathname: "/login",
                                    state: { from: props.location },
                                }}
                            />}
                                <main className={tipo}>
                                    <div className="main-navbar bg-white sticky-top">
                                        <div className="p-0 container">
                                            <Navbar
                                                navToggle={this.navToggle}
                                                logOut={logOut}
                                                user={me}
                                            />
                                        </div>
                                    </div>
                                    <div className="main-content-container px-4 container-fluid">
                                        <Component {...props} />
                                    </div>

                                    <Footer />
                                </main>
                            </div>
                        ) : (
                            <VerifyLogin />
                        )
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location },
                            }}
                        />
                    )
                }
            />
        );
    }
}

const mstp = (state) => ({ ...state });

const mdtp = { logOut, getMe };

const ProtectedRoute = connect(mstp, mdtp)(PrivateRouteBase);

export default ProtectedRoute;
