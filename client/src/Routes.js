import React from 'react';
import {Route, Switch} from "react-router-dom";

import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";

// const ProtectedRoute = ({isAllowed, ...props}) => (
//     isAllowed ? <Route {...props}/> : <Redirect to="/login" />
// );

const Routes = ({user}) => (
    <Switch>
        {/*<ProtectedRoute*/}
            {/*isAllowed={user && user.role === 'admin'}*/}
            {/*path="/products/new"*/}
            {/*exact*/}
            {/*component={NewCafe}*/}
        {/*/>*/}
        <Route path="/register" exact component={Register}/>
        <Route path="/login" exact component={Login}/>
    </Switch>
);

export default Routes;