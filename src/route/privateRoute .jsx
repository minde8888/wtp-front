import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import store from '../redux/store';

const PrivateRoute = () => {
    return store.getState().auth.isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
    // return (
    // //    store.getState().auth.isLoggedIn ? <Component /> : <Navigate to="/login" />
    //     // Show the component only when the user is logged in
    //     // Otherwise, redirect the user to /signin page
    //     <Route {...rest} render={props => (
    //         store.getState().auth.isLoggedIn ?
    //             <Component {...props} />
    //         : <Navigate to="/login" />
    //     )} />
    // );
};

export default PrivateRoute;