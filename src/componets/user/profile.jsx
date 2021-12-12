import React, { useEffect } from "react";
import { connect } from "react-redux";
import userImage from "../../image/user.png";
import Employees from "./employee/employees";

const Profile = (props) => {
  const { user, employees } = props;

  useEffect(() => user);
  var id = { id: user.id };
  return (
    <div className="container">
      {user.role === "Manager" && (
        <>
          <header className="jumbotron">
            <h3>
              <strong>{user.name}</strong> Profile
            </h3>
          </header>
          <img
            src={user.imageName === null ? userImage : user.imageSrc}
            alt={user.imageName}
          />
          <p>
            <strong>Id:</strong> {user.id}
          </p>
          <p>
            <strong>Mobile Numbe:</strong> {user.mobileNumber}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
          <div>
            <Employees {...employees} {...id} />
          </div>
        </>
      )}

      {user.role === "Employee" && (
        <>
          <header className="jumbotron">
            <h3>
              <strong>{user.name}</strong> Profile
            </h3>
          </header>
          <img
            src={user.imageName === null ? userImage : user.imageSrc}
            alt={user.imageName}
          />
          <p>
            <strong>Id:</strong> {user.id}
          </p>
          <p>
            <strong>Mobile Numbe:</strong> {user.mobileNumber}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
        </>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  const { user, employees } = state.auth.data;
  return {
    user,
    employees,
  };
}

export default connect(mapStateToProps)(Profile);
