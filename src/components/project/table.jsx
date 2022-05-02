import React from "react";
import EditItemModus from "./editProject/editItemModus";
import {
  projectToDelete
} from "../../redux/actions/projectData";
import TablePreloader from "../preloader/tablePreloader";
import store from "../../redux/store";
import trash from "../../svg/trash.svg";
import "./project.scss";

const Table = ({ projectId, projectIsLoaded, isSelectedId, projectData, isRemoved }) => {

  const removeProject = () => {
    store.dispatch(projectToDelete(projectId));
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
        {projectIsLoaded ? <EditItemModus 
        isSelectedId={isSelectedId}
          projectData={projectData}
          isRemoved={isRemoved} 
          /> : <TablePreloader />}
      </tbody>
    </table>
  );
};

export default Table;
