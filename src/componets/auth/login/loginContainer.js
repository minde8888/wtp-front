import React, { Component } from "react";
import { Formik, Form } from 'formik';
import { TextField } from '../validation/textField';
import * as Yup from 'yup';
import { Link, Redirect } from "react-router-dom";
import { login } from "../../../redux/actions/auth";
import { connect } from "react-redux";

class LoginContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            loading: false,
        };
    }

    render = () => {
        const { isLoggedIn, message } = this.props;

        const validate = Yup.object({
            email: Yup.string()
                .email('Email is invalid')
                .required('Email is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 charaters')
                .required('Password is required')
        })

        const { dispatch } = this.props;

        if (isLoggedIn) {
            return <Redirect to="/profile" />;
        }

        return (
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={validate}

                onSubmit={values => {

                    this.setState({
                        loading: true,
                        email: values.email,
                        password: values.password
                    })

                    dispatch(login(this.state.email, this.state.password))
                        .then(() => {
                           window.location.reload();
                        })
                        .catch(() => {
                            this.setState({
                                loading: false
                            });                          
                        });
                }}
            >
                {formik => (
                    <div>
                        <h1 className="my-4 font-weight-bold .display-4">Login</h1>
                        <Form>
                            <TextField label="Email" name="email" type="email" />
                            <TextField label="Password" name="password" type="password" />
                            {message && (
                                <div className="form-group">
                                    <div className="alert alert-danger" role="alert">
                                        {message}
                                    </div>
                                </div>
                            )}
                            <div className="container-fluid">
                                <div className="content row">
                                    <button className="btn btn-dark mt-3 mb-3" type="submit" disabled={this.state.loading}>
                                        {this.state.loading && (
                                            <span className="spinner-border spinner-border-sm"></span>
                                        )}Login</button>
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
}

function mapStateToProps(state) {
    const { isLoggedIn } = state.auth;
    const { message } = state.message;
    return {
        isLoggedIn,
        message
    };
}

export default connect(mapStateToProps)(LoginContainer);
