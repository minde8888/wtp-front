import React, { Component } from "react";
import { connect } from "react-redux";


class AddUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            surname: "",
            occupation: "",
            mobile: "",
            email: "",
        };

        this.sendUser = this.sendUser.bind(this);

        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(this);

    }

    sendUser() {
        const { dispatch } = this.props;
        // dispatch(addItem({ name: this.name, surname: this.Surname, occupation: this.occupation, mobile: this.Mobile, email: this.email }))
        console.log(this.state.name, this.surname, this.occupation, this.mobile, this.email);
        // console.log(this.Name.value);
    }

    render() {

        const { message } = this.props;

        return (
            <div>
                {message && (
                    <div className="alert alert-secondary mt-3" role="alert">
                        {message}
                    </div>
                )}
                <div className="container rounded bg-white mt-5 d-flex justify-content-center">
                    <div className="row">
                        <div className="col-md-12 border-right">
                            <div className="p-3 py-5">
                                <div className="d-flex justify-content-center align-items-center mb-3 ">
                                    <h4 className="text-center">Profile Settings</h4>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-6"><label className="labels" >Name</label><input type="text" className="form-control" placeholder="first name" name="name" value={this.name} onChange={this.handleChange} /></div>
                                    <div className="col-md-6"><label className="labels" >Surname</label><input type="text" className="form-control" placeholder="Surname" name="surname" value={this.surname} onChange={this.handleChange} /></div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-12"><label className="labels" >Occupation</label><input type="text" className="form-control" placeholder="occupation" name="occupation" value={this.occupation} onChange={this.handleChange} /></div>
                                    <div className="col-md-12"><label className="labels" >Mobile Number</label><input type="text" className="form-control" placeholder="enter phone number" name="mobile" value={this.mobile} onChange={this.handleChange} /></div>
                                    <div className="col-md-12"><label className="labels" >Email</label><input type="text" className="form-control" placeholder="enter email" name="email" value={this.email} onChange={this.handleChange} /></div>
                                </div>
                                <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="button" onClick={this.sendUser}>Save Profile</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { message } = state.adduser.message;
    // console.log(state);
    return {
        message,
    };
}

export default connect(mapStateToProps)(AddUser);