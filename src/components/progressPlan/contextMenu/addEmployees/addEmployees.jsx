import React, { useEffect, useRef } from "react";
import store from "../../../../redux/store";
import { employeeAdd } from "../../../../redux/actions/progressPlan";
import { employeeToProgress, updateProgressPlan } from "../../../../redux/actions/progressPlan";
import style from "./addEmployees.module.scss";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

function AddEmployees({
  employees,
  eventId,
  projectId,
  progress,
  employeesIds,
  employeeIdProgress
}) {
  const employeeRef = useRef(null);

  // let item = null;

  // const handleChange = (item) => {
  //   store.dispatch(employeeToProgress());
  // };

  store.dispatch(employeeAdd(employeeRef));

  let id = [];
  let element = progress.find((e) => e.progressPlanId === eventId);
  if (element !== undefined && element.employees.$values.length !== 0) {
    id = element.employees.$values.map((e) => e.id);
  }

  let options = employees.$values.map((e) => {
    if (!id.includes(e.id)) {
      return { name: e.name + " " + e.surname, value: e.id };
    }
    return { name: e.name + " " + e.surname, value: e.id, isdisabled: true };
  });

  useEffect(() => {
    console.log("useEffect");
  }, [progress]);

  const onAdd = (e) => {
    // console.log(e.target.parentElement.id);employeeIdProgress
    store.dispatch(employeeToProgress(e.target.parentElement.id, eventId, projectId));
    store.dispatch(updateProgressPlan(employeeIdProgress));
  };

  const onMinus = (e) => {
    console.log(e);
  };

  return (
    <div ref={employeeRef} className={style.container}>
      {options.map((e, i) => (
        <div key={i}>
          <div className={style.name}>
            {e.name}
            {!e.isdisabled && (
              <span id={e.value} className={style.plus} onClick={onAdd}>
                <IoAddCircleOutline />
              </span>
            )}
            {e.isdisabled && (
            <span id={e.value} className={style.minus} onClick={onMinus}>
              <IoRemoveCircleOutline />
            </span>
          )}
          </div>

          
        </div>
      ))}
    </div>
  );
}

export default AddEmployees;
