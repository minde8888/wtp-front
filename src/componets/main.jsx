import React from "react";
import { Route } from "react-router-dom";
import NavBar from "./nav/nav.jsx";
import Singup from "./auth/singup";
import Login from "./auth/login.jsx";

const Main = () => {
  return (
    <div className="main">
      <div className="colom4">
        <NavBar />
      </div>
      <Route path="/singup" render={() => <Singup />} />
      <Route path="/login" render={() => <Login />} />
    </div>
  );
};

export default Main;
