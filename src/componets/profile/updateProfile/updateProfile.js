import React, { Component } from "react";
import { connect } from "react-redux";
import uplod from "../../../svg/upload.svg"
import "./adduser.scss"


class UpdateProfile extends Component {
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

        <div className="form-group">
            <div className="col-md-3 border-right">
                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                    <label className="btn btn-primary btn-file">
                        {/* Add profile image */}
                        <span className="font-weight-bold"><input type="file" accept="image/*" onChange={this.selectFile} /></span>
                    </label>
                    <div className="mb-4">
                        {this.state.previewImage && (
                            <div>
                                <img className="rounded-circle mt-5" width="150px" src={this.state.previewImage} alt="" />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <input type="file" name="file" id="file" class="input-file" />
            <label for="file" className="btn btn-tertiary js-labelFile">
                <img src={uplod} />
                <span className="js-fileName"> Choose a file</span>
            </label>
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
        </div>
        
    }
}