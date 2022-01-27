import React, { Component } from "react";
import EditItemModus from "./editProject/editItemModus";
import { connect } from "react-redux";
import {
  getAllProjects,
  projectToDelete,
} from "../../redux/actions/projectData";
import TablePreloader from "../preloader/tablePreloader";
import trash from "../../svg/trash.svg";
import "./project.scss";

class Table extends Component {
  componentDidMount() {
    this.props.dispatch(getAllProjects());
  }

  componentDidUpdate(prevProps) {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  removeProjects = () => {
    this.props.dispatch(projectToDelete(this.props.removeProjects));
  };

  render = () => {
    return (
      <>
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
      </>
    );
  };
}

function mapStateToProps(state) {
  const { projectIsLoaded, removeProjects } = state.project;
  return { projectIsLoaded, removeProjects };
}
export default connect(mapStateToProps)(Table);
