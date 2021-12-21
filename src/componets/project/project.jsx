import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import AddProject from "./addProject";
import DeleteProject from "./deleteProject";

const Project = (props) => {
  return (
    <div>
      <DeleteProject />

      <div className="bd-example">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th className="detail" rowSpan="2">
                <div className="fht-cell"></div>
              </th>
              <th className="bs-checkbox " rowSpan="2" data-field="state">
                <div className="th-inner ">
                  <label>
                    <input name="btSelectAll" type="checkbox" />
                    <span></span>
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
            <tr>
              <td>
                <NavLink className="detail-icon" to="#">
                  <i className="fa fa-plus"></i>
                </NavLink>
              </td>
              <td className="bs-checkbox">
                <label>
                  <input
                    data-index="0"
                    name="btSelectItem"
                    type="checkbox"
                    value="0"
                  />
                  <span></span>
                </label>
              </td>
              <th scope="row">35987</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>in progress</td>
            </tr>
          </tbody>
        </table>
      </div>
      <AddProject />
    </div>
  );
};

function mapStateToProps(state) {
  const {} = state.user;

  return {};
}

export default connect(mapStateToProps)(Project);
