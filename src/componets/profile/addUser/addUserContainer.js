import React, { Component } from "react";
import { Formik, Form } from 'formik';
import { TextField } from '../validation/textField';
import { MySelect } from '../validation/mySelect '
import * as Yup from 'yup';
import { connect } from "react-redux";
import { addItem } from "../../../redux/actions/addItem";

class AddUserContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            surname: "",
            occupation: "",
            mobile: "",
            email: "",
            role: ''
        };

    }
    render = () => {

        var role = ["Manager", "Admin"]
        const { dispatch, message } = this.props;

        const validate = Yup.object({
            name: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            surname: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
            occupation: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
            mobile: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
            email: Yup.string()
                .email('Email is invalid')
                .required('Email is required'),
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
                    name: "",
                    surname: "",
                    occupation: "",
                    mobile: "",
                    email: "",
                    role: ''
                }}
                validationSchema={validate}

                onSubmit={values => {

                    this.setState({
                        username: values.name,
                        usersurname: values.surname,
                        email: values.email,
                        occupation: values.occupation,
                        moblie:values.mobile,
                        roles: values.role
                    })

                    dispatch(
                        addItem(this.state.username,
                             this.state.email, 
                             this.state.moblie, 
                             this.state.roles)
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

export default connect(mapStateToProps)(AddUserContainer);