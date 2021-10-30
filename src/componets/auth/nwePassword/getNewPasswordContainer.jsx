import React, { Component } from "react";
import { Formik, Form } from "formik";
import { TextField } from "../validation/textField";
import * as Yup from "yup";
import { connect } from "react-redux";
import { getNewPassword } from "../../../redux/actions/newPasword";

class GetNewPasswordContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: "",
      email: "",
      password: "",
    };
  }

  render = () => {
    const { message, dispatch, token, email } = this.props;

    const validate = Yup.object({
      password: Yup.string()
        .min(6, "Password must be at least 6 charaters")
        .required("Password is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Password must match")
        .required("Confirm password is required"),
    });

    return (
      <Formik
        initialValues={{
            password: "",
            confirmPassword: ''
        }}
        validationSchema={validate}
        onSubmit={(values) => {
          this.setState({
            loading: true,
            password: values.password,
          });

          dispatch(getNewPassword(token, email, this.state.password))
            .then(() => {
              // window.location.reload();
              this.setState({
                loading: false,
              });
            })
            .catch(() => {
              this.setState({
                loading: false,
              });
            });
        }}
      >
        {(formik) => (
          <div>
            <h1 className="my-4 font-weight-bold .display-4"> New Password</h1>
            <Form>
              <TextField label="Password" name="password" type="password" />
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
              />
              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
              <button
                className="btn btn-dark mt-3 mb-3"
                type="submit"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                Send
              </button>
            </Form>
          </div>
        )}
      </Formik>
    );
  };
}

function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message,
  };
}

export default connect(mapStateToProps)(GetNewPasswordContainer);
