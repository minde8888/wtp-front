import React, { useRef, useState } from "react";
import store from "../../../../redux/store";
import { employeeAdd } from "../../../../redux/actions/progressPlan";
import { employeeToProgress } from "../../../../redux/actions/progressPlan";
import Select from "react-select";
import style from "./addEmployees.module.scss";

function AddEmployees({ employees }) {

  const employeeRef = useRef(null);
  store.dispatch(employeeAdd(employeeRef));
  const [selectedValue, setSelectedValue] = useState([]);

  if (employees === undefined) {
    return null
  }
  let options = employees.map((e) => {
    return { label: e.name + " " + e.surname, value: e.id };
  });

  const handleChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  if (selectedValue.length !== 0) {
    store.dispatch(employeeToProgress(selectedValue))
  }
  
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
