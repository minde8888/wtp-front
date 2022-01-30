import React, { useEffect } from "react";
import { connect } from "react-redux";
import userImage from "../../image/user.png";
import Employees from "./employee/employees";
import "./profile.scss"

const Profile = (props) => {
  const { data, employees, width, height } = props;

  useEffect(() => employees);
  var id = { id: data.id };

  return (
    <div className="container">
      {data.role === "Manager" && (
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
            <strong>Name:</strong> {data.name}
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

          
          <div>
            <Employees {...employees} {...id} />
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
  
  const {data, employees, width, height } = state.user;

  return {
    data,
    employees,
    width,
    height
  };
}

export default connect(mapStateToProps)(Profile);
