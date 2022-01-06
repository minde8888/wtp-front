import React from "react";
import { connect } from "react-redux";
import AddProject from "./addProject";
import DeleteProject from "./deleteProject";
import uuid from "uuid";
import { useState, useEffect, useRef } from "react";
import ProjectTable from "./projectTable";

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
        place: "Oslo",
        status: "in progress",
        isSelected: false,
      },
      {
        id: uuid.v4(),
        project: 25987,
        name: "Knack",
        place: "Vilnius",
        status: "in progress",
        isSelected: false,
      },
      {
        id: uuid.v4(),
        project: 3,
        name: "Shark",
        place: "Moscow",
        status: "finished",
        isSelected: false,
      },
    ];

    setItemsList(data);
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
              <ProjectTable item={item} />
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
