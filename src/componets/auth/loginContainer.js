import React from 'react';
import { Formik, Form } from 'formik';
import { TextField } from './validation/textField';
import * as Yup from 'yup';
import { Link } from "react-router-dom";

const LoginContainer = () => {

    const validate = Yup.object({
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 charaters')
            .required('Password is required')
    })

    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validationSchema={validate}

            onSubmit={values => {
                console.log(values);
            }}
        >
            {formik => (
                <div>
                    <h1 className="my-4 font-weight-bold .display-4">Login</h1>
                    <Form>
                        <TextField label="Email" name="email" type="email" />
                        <TextField label="Password" name="password" type="password" />
                        <div className="container-fluid">
                            <div className="content row">
                                <button className="btn btn-dark mt-3 mb-3" type="submit">Login</button>
                                <Link className="text-info" to="/forgot-password">
                                    Forgot your password?
                                </Link>
                                <Link className="text-info col-md-2" to="/singup">
                                    Singup
                                </Link>
                            </div>
                        </div>
                    </Form>
                </div>
            )}
        </Formik>
    )
}



export default LoginContainer;