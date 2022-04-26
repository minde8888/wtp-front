import React, { useRef, useState } from "react";
import store from "../../../../redux/store";
import { employeeAdd } from "../../../../redux/actions/progressPlan";
import Select, { components } from "react-select";
import style from "./addEmployees.module.scss"

function MultiValueRemove({ employees }) {
  let options = employees.map((e) => {
    return { label: e.name + " " + e.surname, value: e.id };
  });

  const employeeRef = useRef(null);
  store.dispatch(employeeAdd(employeeRef));

  if (props.data.isFixed) {
    return null;
  }
  return <components.MultiValueRemove {...options} />;
};

export default AddEmployees = () => {
  return (
    <Select
      isMulti
      defaultValue={[colourOptions[0]]}
      isClearable={false}
      options={colourOptions}
      components={{ MultiValueRemove }}
    />
  );
};

