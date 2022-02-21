import React from "react";
import { connect } from "react-redux";
import userImage from "../../image/user.png";
import Employees from "./employee/employees";
import "./profile.scss";

const Profile = (props) => {
  const { data, width, height } = props;

  var id = { id: data.id };

  return (
    <div className="container">
      {data.role === "Manager" && (
        <>
          <div className="container d-flex justify-content-around flex-wrap col-md-12 ">
            <div className="card ">
              <div className="text-center px-2 ">
                <img
                  width={width !== 0 ? width : null}
                  height={height !== 0 ? height : null}
                  src={data.imageName === null ? userImage : data.imageSrc}
                  alt={data.imageName}
                />
                <h3 className="mt-2">{data.name} {data.surname}</h3>
                <span className="mt-1 clearfix">Android Developer</span>
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
                  <button className="btn-outline-danger">Delete</button>
                  <button className="btn-outline-info">Profile</button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Employees {...data.employees} {...id} />
          </div>
        </>
      )}

      {data.role === "Employee" && (
        <>
          <header className="jumbotron">
            <h3>
              <strong>{data.name}</strong> Profile
            </h3>
          </header>
          <img
            width={width !== 0 ? width : null}
            height={height !== 0 ? height : null}
            src={data.imageName === null ? userImage : data.imageSrc}
            alt={data.imageName}
          />
          <p>
            <strong>Id:</strong> {data.id}
          </p>
          <p>
            <strong>Mobile Number:</strong> {data.mobileNumber}
          </p>
          <p>
            <strong>Email:</strong> {data.email}
          </p>
          <p>
            <strong>Role:</strong> {data.role}
          </p>
        </>
      )}
    </div>
  );
};

function mapStateToProps(state) {

  const { data, employees, width, height } = state.user;

  return {
    data,
    employees,
    width,
    height,
  };
}

export default connect(mapStateToProps)(Profile);
