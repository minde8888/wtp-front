import React, { useRef, useState } from "react";
import store from "../../../../redux/store";
import { employeeAdd } from "../../../../redux/actions/progressPlan";
import { MultiSelect } from "react-multi-select-component";

function AddEmployees({ employees }) {
  let options = employees.map((e) => {
    return { label: e.name + " " + e.surname, value: e.id };
  });
  console.log(options);
  const employeeRef = useRef(null);
  store.dispatch(employeeAdd(employeeRef));

  const [selected, setSelected] = useState([]);

  return (
    <div>
      <pre>{JSON.stringify(selected)}</pre>
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
    </div>
  );
}

export default AddEmployees;
