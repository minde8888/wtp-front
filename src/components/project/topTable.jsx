import React from "react";
import { connect } from "react-redux";
import { clearMessage } from "../../redux/actions/message";
import Table from "./table";
import AddInput from "./addProject/addInput";
import "./addProject/addProject.scss";
import isEmpty from "../../helpers/emptyObject";

const TopTable = (props) => {

  const { message, isLoaded } = props;

  if (isEmpty && message.message !== "") {
    setTimeout(() => { props.dispatch(clearMessage()) }, 1000);
  }

  return (
    <div>
      <div className="container">
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
      <Table />
    </div>
  );

}

function mapStateToProps(state) {
  const { message } = state;
  const { isLoaded } = state.project;
  return { message, isLoaded };
}
export default connect(mapStateToProps)(TopTable);
