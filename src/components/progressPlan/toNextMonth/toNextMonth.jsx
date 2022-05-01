import React from "react";
import styles from "./toNextMonth.module.scss";
import store from "../../../redux/store";
import { prevMonth } from "../../../redux/actions/progressPlan";
import { nextMonth } from "../../../redux/actions/progressPlan";

function ToNextMonth({ rowMaxNumber }) {

  const onMouseOverLeft = () => {
    store.dispatch(prevMonth(-1));
  };
  const onMouseOverRight = () => {
    store.dispatch(nextMonth(1));
  };

  let arrow = {
    fontSize: 30 + "px",
    color: "rgb(77, 78, 78)",
    width: 90 + "px",
    height: rowMaxNumber * 20 + "px",
    marginTop: 0 + "px",
    zIndex: 2,
    position: "fixed",
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.left}
        style={arrow}
        onMouseOver={onMouseOverLeft}
      ></div>
      <div
        className={styles.right}
        style={arrow}
        onMouseOver={onMouseOverRight}
      ></div>
    </div>
  );
}

export default ToNextMonth;
