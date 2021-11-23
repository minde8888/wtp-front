import React from "react";
import NavBar from "./nav/nav";
import { Switch } from "react-router-dom";
import GetNewPassword from "./auth/nwePassword/getNewPassword";
import Login from "./auth/login/login";
import Singup from "./auth/singup/singup";
import PrivateRoute from "./route/privateRoute ";
import PublicRoute from "./route/publicRoute";
import ForgotPassword from "./auth/nwePassword/forgotPassword";

const Main = () => {
  return (
    <div className="main">
      <div className="colom4">
       
        <GetNewPassword />
        <Switch>
          <PublicRoute restricted={false} component={Login} path="/login" exact />
          <PublicRoute restricted={true} component={Singup} path="/singup" exact />
          <PublicRoute restricted={true} component={ForgotPassword} path="/forgot-password" exact />
          <PrivateRoute component={NavBar} path="/" exact />
        </Switch>
      </div>
    </div>
  );
};

export default Main;
