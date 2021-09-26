import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="navbar-nav me-auto mb-2 mb-lg-0">
        <div className="nav-item">
          <NavLink className="nav-link" to="/innstillinger">
            Innstillinger
          </NavLink>
        </div>
        <div className="nav-item">
          <NavLink className="nav-link" to="/chat">
            chat
          </NavLink>
        </div>
        <div className="nav-item">
          <NavLink className="nav-link" to="/users">
            users
          </NavLink>
        </div>
        <div className="nav-item">
          <NavLink className="nav-link" to="/profile">
            profile
          </NavLink>
        </div>
      </div>
      <div className="d-flex align-items-center">
        <NavLink className="btn btn-link px-3 me-2" to="/login">
          Login
        </NavLink>
        <NavLink className="btn btn-primary me-3" to="/singup">
          Singup
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
