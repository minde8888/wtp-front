import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import AddProject from "./addProject";
import DeleteProject from "./deleteProject";
import uuid from "uuid";
import { useState, useEffect } from "react";

const Project = (props) => {
  const [itemsList, setItemsList] = useState([]);

  useEffect(() => {
    getButtonList();
  }, []);

  const getButtonList = () => {
    let data = [
      {
        id: uuid.v4(),
        project: 35987,
        name: "Mark",
        address: "Oslo",
        status: "in progress",
        isSelected: false,
      },
      {
        id: uuid.v4(),
        project: 25987,
        name: "Knack",
        address: "Vilnius",
        status: "in progress",
        isSelected: false,
      },
      {
        id: uuid.v4(),
        project: 3,
        name: "Shark",
        address: "Moscow",
        status: "finished",
        isSelected: false,
      },
    ];

    setItemsList(data);
  };
  const EditItemModus = ({ item }) => {

    const btnClick = (event) => {
      const id = event.target.attributes[1].value;
     
      setItemsList((e) =>
        e.map((item) => ({
          ...item,
          isSelected: item.id === id,
        }))
      );
    };

    const onChange = (e) => {
      console.log(e);
    };

    return (
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
        <td
          className={item.isSelected ? "d-none" : ""}
          onClick={btnClick}
          value={item.id}
        >
          {item.project}
        </td>
        <input type="text" value={1} onChange={onChange} />

        <td
          className={item.isSelected ? "d-none" : ""}
          onClick={btnClick}
          value={item.id}
        >
          {item.name}
        </td>
        <td
          className={item.isSelected ? "d-none" : ""}
          onClick={btnClick}
          value={item.id}
        >
          {item.address}
        </td>

        <td
          className={item.isSelected ? "d-none" : ""}
          onClick={btnClick}
          value={item.id}
        >
          {item.status}
        </td>
      </tr>
    );
  };

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
            {itemsList.map((item) => (
              <EditItemModus key={item.id} item={item} />
            ))}
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
