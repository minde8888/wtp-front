import React, { Component } from "react";
import { Formik, Form } from 'formik';
import { TextField } from '../validation/textField';
import { MySelect } from '../validation/mySelect ';
import * as Yup from 'yup';
import { connect } from "react-redux";
import { register } from "../../../redux/actions/auth";

class SignupContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      lastName: '',
      phoneNumber: "",
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
      phoneNumber: Yup.string()
        .matches(/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
          'Phone number is not valid')
        .max(11, 'Must be 10 characters'),
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
          phoneNumber: "",
          email: '',
          password: '',
          confirmPassword: '',
          role: ''
        }}
        validationSchema={validate}

        onSubmit={values => {

          this.setState({
            userName: values.firstName,
            lastName: values.lastName,
            phoneNumber: values.phoneNumber,
            email: values.email,
            password: values.password,
            role: values.role
          })

          dispatch(
            register(
              this.state.userName,
              this.state.lastName,
              this.state.phoneNumber,
              this.state.email,
              this.state.password,
              this.state.role)
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
              <TextField label="+4712345678" name="phoneNumber" type="phoneNnumber" />
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
