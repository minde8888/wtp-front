import React from "react";
import LoginContainer from '../login/loginContainer'

const Login = () => {
    return (
        <div className="container mt-3">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <LoginContainer />
            </div>
            <div className="col-md-7 my-auto">
              <img className="img-fluid w-100" alt=""/>
            </div>
          </div>
        </div>
      );
};

export default Login;