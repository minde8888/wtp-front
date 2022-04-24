import React, { useRef, useState } from "react";
import store from "../../../../redux/store";
import Select from "react-select";
import { employeeAdd } from "../../../../redux/actions/progressPlan";

function AddEmployees({ employees }) {
  const employeeRef = useRef(null);
  store.dispatch(employeeAdd(employeeRef));

  // const handleChange = (event) => {
  //   console.log(event.currentTarget.value);
  // };

  // return (

  //   <select onChange={handleChange} >
  //     <option>Select a country</option>
  //     {employees.map((employee, i) => (
  //       <option key={i} value={employee.id}>
  //         {employee.name} {employee.surname}
  //       </option>
  //     ))}
  //   </select>
  // );

  const optionsss = [
    { v: "chocolate", label: "Chocolate", a: "Chocolate", b: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [selectedOption, setSelectedOption] = useState(null);
  console.log(selectedOption);
  return (
    <div className="App" ref={employeeRef}>
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={employees}
      />
    </div>
  );
}

export default AddEmployees;
