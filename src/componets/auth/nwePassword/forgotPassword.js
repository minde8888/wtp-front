import React, { Component } from "react";
import { Formik, Form } from 'formik';
import { TextField } from '../validation/textField';
import * as Yup from 'yup';
import { connect } from "react-redux";
import { getPassword } from "../../../redux/actions/auth";

class ForgotPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
        };
    };

    render = () => {

        const validate = Yup.object({
            email: Yup.string()
                .email('Email is invalid')
                .required('Email is required')
        })

        const { dispatch, message } = this.props;
        console.log(this.props);
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