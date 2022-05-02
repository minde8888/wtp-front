import React from "react";
import userImage from "../../../image/user.png";
import { NavLink } from "react-router-dom";
import store from "../../../redux/store";
import { deleteUser } from "../../../redux/actions/user";
import "./employees.scss";

const Employees = ({ employees }) => {
  var handleClick = (id, role) => {
    store.dispatch(deleteUser(id, role));
  };
  if (!employees) {
    return null;
  }
  return (
    <div>
      {employees.map((u, k) => {
        return (
          <div key={k}>
            <div className="card ">
              <div className="text-center px-2 ">
                <img
                  src={u.imageName === null ? userImage : u.imageSrc}
                  alt={u.imageName}
                />
                <h3 className="mt-2">
                  {u.name} {u.surname}
                </h3>
                <span className="mt-1 clearfix">
                  Occupation: {u.occupation}
                </span>
                <div className="buttons px-2 mt-3">
                  <div className="col-md-4 btn-outline-secondary">
                    <h5>Project</h5>
                  </div>
                  <div className="col-md-4 btn-outline-secondary">
                    <h5>Telf</h5>
                  </div>
                  <div className="col-md-4 btn-outline-secondary">
                    <h5>Email</h5>
                  </div>
                </div>
                <hr className="line" />{" "}
                <small className="mt-4">
                  I am an android developer working at google Inc at
                  california,USA
                </small>
                <div className="buttons px-2 ">
                  <button
                    className="btn-outline-danger"
                    onClick={() => handleClick(u.id, u.role)}
                  >
                    Delete
                  </button>
                  <NavLink to={"/employee-profile/" + u.id}>
                    <button className="btn-outline-info">Profile</button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Employees;
