import React, { Component } from "react";
import { Formik, Form } from 'formik';
import { TextField } from '../validation/textField';
import * as Yup from 'yup';
import { connect } from "react-redux";
import { getPassword } from "../../../redux/actions/newPasword";
import { clearPasswordMessage } from "../../../redux/actions/newPasword";

class ForgotPassword extends Component {
    constructor(props) {
        super(props);

        var search = window.location.search;
        var params = new URLSearchParams(search);

        this.state = {
            email: "",
            token: params.get("token"),
            urlEmail: params.get("email")
        };
        this.props.dispatch(clearPasswordMessage())
    };

    render = () => {

        const validate = Yup.object({
            email: Yup.string()
                .email('Email is invalid')
                .required('Email is required')
        })

        const { dispatch, message } = this.props;

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
                        this.setState({
                            loading: false,
                        });
                        values.email = ""
                    })
                    .catch(() => {
                        this.setState({
                            loading: false,
                        });
                    });
                values.email = ""

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
    const { message } = state.newPassword;

    return {
        message,
    };
}

export default connect(mapStateToProps)(ForgotPassword);