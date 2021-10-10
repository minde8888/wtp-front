import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Profile extends Component {
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
