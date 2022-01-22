import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { logout } from "../../redux/actions/auth";
import { clearMessage } from "../../redux/actions/message";
import { history } from "../../helpers/helpers";
import { connect } from "react-redux";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    const search = window.location.search;
    const params = new URLSearchParams(search);

    this.state = {
      showEmployeeBoard: false,
      showManagerBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      token: params.get("token"),
      email: params.get("email"),
    };

    history.listen((location) => {
      props.dispatch(clearMessage());
    });
  }

  componentDidMount() {
    const data = this.props.data;
    if (data) {
      this.setState({
        name: data.name,
        currentUser: data,
        showManagerBoard: data.role.includes("Manager"),
        showEmployeeBoard: data.role.includes("Employee"),
        showAdminBoard: data.role.includes("Admin"),
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        name: this.props.data.name,
      });
    }
  }

  logOut() {
    this.props.dispatch(logout());
  }

  render() {
    const { name, showManagerBoard, showEmployeeBoard, currentUser } =
      this.state;

    return (
      <div>
        <div className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="navbar-nav me-auto mb-2 mb-lg-0">
            <div className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </div>
            <div className="nav-item">
              <NavLink className="nav-link" to="/table">
                Projects
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
            {showManagerBoard && (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink to={"/adduser"} className="nav-link">
                    Adduser
                  </NavLink>
                </li>
              </div>
            )}
            {showEmployeeBoard && (
              <div className="navbar-nav ml-auto">User ------</div>
            )}
            {currentUser ? (
              <div className="navbar-nav ml-auto">
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
                <li className="nav-item">
                  <NavLink to={"/login"} className="nav-link">
                    Login
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to={"/register"} className="nav-link">
                    Sign Up
                  </NavLink>
                </li>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {

  const { data } = state.user;
  const { isLoggedIn } = state.auth;

  return {
    data,
    isLoggedIn,
  };
}

export default connect(mapStateToProps)(NavBar);
