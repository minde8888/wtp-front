import React from "react";
import { connect } from "react-redux";
import AddProject from "./addProject";
import DeleteProject from "./deleteProject";
import EditItemModus from "./editItemModus";

const Project = (props) => {
  return (
    <div>
      <DeleteProject />

      <div className="bd-example">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th className="detail">
                <div className="fht-cell"></div>
              </th>
              <th className="bs-checkbox " data-field="state">
                <div className="th-inner ">
                  <label>
                    <input
                      className="tb-input"
                      name="btSelectAll"
                      type="checkbox"
                    />
                  </label>
                </div>
                <div className="fht-cell"></div>
              </th>
              <th scope="col-2">Project nr</th>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <EditItemModus props={props.data} />
          </tbody>
        </table>
      </div>
      <AddProject />
    </div>
  );
};

function mapStateToProps(state) {
  const { data } = state.project;

  return { data };
}

export default connect(mapStateToProps)(Project);
