import React, { useRef } from "react";
import store from "../../../../redux/store";
import styles from "./info.module.scss";
import { addInfoRef } from "../../../../redux/actions/progressPlan";

function Info({ project, manager, eventId, projectId }) {
  const infoRef = useRef(null);
console.log();
  store.dispatch(addInfoRef(infoRef));
  const { name, surname, occupation } = manager;

  let currentProject = project.find((p) => {
    return p.projectId === projectId;
  });
 
  let progressPlan = {};
  if (currentProject !== undefined) {
    progressPlan = currentProject.progressPlan.$values.find((p) => {
      return p.progressPlanId === eventId;
    });
  }

  return (
    <div ref={infoRef} className={styles.container}>
      <div className={styles.title}>
        {progressPlan.name}
      </div>
      {occupation && <div className={styles.occupation}>{occupation}</div>}
      <div className={styles.border}>
        {name} {surname}
      </div>
      {currentProject !== undefined && progressPlan.employees.$values.length > 0
        ? progressPlan.employees.$values.map((e, i) => (
            <div key={i}>
              {e.occupation && <div>{e.occupation}</div>}
              <div>
                {e.name} {e.surname}
              </div>
            </div>
          ))
        : null}
    </div>
  );
}

export default Info;
