import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import AllPlaces from "./containers/AllPlaces/AllPlaces";
import PlaceForm from "./components/PlaceForm/PlaceForm";
import OnePlace from "./components/OnePlace/OnePlace";

const ProtectedRoute = ({isAllowed, ...props}) => (
    isAllowed ? <Route {...props}/> : <Redirect to="/login" />
);

const Routes = ({user}) => (
    <Switch>
        <Route path="/places" exact component={AllPlaces}/>
        <ProtectedRoute
            isAllowed={user}
            path="/new-place"
            exact
            component={PlaceForm}
        />
        <Route path="/places/:id" exact component={OnePlace}/>
        <Route path="/register" exact component={Register}/>
        <Route path="/login" exact component={Login}/>
    </Switch>
);

export default Routes;