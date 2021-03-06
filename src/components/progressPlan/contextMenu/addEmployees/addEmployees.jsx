import React, { forwardRef, useEffect, useState } from "react";
import store from "../../../../redux/store";

import {
  employeeIdProgress,
  removeIdProgress,
} from "../../../../redux/actions/progressPlan";
import style from "./addEmployees.module.scss";
import plus from "../../../../svg/plus_circle_icon.svg";
import minus from "../../../../svg/remove_cancel_close_delete_minus_icon.svg";

const AddEmployees = forwardRef(
  (
    { employees, eventId, progress, employeesIds, employeesProgressId },
    ref
  ) => {
    const [prevSymbol, forceRender] = useState(Symbol());

    useEffect(() => {
      forceRender(Symbol());
    }, [employeesProgressId]);

    let options = employees.$values.map((e) => {
      if (!employeesIds.includes(e.id)) {
        return { name: e.name + " " + e.surname, value: e.id, event: eventId };
      }
      return { name: e.name + " " + e.surname, value: e.id, isDisabled: true, event: eventId };
    });

    useEffect(() => {
      forceRender(Symbol());
    }, [progress]);



    const onAdd = (e) => {
      store.dispatch(employeeIdProgress([e.target.parentElement.id]));
    };

    const onMinus = (e) => {
      store.dispatch(removeIdProgress(e.target.parentElement.id));
    };
//     console.log(eventId);
// console.log(options);
    return (
      <div ref={ref} className={style.container}>
        {options.map((e, i) => (
          <div key={i} >
            {/* {console.log(e.event) }
            {console.log(i)}
            {console.log(eventId)} */}
            {e.event === eventId &&
              (<div className={!e.isDisabled ? style.name : style.deactivate}>
                {e.name}
                {!e.isDisabled && (
                  <div id={e.value} className={style.plus} onClick={onAdd}>
                    <img src={plus} alt="" />
                  </div>
                )}
                {e.isDisabled && (
                  <div id={e.value} className={style.minus} onClick={onMinus}>
                    <img src={minus} alt="" />
                  </div>
                )}
              </div>)}          
          </div>
        ))}
      </div >
    );
  }
);

export default AddEmployees;
