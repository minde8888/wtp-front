import React, { useEffect } from "react";
import { connect } from "react-redux";
import { clearMessage } from "../../redux/actions/message";
import Table from "./table";
import AddInput from "./addProject/addInput";
import "./addProject/addProject.scss";
import { getAllProjects } from "../../redux/actions/projectData";

const TopTable = (props) => {

  const {
    message,
    projectIsLoaded,
    projectId,
    dispatch,
    isSelectedId,
    projectData,
    isRemoved,
    id
  } = props;

  if (message.message !== "") {
    setTimeout(() => { dispatch(clearMessage()) }, 1500);
  }
  /* eslint-disable */
  useEffect(() => {
    dispatch(getAllProjects());
  }, []);
  /* eslint-disable */
  return (
    <div>
      <div className="container">
        <div className="row ">
          <AddInput id={id} />
        </div>
        {message.message && (
          <div className="form-group">
            <div
              className={
                message.error ? "alert alert-danger" : "alert alert-success"
              }
              role="alert"
            >
              {message.message}
            </div>
          </div>
        )}
      </div>
      <Table projectIsLoaded={projectIsLoaded}
        projectId={projectId}
        isSelectedId={isSelectedId}
        projectData={projectData}
        isRemoved={isRemoved} />
    </div>
  );

}

function mapStateToProps(state) {

  const { id } = state.user.data;
  const { message, error } = state;
  const {
    projectIsLoaded,
    projectId,
    isSelectedId,
    projectData,
    isRemoved
  } = state.project;

  return {
    message,
    error,
    projectIsLoaded,
    projectId,
    isSelectedId,
    projectData,
    isRemoved,
    id
  };
}
export default connect(mapStateToProps)(TopTable);
