import React, { Component } from "react";
import AddProject from "./addProject";
import EditItemModus from "./editItemModus";
import { connect } from "react-redux";
import { getAllProjects } from "../../redux/actions/projectData";
import TablePreloader from "../preloader/tablePreloader";
import "./project.scss";

class Project extends Component {
  componentDidMount() {
    this.props.dispatch(getAllProjects());
  }

  render = () => {
    return (
      <div>
        <AddProject />
          <table className="table table-bordered">
            <thead>
              <tr>
              <th className="bs-checkbox " data-field="state">
                  <label>
                    <input
                      className="tb-input"
                      name="btSelectAll"
                      type="checkbox"
                    />
                  </label>
                </th>
                <th className="detail"></th>
                <th scope="col-2">Project nr</th>
                <th scope="col">Name</th>
                <th scope="col">Address</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {this.props.projectIsLoaded ? <EditItemModus /> : <TablePreloader />}
            </tbody>
          </table>  
      </div>
    );
  };
}

function mapStateToProps(state) {
  const { projectIsLoaded } = state.project;

  return { projectIsLoaded };
}

export default connect(mapStateToProps)(Project);
