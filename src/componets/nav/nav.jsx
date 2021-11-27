import React, { Component } from "react";
import { Router, NavLink, Route } from "react-router-dom";
import { logout } from "../../redux/actions/auth";
import { clearMessage } from "../../redux/actions/message";
import { history } from "../../hjelpers/history";
import { connect } from "react-redux";
import Singup from "../auth/singup/singup";
import Login from "../auth/login/login";
import Profile from "../user/profile";
import UpdateProfile from "../user/updateProfile/updateProfile";
import AddUser from "../addUser/addUser";
import ForgotPassword from "../auth/nwePassword/forgotPassword";
import EmployeeProfile from "../user/employee/employeeProfile";

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this);

    const search = window.location.search;
    const params = new URLSearchParams(search);

    this.state = {
      showManagerBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      token: params.get("token"),
      email: params.get("email"),
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;
    if (user) {
      this.setState({
        name: user.name,
        showManagerBoard: user.role.includes("Manager"),
        showAdminBoard: user.role.includes("Admin"),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const user = this.props.user;
    if (prevProps !== user && !prevState.showManagerBoard) {
      this.setState({
        currentUser: user,
        showManagerBoard: user.role.includes("Manager"),
        showAdminBoard: user.role.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    this.props.dispatch(logout());
  }

  render() {
    const { name, showManagerBoard } = this.state;

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
                  <NavLink to={"/adduser"} className="nav-link">
                    Adduser
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={"/update-profile"} className="nav-link">
                    {name}
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
          <Route path="/update-profile" render={() => <UpdateProfile />} />
          <Route path="/adduser" render={() => <AddUser />} />
          <Route path="/forgot-password" render={() => <ForgotPassword />} />
          <Route
            path="/employee-profile/:userId?"
            render={() => <EmployeeProfile />}
          />
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {

  const { user } = state.auth.data;
  const { isLoggedIn } = state.auth;

  return {
    user,
    isLoggedIn,
  };
}

export default connect(mapStateToProps)(NavBar);
