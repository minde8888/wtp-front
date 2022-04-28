import React, { useRef } from "react";
import store from "../../../../redux/store";
import styles from "./info.module.scss";
import { addInfoRef } from "../../../../redux/actions/progressPlan";

function Info({ manager, employees }) {
  const infoRef = useRef(null);

  store.dispatch(addInfoRef(infoRef));
  const { name, surname } = manager;

  // const onChangeInfo = (e) => {
  //     console.log(e.target.value);
  // };

  return (
    <div ref={infoRef} className={styles.container}>
      <div>
        {name} {surname}
      </div>
    </div>
  );
}

export default Info;
