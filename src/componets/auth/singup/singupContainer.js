import React, { Component } from "react";
import { Formik, Form } from 'formik';
import { TextField } from '../validation/textField';
import { MySelect } from '../validation/mySelect '
import * as Yup from 'yup';
import { connect } from "react-redux";
import { register } from "../../../redux/actions/auth";

class SignupContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      role: "",
      successful: false
    };
  }
  render = () => {

    var role = ["Manager", "Admin"]
    const { dispatch, message } = this.props;

    const validate = Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 charaters')
        .required('Password is required').matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Password must match')
        .required('Confirm password is required'),
      role: Yup.string().required("Please select a role").oneOf(role)
    })

    const roleOptions = role.map((r, key) => (
      <option value={r} key={key}>
        {r}
      </option>
    ));

    return (
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: ''
        }}
        validationSchema={validate}

        onSubmit={values => {

          this.setState({
            username: values.firstName,
            email: values.email,
            password: values.password,
            roles: values.role
          })

          dispatch(
            register(this.state.username, this.state.email, this.state.password, this.state.roles)
          )
            .then(() => {
              this.setState({
                successful: true,
              });
            })
            .catch(() => {
              this.setState({
                successful: false,
              });
            });
        }}
      >
        {formik => (
          <div>
            <h1 className="my-4 font-weight-bold .display-4">Sign Up</h1>
            <Form>
              <TextField label="First Name" name="firstName" type="text" />
              <TextField label="Last Name" name="lastName" type="text" />
              <TextField label="Email" name="email" type="email" />
              <TextField label="Password" name="password" type="password" />
              <TextField label="Confirm Password" name="confirmPassword" type="password" />
              <div id="my-radio-group">Role</div>
              <div role="group" aria-labelledby="my-radio-group">
                <MySelect name="role" as="select" className="select is-fullwidth">
                  <option value={""}>Velg Role</option>
                  {roleOptions}
                </MySelect>
              </div>
              {message && (
                <div className="form-group">
                  <div className={this.state.successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                    {message}
                  </div>
                </div>
              )}
              <button className="btn btn-dark mt-3" type="submit">Register</button>
              <button className="btn btn-danger mt-3 ml-3 ms-3" type="reset">Reset</button>
            </Form>
          </div>
        )}
      </Formik>
    )
  }
}

function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message,
  };
}

export default connect(mapStateToProps)(SignupContainer);
