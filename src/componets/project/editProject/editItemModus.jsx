import React, { Component } from "react";
import { connect } from "react-redux";
import {
  edit,
  projectIdToDelete,
  updateProject,
  projectOnCahnges
} from "../../../redux/actions/projectData";
import { NavLink } from "react-router-dom";
import EmptyObject from "../../../helpers/emptyObject";
import uuid from "uuid";

class EditItemModus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      action: false,
      isChecked: null,
      newId: [],
      idToDelete: [],
      number: "",
      title: "",
      place: "",
      status: "",
      projectId: "",
    };

    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  handleOutsideClick = (e) => {
    const id = e.target.attributes[1].value;
    this.props.dispatch(edit(id));
    this.setState({
      action: true,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data.length !== this.props.data.length) {
      this.setState({ newId: [] });
    }
  }

  onChange = (e) => {
    e.preventDefault();
    const { name, id } = e.target;
    this.props.dispatch(projectOnCahnges({ [name]: parseInt(e.nativeEvent.data) }, id))
  };

  handleOnChange = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      this.state.newId.push(value);
    } else {
      this.state.newId.splice(value, 1);
    }
    this.props.dispatch(projectIdToDelete(this.state.newId));
  };

  handleOnBlur = () => {
    var { number, title, place, status, id } = this.state;
    var obj = {
      number: number,
      title: title,
      place: place,
      status: status,
    };
    var isEmpty = EmptyObject.emptyValues(obj);
    if (!isEmpty) {
      obj = EmptyObject.removeEmptyObjectValues(obj);
      if (obj) {
        obj = { ...obj, projectId: id };
        this.props.dispatch(updateProject(obj));
      }
    }
    this.props.dispatch(edit(""));
  };

  render = () => {
    const { data, isSelectedId } = this.props;
    return (
      <>
        {data.map((item, k) => (
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
            <th className="btn table-checkbox">
              <label>
                <input
                  className="check-box box-action input-box"
                  value={item.projectId}
                  name="btSelectItem"
                  type="checkbox"
                />
              </label>
              <NavLink className="detail-icon" to="#"></NavLink>
            </th>
            <td
              className={`tb  ${isSelectedId === item.projectId ? "d-none" : ""}`}
              onDoubleClick={this.handleOutsideClick}
              value={item.projectId}
            >
              {item.number}
            </td>
            <td
              className={`tb ${isSelectedId === item.projectId ? "" : "d-none"}`}
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
                value={this.state.title}
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
                value={this.state.place}
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
                value={this.state.status}
                onChange={(e) => {
                  if (e.target.value !== item.status) {
                    this.onChange(e);
                  }
                }}
                onBlur={this.handleOnBlur}
              />
            </td>
          </tr>
        ))}
      </>
    );
  };
}

function mapStateToProps(state) {
  const { isSelectedId, data } = state.project;
  return { isSelectedId, data };
}
export default connect(mapStateToProps)(EditItemModus);