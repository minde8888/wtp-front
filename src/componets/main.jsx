import React from "react";
import NavBar from "./nav/nav";
import { Switch } from "react-router-dom";
import GetNewPassword from "./auth/nwePassword/getNewPassword";
import Login from "./auth/login/login";
import Singup from "./auth/singup/singup";
import PrivateRoute from "../route/privateRoute ";
import PublicRoute from "../route/publicRoute";
import ForgotPassword from "./auth/nwePassword/forgotPassword";
import Profile from "./user/profile";
import UpdateProfile from "./user/updateProfile/updateProfile";
import AddUser from "./addUser/addUser";
import EmployeeProfile from "./user/employee/employeeProfile";


const Main = () => {
  return (
    <div className="main">
      <div className="colom4">       
        <GetNewPassword />
        <Switch>
          <PublicRoute restricted={false} component={Login} path="/login" exact />
          <PublicRoute restricted={false} component={Singup} path="/singup" exact />
          <PublicRoute restricted={false} component={ForgotPassword} path="/forgot-password" exact />
          <PrivateRoute component={NavBar} path="/" exact />
          <PrivateRoute component={Profile} path="/profile" exact />
          <PrivateRoute component={UpdateProfile} path="/update-profile" exact />
          <PrivateRoute component={AddUser} path="/adduser" exact />
          <PrivateRoute component={EmployeeProfile} path="/employee-profile/:userId?" />
        </Switch>
      </div>
    </div>
  );
};

export default Main;
