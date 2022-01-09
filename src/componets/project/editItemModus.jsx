import { useState, useEffect } from "react";
import { getAllProjects } from "../../redux/actions/projectData";
import { edit } from "../../redux/actions/projectData";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import uuid from "uuid";

const EditItemModus = (props) => {
  var [action, setAction] = useState(false);

  const { isSelected } = props;
  const { dispatch, data } = props;

  useEffect(() => dispatch(getAllProjects()), [dispatch]);

  const handleOutsideClick = (event) => {
    const id = event.target.attributes[1].value;
    dispatch(edit(id));
    setAction(true);
  };

  if (action) {
    const listener = (e) => {
      if (e.target.className === "tb-input") {
        return;
      } else {
        dispatch(edit(""));
        setAction(false);
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      }
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
  }

  const onChange = (e) => {
    // console.log(e.target.value);
  };

  return (
    <>
      {data.map((item, k) => (
        <tr key={uuid.v4()}>
          <td className="btn btn-outline-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="currentColor"
              className="bi bi-plus-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
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

          <td
            className={`tbs ${isSelected === item.projectId ? "d-none" : ""}`}
            onDoubleClick={handleOutsideClick}
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
            className={`tb-input ${
              isSelected === item.projectId ? "" : "d-none"
            }`}
          >
            <input
              className="tb-input"
              type="number"
              pattern="^-?[0-9]\d*\.?\d*$"
              placeholder={item.number}
              // value={}
            />
          </td>

          <td
            className={`tb ${isSelected === item.projectId ? "d-none" : ""}`}
            onDoubleClick={handleOutsideClick}
            value={item.projectId}
          >
            {item.title}
          </td>
          <td
            onChange={onChange}
            className={`tb-input ${
              isSelected === item.projectId ? "" : "d-none"
            }`}
          >
            <input className="tb-input" type="text" placeholder={item.title} />
          </td>
          <td
            className={`tb ${isSelected === item.projectId ? "d-none" : ""}`}
            onDoubleClick={handleOutsideClick}
            value={item.projectId}
          >
            {item.place}
          </td>
          <td
            onChange={onChange}
            className={`tb-input ${
              isSelected === item.projectId ? "" : "d-none"
            }`}
          >
            <input className="tb-input" type="text" placeholder={item.place} />
          </td>
          <td
            className={`tb ${isSelected === item.projectId ? "d-none" : ""}`}
            onDoubleClick={handleOutsideClick}
            value={item.projectId}
          >
            {item.status}
          </td>
          <td
            onChange={onChange}
            className={`tb-input ${
              isSelected === item.projectId ? "" : "d-none"
            }`}
          >
            <input className="tb-input" type="text" placeholder={item.status} />
          </td>
        </tr>
      ))}
    </>
  );
};

function mapStateToProps(state) {
  const { data, isSelected } = state.project;

  return { data, isSelected };
}

export default connect(mapStateToProps)(EditItemModus);
