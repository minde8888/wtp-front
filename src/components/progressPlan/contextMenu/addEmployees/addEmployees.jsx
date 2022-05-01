import React, { useRef, useState } from "react";
import store from "../../../../redux/store";
import { employeeAdd } from "../../../../redux/actions/progressPlan";
import { employeeToProgress } from "../../../../redux/actions/progressPlan";
import Select from "react-select";
import style from "./addEmployees.module.scss";

function AddEmployees({ employees, eventId, projectId }) {
  const employeeRef = useRef(null);
  const [selectedValue, setSelectedValue] = useState([]);

  store.dispatch(employeeAdd(employeeRef));

  let options = employees.$values.map((e) => {
    // console.log(e);
    // if (!e.progressPlans.$values.some((p) => p.progressPlanId === eventId)) {
    //   return { label: e.name + " " + e.surname, value: e.id };
    // }
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
        // value={options.filter((obj) => selectedValue.includes(obj.value))}
        options={options}
        onChange={handleChange}
        isMulti
        isClearable
      />
    </div>
  );
}

export default AddEmployees;
