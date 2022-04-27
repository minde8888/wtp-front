import React, { useRef } from "react";
import store from "../../../../redux/store";
import styles from "./info.module.scss";
import { addinfoRef } from "../../../../redux/actions/progressPlan";


function Info() {

    const infoRef = useRef(null);

    store.dispatch(addinfoRef(infoRef));

    // const onChangeInfo = (e) => {
    //     console.log(e.target.value);
    // };

    return (
        <div
            ref={infoRef}
            className={styles.container}
        >

        </div>
    );
}

export default Info;