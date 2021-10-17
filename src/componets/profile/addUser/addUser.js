import React, { Component } from "react";
import { connect } from "react-redux";

class AddUser extends Component {
    constructor(props) {
        super(props);

        this.selectFile = this.selectFile.bind(this);
        this.upload = this.upload.bind(this);

        this.state = {
            currentFile: "",
            previewImage: "",
            imageInfos: "",
        };
    }

    selectFile(event) {

        this.setState({
            currentFile: event.target.files[0],
            previewImage: URL.createObjectURL(event.target.files[0]),
        });
    }

    upload(event) {
        console.log(this.state.currentFile);
    }

    render() {

        const { message, progress } = this.props;

        return (

            <div>
                <div className="row">
                    <div className="col-8">
                        <label className="btn btn-default p-0">
                            {/* <input type="file" accept="image/*" onChange={this.selectFile} /> */}
                        </label>
                    </div>

                    <div className="col-4">
                        <button
                            className="btn btn-success btn-sm"
                            disabled={!this.state.currentFile}
                            onClick={this.upload}
                        >
                            Upload
                        </button>
                    </div>
                </div>
{/* 
                {this.state.currentFile && (
                    <div className="progress my-3">
                        <div
                            className="progress-bar progress-bar-info progress-bar-striped"
                            role="progressbar"
                            aria-valuenow={progress}
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{ width: progress + "%" }}
                        >
                            {progress}%
                        </div>
                    </div>
                )} */}



                {message && (
                    <div className="alert alert-secondary mt-3" role="alert">
                        {message}
                    </div>
                )}

                {/* <div className="card mt-3">
                    <div className="card-header">List of Files</div>
                    <ul className="list-group list-group-flush">
                        {this.state.imageInfos &&
                            this.state.imageInfos.map((img, index) => (
                                <li className="list-group-item" key={index}>
                                    <a href={img.url}>{img.name}</a>
                                </li>
                            ))}
                    </ul>
                </div> */}



                <div className="container rounded bg-white mt-5 mb-5">
                    <div className="row">
                        <div className="col-md-3 border-right">
                            <div className="d-flex flex-column align-items-center text-center p-3 py-5">

                                <div className="mb-4">
                                    {this.state.previewImage && (
                                        <div>
                                            <img className="rounded-circle mt-5" width="150px" src={this.state.previewImage} alt="" />
                                        </div>
                                    )}
                                </div>

                                <span className="font-weight-bold"><input type="file" accept="image/*" onChange={this.selectFile} /></span><span className="text-black-50">edogaru @mail.com.my</span><span> </span>
                            </div>
                        </div>
                        <div className="col-md-5 border-right">
                            <div className="p-3 py-5">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="text-right">Profile Settings</h4>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-6"><label className="labels">Name</label><input type="text" className="form-control" placeholder="first name" value="" /></div>
                                    <div className="col-md-6"><label className="labels">Surname</label><input type="text" className="form-control" value="" placeholder="surname" /></div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-12"><label className="labels">Mobile Number</label><input type="text" className="form-control" placeholder="enter phone number" value="" /></div>
                                    <div className="col-md-12"><label className="labels">Address Line 1</label><input type="text" className="form-control" placeholder="enter address line 1" value="" /></div>
                                    <div className="col-md-12"><label className="labels">Address Line 2</label><input type="text" className="form-control" placeholder="enter address line 2" value="" /></div>
                                    <div className="col-md-12"><label className="labels">Postcode</label><input type="text" className="form-control" placeholder="enter address line 2" value="" /></div>
                                    <div className="col-md-12"><label className="labels">State</label><input type="text" className="form-control" placeholder="enter address line 2" value="" /></div>
                                    <div className="col-md-12"><label className="labels">Area</label><input type="text" className="form-control" placeholder="enter address line 2" value="" /></div>
                                    <div className="col-md-12"><label className="labels">Email ID</label><input type="text" className="form-control" placeholder="enter email id" value="" /></div>
                                    <div className="col-md-12"><label className="labels">Education</label><input type="text" className="form-control" placeholder="education" value="" /></div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-6"><label className="labels">Country</label><input type="text" className="form-control" placeholder="country" value="" /></div>
                                    <div className="col-md-6"><label className="labels">State/Region</label><input type="text" className="form-control" value="" placeholder="state" /></div>
                                </div>
                                <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="button">Save Profile</button></div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-3 py-5">
                                <div className="d-flex justify-content-between align-items-center experience"><span>Edit Experience</span><span className="border px-3 p-1 add-experience"><i className="fa fa-plus"></i>&nbsp;Experience</span></div><br />
                                <div className="col-md-12"><label className="labels">Experience in Designing</label><input type="text" className="form-control" placeholder="experience" value="" /></div> <br />
                                <div className="col-md-12"><label className="labels">Additional Details</label><input type="text" className="form-control" placeholder="additional details" value="" /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { progress } = state.adduser.progress;
    const { message } = state.adduser.message;
    console.log(state);
    return {
        message,
        progress
    };
}

export default connect(mapStateToProps)(AddUser);