import React, { lazy, Suspense } from "react";
import { Switch } from "react-router-dom";
import GetNewPassword from "./auth/nwePassword/getNewPassword";
import Signup from "./auth/signup/signup";
import PrivateRoute from "../route/privateRoute ";
import PublicRoute from "../route/publicRoute";
import ForgotPassword from "./auth/nwePassword/forgotPassword";
import Preloader from "./preloader/preloader";

const TopTable = lazy(() => import('./project/topTable'));
const Login = lazy(() => import('./auth/login/login'));
const NavBar = lazy(() => import('./nav/nav'));
const Profile = lazy(() => import('./user/profile'));
const AddUser = lazy(() => import('./addUser/addUser'));
const UpdateProfile = lazy(() => import('./user/updateProfile/updateProfile'));
const EmployeeProfile = lazy(() => import('./user/employee/employeeProfile'));
const Home =lazy(()=> import('./home/home'))
const BigCalendar =lazy(()=> import('./calendar/calendar'))


const Main = () => {
  return (
    <div className="main">
      <div className="colom-4">       
        <GetNewPassword />
        <Switch>
          <Suspense fallback={<Preloader />}>
            <PublicRoute restricted={false} component={Login} path="/login" exact />
            <PublicRoute restricted={false} component={Signup} path="/signup" exact />
            <PublicRoute restricted={false} component={ForgotPassword} path="/forgot-password" exact />
            <PrivateRoute component={NavBar} path="/" />
            <PrivateRoute component={Profile} path="/profile" exact />
             <PrivateRoute component={Home} path="/" exact />           
            <PrivateRoute component={UpdateProfile} path="/update-profile" exact />
            <PrivateRoute component={AddUser} path="/adduser" exact />
            <PrivateRoute component={EmployeeProfile} path="/employee-profile/:userId?" /> 
            <PrivateRoute component={TopTable} path="/table" /> 
            <PrivateRoute component={BigCalendar} path="/calendar" /> 
          </Suspense>
        </Switch>
      </div>
    </div>
  );
};

export default Main;


