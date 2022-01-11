import React, { Component } from "react";
import { connect } from "react-redux";
import { edit } from "../../redux/actions/projectData";
import { NavLink } from "react-router-dom";

import uuid from "uuid";

class EditItemModus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      action: false,
      isChecked: null,
    };

    this.handleOutsideClick = this.handleOutsideClick.bind(this);

    console.log(this);
  }

  handleOutsideClick = (event) => {
    const id = event.target.attributes[1].value;
    this.props.dispatch(edit(id));

    this.setState({
      action: true,
    });
  };

  componentDidUpdate() {
    if (this.state.action) {
      const listener = (e) => {
        if (e.target.className === "tb-input") {
          return;
        } else {
          this.props.dispatch(edit(""));
          this.setState({
            action: false,
          });
          document.removeEventListener("mousedown", listener);
          document.removeEventListener("touchstart", listener);
        }
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
    }
  }

  onChange = (e) => {
    // console.log(e.target.value);
  };

  handleOnChange = (e) => {
   console.log(this.state.isChecked);
    console.log(e);
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
                  className=" "
                  value={item.projectId}
                  name="btSelectItem"
                  type="checkbox"
                  checked={this.state.isChecked}
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
              onChange={(e) => {
                if (e.target.value !== item.number) {
                  console.log(e.target.value);
                }
              }}
              className={`tb ${isSelected === item.projectId ? "" : "d-none"}`}
            >
              <input
                className="tb-input"
                type="number"
                pattern="^-?[0-9]\d*\.?\d*$"
                placeholder={item.number}
              />
            </td>
            <td
              className={`tb ${isSelected === item.projectId ? "d-none" : ""}`}
              onDoubleClick={this.handleOutsideClick}
              value={item.projectId}
            >
              {item.title}
            </td>
            <td
              onChange={this.onChange}
              className={`tb ${isSelected === item.projectId ? "" : "d-none"}`}
            >
              <input
                className="tb-input"
                type="text"
                placeholder={item.title}
              />
            </td>
            <td
              key={uuid.v4()}
              className={`tb ${isSelected === item.projectId ? "d-none" : ""}`}
              onDoubleClick={this.handleOutsideClick}
              value={item.projectId}
            >
              {item.place}
            </td>
            <td
              key={uuid.v4()}
              onChange={this.onChange}
              className={`tb ${isSelected === item.projectId ? "" : "d-none"}`}
            >
              <input
                className="tb-input"
                type="text"
                placeholder={item.place}
              />
            </td>
            <td
              key={uuid.v4()}
              className={`tb ${isSelected === item.projectId ? "d-none" : ""}`}
              onDoubleClick={this.handleOutsideClick}
              value={item.projectId}
            >
              {item.status}
            </td>
            <td
              onChange={this.onChange}
              className={`tb ${isSelected === item.projectId ? "" : "d-none"}`}
            >
              <input
                className="tb-input"
                type="text"
                placeholder={item.status}
              />
            </td>
          </tr>
        ))}
      </>
    );
  };
}

function mapStateToProps(state) {
  const { data, isSelected } = state.project;

  return { data, isSelected };
}

export default connect(mapStateToProps)(EditItemModus);
