import React, { Component } from "react";
import { connect } from "react-redux";
import {  clearMessage } from "../../../redux/actions/message";
import AddInput from "./addInput";
import "./addProject.scss";

class AddProject extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  handleClickOutside = () => {
    if (this.props.message) {
      this.props.dispatch(clearMessage());
    }
    document.removeEventListener("mousedown", this.handleClickOutside);
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  // });

  render = () => {
    const { message, isLoaded } = this.props;
    return (
      <div className=" tb-actions">
        <div className="row ">
          <AddInput />
        </div>
        {message.message && (
          <div className="form-group">
            <div
              className={
                isLoaded ? "alert alert-success" : "alert alert-danger"
              }
              role="alert"
            >
              {message.message}
            </div>
          </div>
        )}
      </div>
    );
  };
}

function mapStateToProps(state) {
  console.log(state);
  const { message } = state;
  const { isLoaded, data } = state.project;

  return { message, isLoaded, data };
}

export default connect(mapStateToProps)(AddProject);
