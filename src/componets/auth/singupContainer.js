import React from 'react';
import { Formik, Form } from 'formik';
import { TextField } from './validation/textField';
import {MySelect} from './validation/mySelect '
import * as Yup from 'yup';

const SignupContainer = () => {

  var role = ["Manager", "Admin"]

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
      .required('Password is required'),
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
        console.log(values);
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
            <button className="btn btn-dark mt-3" type="submit">Register</button>
            <button className="btn btn-danger mt-3 ml-3 ms-3" type="reset">Reset</button>
          </Form>
        </div>
      )}
    </Formik>
  )
}



export default SignupContainer;