import React, { useRef } from "react";
import store from "../../../../redux/store";
import styles from "./info.module.scss";
import { addInfoRef } from "../../../../redux/actions/progressPlan";

function Info({ project, manager, eventId, projectId }) {
    const infoRef = useRef(null);

    store.dispatch(addInfoRef(infoRef));
    const { name, surname } = manager;

    // let employee = project.map((e) => { e.projectId === projectId });
    let currentProject = project.find((p) => { return p.projectId === projectId })
    let progressPlan = {}
    if (currentProject !== undefined) {
        progressPlan = currentProject.progressPlan.$values.find((p) => { return p.progressPlanId === eventId })
    }
    // console.log(progressPlan.employees);
    // const onChangeInfo = (e) => {
    //     console.log(e.target.value);
    // };

    return (
        <div ref={infoRef} className={styles.container}>
            <div className={styles.border}>
                {name} {surname}
            </div>
            {currentProject !== undefined && 
            progressPlan.employees.$values.length > 0 ? 
            progressPlan.employees.$values.map((e) =>
                (<div>{e.name}</div>)
            ) : null}
        </div>
    );
}

export default Info;
