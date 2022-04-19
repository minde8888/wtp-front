import React, { lazy, Suspense } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import GetNewPassword from "./auth/nwePassword/getNewPassword";
import Signup from "./auth/signup/signup";
import PrivateRoute from "../route/privateRoute ";
import PublicRoute from "../route/publicRoute";
import ForgotPassword from "./auth/nwePassword/forgotPassword";
import Preloader from "./preloader/preloader";
// import ProgressPlan from "./progressPlan/progressPlan";
// import EmployeesToProject from "./progressPlan/addEmployees/employeesToProject";
// import TopTable from "./project/topTable";
// import Login from "./auth/login/login";
// import NavBar from "./nav/nav";
// import Profile from "./user/profile";
// import AddUser from "./addUser/addUser";
// import UpdateProfile from "./user/updateProfile/updateProfile";
// import EmployeeProfile from "./user/employee/employeeProfile";
// import Home from "./home/home";

const EmployeesToProject = lazy(() =>
  import("./progressPlan/addEmployees/employeesToProject")
);
const TopTable = lazy(() => import("./project/topTable"));
const Login = lazy(() => import("./auth/login/login"));
const NavBar = lazy(() => import("./nav/nav"));
const Profile = lazy(() => import("./user/profile"));
const AddUser = lazy(() => import("./addUser/addUser"));
const UpdateProfile = lazy(() => import("./user/updateProfile/updateProfile"));
const EmployeeProfile = lazy(() => import("./user/employee/employeeProfile"));
const Home = lazy(() => import("./home/home"));
const ProgressPlan = lazy(() => import("./progressPlan/progressPlan"));

const Main = () => {
  return (
    <div className="main">
      <GetNewPassword />

      <Suspense fallback={<Preloader />}>
        <Routes>
          <Route exact path="/" element={<PrivateRoute />}>
            <Route
              element={
                <>
                  <NavBar />
                  <Outlet />
                </>
              }
            >
              <Route exact path="/" element={<Home />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/update-profile" element={<UpdateProfile />} />
              <Route exact path="/adduser" element={<AddUser />} />
              <Route
                exact
                path="/employee-profile/:userId"
                element={<EmployeeProfile />}
              />
              <Route exact path="/table" element={<TopTable />} />
              <Route
                exact
                path="/progress-plan/:progressPlanId"
                element={<ProgressPlan />}
              />
            </Route>
          </Route>
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Suspense>
      {/* <Routes>
        <Suspense fallback={<Preloader />}>
          <PublicRoute
            restricted={false}
            component={Login}
            path="/login"
            exact
          />
          <PublicRoute
            restricted={false}
            component={Signup}
            path="/signup"
            exact
          />
          <PublicRoute
            restricted={false}
            component={ForgotPassword}
            path="/forgot-password"
            exact
          />
          <PrivateRoute component={NavBar} path="/" />
          <PrivateRoute component={Profile} path="/profile" exact />
          <PrivateRoute component={Home} path="/" exact />
          <PrivateRoute
            component={UpdateProfile}
            path="/update-profile"
            exact
          />
          <PrivateRoute component={AddUser} path="/adduser" exact />
          <PrivateRoute
            component={EmployeeProfile}
            path="/employee-profile/:userId?"
          />
          <PrivateRoute component={TopTable} path="/table" />
          <PrivateRoute
            component={ProgressPlan}
            path="/progress-plan/:progressPlanId?"
          />
          <PrivateRoute
            component={EmployeesToProject}
            path="/add-employees-project"
          />
        </Suspense>
      </Routes> */}
    </div>
  );
};

export default Main;
