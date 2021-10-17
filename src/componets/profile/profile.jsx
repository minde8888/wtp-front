import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import userImage from "../../image/user.png";
import Preloader from "../preloader/preloader";
import AddUser from "../profile/addUser/addUser";

class Profile extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { user } = this.props;

    if (!user) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{user.Name}</strong> Profile
          </h3>
        </header>
        <img
          src={user.ImageSrc != null ? user.ImageSrc : userImage}
          alt={user.ImageName}
        />
        <p>
          <strong>Token:</strong> {user.Token.substring(0, 20)} ...{" "}
          {user.Token.substr(user.Token.length - 20)}
        </p>
        <p>
          <strong>Id:</strong> {user.Id}
        </p>
        <p>
          <strong>Email:</strong> {user.Email}
        </p>
        <p>
          <strong>Role:</strong> {user.Role}
        </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Profile);
