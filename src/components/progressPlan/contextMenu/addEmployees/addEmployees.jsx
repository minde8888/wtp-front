import React, { useRef, useState, useEffect } from "react";
import store from "../../../../redux/store";
import { employeeAdd } from "../../../../redux/actions/progressPlan";
import { employeeToProgress } from "../../../../redux/actions/progressPlan";
import Select from "react-select";
import style from "./addEmployees.module.scss";

function AddEmployees({ employees, eventId, projectId, progress, employeesIds }) {
  const employeeRef = useRef(null);
  // const [selectedValue, setSelectedValue] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  }

  store.dispatch(employeeAdd(employeeRef));

  let id = [];
  let element = progress.find((e) => e.progressPlanId === eventId);
  if (element !== undefined && element.employees.$values.length !== 0) {
    id = element.employees.$values.map((e) => e.id);
  }

  if (employeesIds !== undefined) {
    id = [...id, ...employeesIds]
  }

  let options = employees.$values.map((e) => {
    if (!id.includes(e.id)) {
      return { label: e.name + " " + e.surname, value: e.id };
    }
    return { label: e.name + " " + e.surname, value: e.id, isdisabled: true };
  });
  // console.log(employees);
  // console.log(options);
  // useEffect(() => {
  //   if (employeesIds !== undefined) {
  //     id = [...id, ...employeesIds]
  //   }

  // }
  //   , [ employeesIds])

  // const handleChange = (e) => {
  //   setSelectedValue(Array.isArray(e) ? e.map((x) => x.value) : []);
  //   store.dispatch(
  //     employeeToProgress(
  //       Array.isArray(e) ? e.map((x) => x.value) : [],
  //       eventId,
  //       projectId
  //     )
  //   );
  // };

  // let options = obj()
  console.log(selectedOption);
  if (selectedOption.length > 0) {
    // setSelectedOption([])
  }


  return (
    <div ref={employeeRef} className={style.container}>
      <Select
        className={style.dropdown}
        placeholder="Select Employee"
        onChange={handleChange}
        isOptionDisabled={(option) => option.isdisabled}
        value={selectedOption} 
        options={options}
        isMulti
        isClearable
        hideSelectedOptions={false}
        isSearchable
      />
    </div>
  );
}

export default AddEmployees;
