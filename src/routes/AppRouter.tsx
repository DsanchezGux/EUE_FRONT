import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Home from '../pages/Home/Home';
import Login from '../pages/Auth/Login/Login';
import Register from '../pages/Auth/Register/Register';
import Ingreso from '../pages/EUE/Ingreso/Ingreso';
import PlanIntervencion from '../pages/EUE/PI/PlanIntervencion';

import EUENavBar from '../pages/EUE/NavBar/EUENavBar';

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <EUENavBar></EUENavBar>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/ingreso" component={Ingreso} />
                    <Route path="/pi" component={PlanIntervencion} />
                    <Route exact path="/" component={Home} />

                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    );
};
