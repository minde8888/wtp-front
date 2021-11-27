import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "../redux/actions/auth";
import store from '../redux/store';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {

  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        store.getState().auth.isLoggedIn && restricted ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
