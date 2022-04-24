import React, { useRef } from "react";
import store from "../../../../redux/store";
import reactCSS from "reactcss";
import styles from "./changeTitle.module.scss";
import { addTitleAdd } from "../../../../redux/actions/progressPlan";

function ChangeTitle({ wrapperRef, eventId, projectId, position, title }) {
  const titleRef = useRef(null);
  let stylePosition = null;
  if (position != null) {
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

  store.dispatch(addTitleAdd(titleRef));

  const onChangeTitle = (e) => {
    console.log(e.target.value);
  };

  return (
    <div
      ref={titleRef}
      className={styles.container}
      style={stylePosition !== null ? stylePosition.position : none}
    >
      <div className={styles.title}>{title}</div>
      <div className={styles.inputs}>
        <input
          type="text"
          placeholder="Project title"
          onChange={onChangeTitle}
        />
      </div>
    </div>
  );
}

export default ChangeTitle;
