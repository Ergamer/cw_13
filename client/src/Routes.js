import React from 'react';
import {Route, Switch} from "react-router-dom";

import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import AllPlaces from "./containers/AllPlaces/AllPlaces";
import PlaceForm from "./components/PlaceForm/PlaceForm";
import OnePlace from "./components/OnePlace/OnePlace";


const Routes = ({user}) => (
    <Switch>
        <Route path="/places" component={AllPlaces}/>
        <Route path="/new-place" exact component={PlaceForm}/>
        <Route path="/places/:id" exact component={OnePlace}/>
        <Route path="/register" exact component={Register}/>
        <Route path="/login" exact component={Login}/>
    </Switch>
);

export default Routes;