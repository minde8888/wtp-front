import React, { Component } from "react";
import { Router, NavLink, Route } from "react-router-dom";
import { logout } from "../../redux/actions/auth";
import { clearMessage } from "../../redux/actions/message";
import { history } from "../../hjelpers/history";
import { connect } from "react-redux";
import Singup from "../auth/singup/singup";
import Login from "../auth/login/login";
import Profile from "../profile/profile";

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this);

    this.state = {
      showManagerBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;
    // console.log(this.props);
    if (user) {
      this.setState({
        currentUser: user,
        showManagerBoard: user.Role.includes("Manager"),
        showAdminBoard: user.Role.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    this.props.dispatch(logout());
  }

  render() {
    const { currentUser, showManagerBoard, showAdminBoard } = this.state;

    return (
      <Router history={history}>
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
            {showManagerBoard ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink to={"/profile"} className="nav-link">
                    {currentUser.Name}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <NavLink className="btn btn-link px-3 me-2" to="/login">
                  Login
                </NavLink>
                <NavLink className="btn btn-primary me-3" to="/singup">
                  Singup
                </NavLink>
              </div>
            )}
          </div>
        </div>
        <div>
          <Route path="/singup" render={() => <Singup />} />
          <Route path="/login" render={() => <Login />} />
          <Route path="/profile" render={() => <Profile />} />
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user
  };
}

export default connect(mapStateToProps)(NavBar);
