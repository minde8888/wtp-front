import React, { Component } from "react";
import AddProject from "./addProject";
import EditItemModus from "./editItemModus";
import { connect } from "react-redux";
import { getAllProjects, projectToDelete } from "../../redux/actions/projectData";
import TablePreloader from "../preloader/tablePreloader";
import trash from "../../svg/trash.svg";
import "./project.scss";

class Project extends Component {
  componentDidMount() {
    this.props.dispatch(getAllProjects());
  }

  removeProjects = () => {
    this.props.dispatch(projectToDelete(this.props.removeProjects));
  };

  render = () => {
    return (
      <div>
        <AddProject />
        <table className="table table-bordered">
          <thead>
            <tr>
              <th className="bs-checkbox" onClick={this.removeProjects}>
                <img src={trash} alt="" />
              </th>
              <th className="detail"></th>
              <th scope="col-2">Project nr</th>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {this.props.projectIsLoaded ? (
              <EditItemModus />
            ) : (
              <TablePreloader />
            )}
          </tbody>
        </table>
      </div>
    );
  };
}

function mapStateToProps(state) {
  const { projectIsLoaded, removeProjects } = state.project;

  return { projectIsLoaded, removeProjects };
}

export default connect(mapStateToProps)(Project);
