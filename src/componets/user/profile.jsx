import React, { Component } from "react";
import { connect } from "react-redux";
import userImage from "../../image/user.png";
import Employees from "./employee/employees";

class Profile extends Component {
  render() {
    const { user, employees } = this.props;

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{user.name}</strong> Profile
          </h3>
        </header>
        <img
          src={user.imageSrc != null ? user.imageSrc : userImage}
          alt={user.imageName}
        />
        <p>
          <strong>Id:</strong> {user.id}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
        <div>
          <Employees {...employees} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {

  const { user, employees } = state.auth.data;
  return {
    user,
    employees,
  };
}

export default connect(mapStateToProps)(Profile);
