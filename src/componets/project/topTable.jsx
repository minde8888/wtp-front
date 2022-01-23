import React, { Component } from "react";
import { connect } from "react-redux";
import { clearMessage } from "../../redux/actions/message";
import Table from "./table";
import AddInput from "./addProject/addInput";
import "./addProject/addProject.scss";

class TopTable extends Component {
  handleClickOutside = () => {
    if (this.props.message) {
      this.props.dispatch(clearMessage());
    }
    document.removeEventListener("mousedown", this.handleClickOutside);
  };

  componentDidUpdate(prevProps) {
    // console.log(prevProps);
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  render = () => {
    const { message, isLoaded } = this.props;
    return (
      <div>
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
        <Table/>
      </div>
    );
  };
}

function mapStateToProps(state) {
  const { message } = state;
  const { isLoaded } = state.project;
  return { message, isLoaded };
}
export default connect(mapStateToProps)(TopTable);
