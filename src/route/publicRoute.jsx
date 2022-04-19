import React from "react";
import { Route, Navigate } from "react-router-dom";
import store from '../redux/store';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {

  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        store.getState().auth.isLoggedIn && restricted ? (
          <Navigate to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
