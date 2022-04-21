import React, { useEffect } from "react";
import EditItemModus from "./editProject/editItemModus";
import { connect } from "react-redux";
import {
  getAllProjects,
  projectToDelete,
} from "../../redux/actions/projectData";
import TablePreloader from "../preloader/tablePreloader";
import trash from "../../svg/trash.svg";
import "./project.scss";

const Table = (props) => {
/* eslint-disable */
  useEffect(() => {
    props.dispatch(getAllProjects());
  }, []);
/* eslint-disable */
  const removeProject = () => {
    props.dispatch(projectToDelete(props.projectId));
  };

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th className="bs-checkbox" onClick={removeProject}>
            <img src={trash} alt="" />
          </th>
          <th scope="col-2">Project nr</th>
          <th scope="col">Name</th>
          <th scope="col">Address</th>
          <th scope="col">Status</th>
          <th scope="col">Time</th>
          <th scope="col">Checklist</th>
          <th scope="col">Progress</th>
          <th scope="col">Rent</th>
        </tr>
      </thead>
      <tbody>
        {props.projectIsLoaded ? <EditItemModus /> : <TablePreloader />}
      </tbody>
    </table>
  );
};

function mapStateToProps(state) {
  const { projectIsLoaded, projectId } = state.project;
  return { projectIsLoaded, projectId };
}
export default connect(mapStateToProps)(Table);
