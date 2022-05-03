import React, { useRef, useState } from "react";
import store from "../../../../redux/store";
import { employeeAdd } from "../../../../redux/actions/progressPlan";
import { employeeToProgress } from "../../../../redux/actions/progressPlan";
import Select from "react-select";
import style from "./addEmployees.module.scss";

function AddEmployees({ employees, eventId, projectId, progress }) {
  const employeeRef = useRef(null);
  const [selectedValue, setSelectedValue] = useState([]);

  store.dispatch(employeeAdd(employeeRef));

  let id = [];
  let element = progress.find((e) => e.progressPlanId === eventId);
  if (element !== undefined && element.employees.$values.length !== 0) {
    id = element.employees.$values.map((e) => e.id);
  }

  let options = employees.$values.map((e) => {
    if (!id.includes(e.id)) {
      return { label: e.name + " " + e.surname, value: e.id };
    }
  });

  const handleChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map((x) => x.value) : []);
    store.dispatch(
      employeeToProgress(
        Array.isArray(e) ? e.map((x) => x.value) : [],
        eventId,
        projectId
      )
    );
  };

  return (
    <div ref={employeeRef} className={style.container}>
      <Select
        className={style.dropdown}
        placeholder="Select Employee"
        value={options.filter((obj) => selectedValue.includes(obj.value))}
        options={options}
        onChange={handleChange}
        isMulti
        isClearable
      />
    </div>
  );
}

export default AddEmployees;
