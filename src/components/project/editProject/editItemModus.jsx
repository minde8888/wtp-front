import React, { Component } from "react";
import {
  edit,
  projectIdToState,
  updateProject,
  projectOnChanges,
} from "../../../redux/actions/projectData";
import { NavLink } from "react-router-dom";
import store from "../../../redux/store";

class EditItemModus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      action: false,
      isChecked: null,
      newId: [],
      idToDelete: [],
    };
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  handleOutsideClick = (e) => {
    const id = e.target.attributes[1].value;
    store.dispatch(edit(id));
    this.setState({
      action: true,
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.projectData.length !== this.props.projectData.length) {
      this.setState({ newId: [] });
    }
  }

  onChange = (e) => {
    e.preventDefault();
    const { name, id, value } = e.target;
    store.dispatch(projectOnChanges({ [name]: value }, id));
  };

  handleOnChange = (e) => {
    let { checked, value } = e.target;
    if (checked) {
      this.state.newId.push(value);
    } else {
      this.state.newId.splice(value, 1);
    }
    store.dispatch(projectIdToState(this.state.newId));
    if (this.props.isRemoved) {
      checked = false;
    }
  };

  handleOnBlur = (e) => {
    var obj = {
      [e.target.name]: e.target.value,
      projectId: e.target.id,
    };

    store.dispatch(updateProject(obj));
    store.dispatch(edit(""));
  };

  render = () => {
    const { projectData, isSelectedId } = this.props;

    return (
      <>
        {projectData.map((item, k) => (
          <tr key={k} className="justify-content-start">
            <td className="bs-checkbox">
              <label>
                <input
                  value={item.projectId}
                  name="btSelectItem"
                  type="checkbox"
                  onChange={this.handleOnChange}
                />
              </label>
            </td>
            <td
              className={`tb  ${isSelectedId === item.projectId ? "d-none" : ""
                }`}
              onDoubleClick={this.handleOutsideClick}
              value={item.projectId}
            >
              {item.number}
            </td>
            <td
              className={`tb ${isSelectedId === item.projectId ? "" : "d-none"
                }`}
            >
              <input
                id={item.projectId}
                autoFocus="autoFocus"
                className="tb-input"
                type="text"
                name="number"
                placeholder={item.number}
                value={item.number}
                onChange={(e) => {
                  if (e.target.value !== item.number) {
                    this.onChange(e);
                  }
                }}
                onBlur={this.handleOnBlur}
              />
            </td>
            <td
              className={`tb ${isSelectedId === item.projectId + 1 ? "d-none" : ""
                }`}
              onDoubleClick={this.handleOutsideClick}
              value={item.projectId + 1}
            >
              {item.title}
            </td>
            <td
              className={`tb ${isSelectedId === item.projectId + 1 ? "" : "d-none"
                }`}
            >
              <input
                id={item.projectId}
                autoFocus="autoFocus"
                className="tb-input"
                type="text"
                name="title"
                placeholder={item.title}
                value={item.title}
                onChange={(e) => {
                  if (e.target.value !== item.title) {
                    this.onChange(e);
                  }
                }}
                onBlur={this.handleOnBlur}
              />
            </td>
            <td
              className={`tb ${isSelectedId === item.projectId + 2 ? "d-none" : ""
                }`}
              onDoubleClick={this.handleOutsideClick}
              value={item.projectId + 2}
            >
              {item.place}
            </td>
            <td
              className={`tb ${isSelectedId === item.projectId + 2 ? "" : "d-none"
                }`}
            >
              <input
                id={item.projectId}
                autoFocus="autoFocus"
                className="tb-input"
                type="text"
                name="place"
                placeholder={item.place}
                value={item.place}
                onChange={(e) => {
                  if (e.target.value !== item.place) {
                    this.onChange(e);
                  }
                }}
                onBlur={this.handleOnBlur}
              />
            </td>
            <td
              className={`tb ${isSelectedId === item.projectId + 3 ? "d-none" : ""
                }`}
              onDoubleClick={this.handleOutsideClick}
              value={item.projectId + 3}
            >
              {item.status}
            </td>
            <td
              className={`tb ${isSelectedId === item.projectId + 3 ? "" : "d-none"
                }`}
            >
              <input
                id={item.projectId}
                autoFocus="autoFocus"
                className="tb-input"
                type="text"
                name="status"
                placeholder={item.status}
                value={item.status}
                onChange={(e) => {
                  if (e.target.value !== item.status) {
                    this.onChange(e);
                  }
                }}
                onBlur={this.handleOnBlur}
              />
            </td>
            <td className="bs-checkbox">
              <label>
                <input
                  className="check-box box-action input-box"
                  value={item.projectId}
                  name="btSelectItem"
                  type="checkbox"
                />
              </label>
              <NavLink className="detail-icon" to="#"></NavLink>
            </td>
            <td className="bs-checkbox">
              <label>
                <input
                  className="check-box box-action input-box"
                  name="btSelectItem"
                  type="checkbox"
                />
              </label>
              <NavLink className="detail-icon" to="#"></NavLink>
            </td>
            <td className="bs-checkbox">
              <NavLink
                className="detail-icon"
                to={"/progress-plan/" + item.projectId}
              >
                <label>
                  <input
                    className="check-box box-action input-box"
                    name="btSelectItem"
                    type="checkbox"
                  />
                </label>
              </NavLink>
            </td>
            <td className="bs-checkbox">
              <label>
                <input
                  className="check-box box-action input-box"
                  name="btSelectItem"
                  type="checkbox"
                />
              </label>
              <NavLink className="detail-icon" to="#"></NavLink>
            </td>
          </tr>
        ))}
      </>
    );
  };
}

export default EditItemModus
