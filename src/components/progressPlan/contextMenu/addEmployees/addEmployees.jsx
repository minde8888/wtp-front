import React, { useRef, useState } from "react";
import store from "../../../../redux/store";
import { employeeAdd } from "../../../../redux/actions/progressPlan";
import { MultiSelect } from "react-multi-select-component";

const options = [
  { label: "Grapes 🍇", value: "grapes" },
  { label: "Mango 🥭", value: "mango" },
  { label: "Strawberry 🍓", value: "strawberry", disabled: true },
];

function AddEmployees({ employees }) {

  
  const employeeRef = useRef(null);
  store.dispatch(employeeAdd(employeeRef));

  const [selected, setSelected] = useState([]);

  return (
    <div>
      <h1>Select Fruits</h1>
      <pre>{JSON.stringify(selected)}</pre>
      <MultiSelect
        options={employees}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
    </div>
  );
}

export default AddEmployees;
