import React, { useRef } from "react";
import store from "../../../../redux/store";
import reactCSS from "reactcss";
import styles from "./changeTitle.module.scss";
import {
  addTitleRef,
  titleOnChange,
} from "../../../../redux/actions/progressPlan";

let obj = {};
function ChangeTitle({ eventId, projectId, position, event }) {
  let progress = event.find((e) => e.progressPlanId === eventId);

  const titleRef = useRef(null);
  obj = { eventId: eventId, projectId: projectId };
  let stylePosition = null;

  if (position !== null) {
    const { y, right } = position;
    stylePosition = reactCSS({
      default: {
        position: {
          position: "fixed",
          top: `${y}px`,
          left: `${right}px`,
        },
      },
    });
  }

  let none = {
    display: "none",
  };

  store.dispatch(addTitleRef(titleRef));

  const onChangeTitle = (e) => {
    store.dispatch(titleOnChange(e.target.value, obj.eventId, obj.projectId));
  };

  return (
    <div
      ref={titleRef}
      className={styles.container}
      style={stylePosition !== null ? stylePosition.position : none}
    >
      <div className={styles.border}>
        <div className={styles.title}>{progress &&(progress.name)}</div>
        <div className={styles.inputs}>
          <input
            type="text"
            placeholder="Project title"
            onChange={onChangeTitle}
            value={progress !== undefined ?(progress.name):""}
          />
        </div>
      </div>
    </div>
  );
}

export default ChangeTitle;
