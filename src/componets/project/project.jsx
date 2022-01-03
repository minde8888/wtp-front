import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import AddProject from "./addProject";
import DeleteProject from "./deleteProject";
import uuid from "uuid";

class Project extends Component {
  constructor(props) {
    super(props);
    this.editModus = this.editModus.bind(this);
    this.myRef = React.createRef();

    this.state = {
      clicked: false,
      id: null,
    };
  }

  createMarkup() {
    return { __html: '<input type="text" value={1} onChange={saveEdit} />' };
  }

  editModus(e) {
    console.log(e);
    return <td dangerouslySetInnerHTML={this.createMarkup()} />;
    // var elParent = document.getElementById(e.target.id);

    // const newItem = document.createElement("td");
    // newItem.innerHTML =
    //   '<input type="text" value={1} onChange={onChange} />';
    //  elParent.parentNode.replaceChild(newItem, elParent);
  }

  saveEdit(e){
    console.log(e.target);
  }
  
  render = () => {
    const { clicked, id } = this.state;
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
                      <input name="btSelectAll" type="checkbox" />
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
                  <NavLink className="detail-icon" to="#"></NavLink>
                </td>
                <td className="bs-checkbox">
                  <label>
                    <input
                      data-index="0"
                      name="btSelectItem"
                      type="checkbox"
                      value="0"
                    />
                  </label>
                </td>
                <td id={uuid.v4()} onDoubleClick={this.editModus}>
                  <span  scope="row">
                    35987
                  </span>
                </td>

                <td id={uuid.v4()} onDoubleClick={this.editModus}>
                  <span >Mark</span>
                </td>

                <td id={uuid.v4()} onDoubleClick={this.editModus}>
                  <span >Otto</span>
                </td>

                <td id={uuid.v4()} onDoubleClick={this.editModus}>
                  <span >in progress</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <AddProject />
      </div>
    );
  };
}

function mapStateToProps(state) {
  const {} = state.user;

  return {};
}

export default connect(mapStateToProps)(Project);
