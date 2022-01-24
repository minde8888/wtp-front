import React, { Component } from "react";
import { connect } from "react-redux";
import {
  edit,
  projectIdToDelete,
  updateProject,
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
  
    if (this.state.action && prevProps.action !== true) {
      console.log(11111);
      const listener = (e) => {
        if (e.target.className === "tb-input") {
          return;
        } else {
          console.log(this.state);
          console.log(prevState);
          if (this.state !== prevState) {
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
                console.log(3333);
                this.props.dispatch(updateProject(obj));
              }
            }
            this.props.dispatch(edit(""));
            this.setState({ action: false });
          }

          document.removeEventListener("mousedown", listener);
          document.removeEventListener("touchstart", listener);
        }
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
    }
    if (prevProps.data.length !== this.props.data.length) {
      this.setState({ newId: [] });
    }
  }

  onChange = (e) => {
    e.preventDefault();
    var item = e.target.name;
    var id = e.target.id;
    if (item === "number") {
      this.setState({
        [item]: parseInt(e.target.value),
        id: id,
      });
    } else {
      this.setState({
        [item]: e.target.value,
        id: id,
      });
    }
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

  render = () => {
    const { data, isSelected } = this.props;
    return (
      <>
        {data.map((item, k) => (
          <tr key={uuid.v4()} className="justify-content-start">
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
              className={`tb  ${isSelected === item.projectId ? "d-none" : ""}`}
              onDoubleClick={this.handleOutsideClick}
              value={item.projectId}
            >
              {item.number}
            </td>
            <td
              className={`tb ${isSelected === item.projectId ? "" : "d-none"}`}
            >
              <input
                id={item.projectId}
                autoFocus="autoFocus"
                className="tb-input"
                type="number"
                name="number"
                pattern="^-?[0-9]\d*\.?\d*$"
                placeholder={item.number}
                value={this.state.number}
                onChange={(e) => {
                  if (e.target.value !== item.number) {
                    this.onChange(e);
                  }
                }}
              />
            </td>
            <td
              className={`tb ${
                isSelected === item.projectId + 1 ? "d-none" : ""
              }`}
              onDoubleClick={this.handleOutsideClick}
              value={item.projectId + 1}
            >
              {item.title}
            </td>
            <td
              className={`tb ${
                isSelected === item.projectId + 1 ? "" : "d-none"
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
              />
            </td>
            <td
              className={`tb ${
                isSelected === item.projectId + 2 ? "d-none" : ""
              }`}
              onDoubleClick={this.handleOutsideClick}
              value={item.projectId + 2}
            >
              {item.place}
            </td>
            <td
              className={`tb ${
                isSelected === item.projectId + 2 ? "" : "d-none"
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
              />
            </td>
            <td
              className={`tb ${
                isSelected === item.projectId + 3 ? "d-none" : ""
              }`}
              onDoubleClick={this.handleOutsideClick}
              value={item.projectId + 3}
            >
              {item.status}
            </td>
            <td
              className={`tb ${
                isSelected === item.projectId + 3 ? "" : "d-none"
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
              />
            </td>
          </tr>
        ))}
      </>
    );
  };
}

function mapStateToProps(state) {
  const { isSelected, data } = state.project;
  // debugger
  return { isSelected, data };
}
export default connect(mapStateToProps)(EditItemModus);
