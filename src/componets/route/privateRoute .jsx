import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from "../../redux/actions/auth";

const PrivateRoute = ({component: Component, ...rest}) => {
    console.log(1111);
console.log(isLogin());

    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isLogin() ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;