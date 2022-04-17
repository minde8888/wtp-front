import React from "react";
import { ContextMenu, MenuItem } from "react-contextmenu";
import { RiSendPlaneFill, RiDeleteBin6Line } from "react-icons/ri";
import styles from "./rightClickMenus.module.scss";

function rightClickMenu(props) {
  const handleClick = (e, data) => {
    console.log(data.foo);
  };

  return (
    <>
      <ContextMenu className={styles.container} id="same_unique_identifier">
        <MenuItem data={{ foo: "bar1" }} onClick={handleClick}>
          ContextMenu Item 1
        </MenuItem>
        <MenuItem data={{ foo: "bar2" }} onClick={handleClick}>
          ContextMenu Item 2
        </MenuItem>
        {/* <MenuItem divider /> */}
        <MenuItem className={styles.contextMenuItem} data={{ foo: "delete" }} onClick={handleClick}>
          <RiDeleteBin6Line className={styles.delete} />
          <span> Delete</span>
        </MenuItem>
      </ContextMenu>
    </>
  );
}

export default rightClickMenu;
