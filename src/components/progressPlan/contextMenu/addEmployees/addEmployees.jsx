import React, { useRef, useState } from "react";
import store from "../../../../redux/store";
import { employeeAdd } from "../../../../redux/actions/progressPlan";
import Select, { components } from "react-select";
import style from "./addEmployees.module.scss";

function AddEmployees({ employees }) {
  let options = employees.map((e) => {
    return { label: e.name + " " + e.surname, value: e.id };
  });

  const employeeRef = useRef(null);
  store.dispatch(employeeAdd(employeeRef));

  // set value for default selection
  const [selectedValue, setSelectedValue] = useState([]);

  // handle onChange event of the dropdown
  const handleChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map((x) => x.value) : []);
  };
  console.log(selectedValue);
  return (
    <div className={style.container}>
      <Select
        className="dropdown"
        // placeholder="Select Option"
        // isDisabled
        value={options.filter((obj) => selectedValue.includes(obj.value))} // set selected values
        options={options} // set list of the data
        onChange={handleChange} // assign onChange function
        // autoFocus 
        isMulti
        isClearable
      />
    </div>
  );
}

export default AddEmployees;
