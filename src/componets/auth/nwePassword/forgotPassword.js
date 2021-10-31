import React, { Component } from "react";
import { Formik, Form } from 'formik';
import { TextField } from '../validation/textField';
import * as Yup from 'yup';
import { connect } from "react-redux";
import { getPassword } from "../../../redux/actions/auth";

class ForgotPassword extends Component {
    constructor(props) {
        super(props);

        this.password = this.password.bind(this);

        var search = window.location.search;
        var params = new URLSearchParams(search);

        this.state = {
            email: "",
            token: params.get("token"),
            urlEmail: params.get("email")
        };
    };

    password = () => {

        // this.setState({
        //     token: params.get("token"),
        //     urlEmail: params.get("email")
        // })
        console.log(this);
    }

    render = () => {

        const validate = Yup.object({
            email: Yup.string()
                .email('Email is invalid')
                .required('Email is required')
        })

        const { dispatch, message } = this.props;
        // console.log(this.props);
        return (<Formik
            initialValues={{
                email: '',
            }}
            validationSchema={validate}

            onSubmit={values => {

                this.setState({
                    loading: true,
                    email: values.email,
                })

                dispatch(getPassword(this.state.email))
                    .then(() => {
                        // window.location.reload();
                        this.setState({
                            loading: false
                        });
                    })
                    .catch(() => {
                        this.setState({
                            loading: false
                        });
                    });
            }}
        >
            {formik => (
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <div>
                                <h1 className="my-4 font-weight-bold .display-4">Forgot your password ?</h1>
                                <Form>
                                    <TextField label="Email" name="email" type="email" />
                                    {message && (
                                        <div className="form-group">
                                            <div className="alert alert-danger" role="alert">
                                                {message}
                                            </div>
                                        </div>
                                    )}
                                    <button className="btn btn-dark mt-3 mb-3" type="submit" disabled={this.state.loading}>
                                        {this.state.loading && (
                                            <span className="spinner-border spinner-border-sm"></span>
                                        )}Login</button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Formik>)
    }

}




function mapStateToProps(state) {
    const { message } = state.message;
    return {
        message,
    };
}

export default connect(mapStateToProps)(ForgotPassword);