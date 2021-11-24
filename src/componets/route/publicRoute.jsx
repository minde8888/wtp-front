import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "../../redux/actions/auth";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
// console.log(rest);
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        isLogin() && restricted ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
