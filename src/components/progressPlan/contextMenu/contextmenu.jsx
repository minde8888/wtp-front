import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import SketchColor from "../addProgressPlan/colorPicker/colorPicker";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  IoAddCircleOutline,
  IoEllipsisVerticalOutline,
  IoWaterSharp,
  IoPersonAddOutline,
} from "react-icons/io5";
import styles from "./rightClickMenus.module.scss";

function RightClickMenu(props) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const { eventId } = props;

  const onAdd = (e) => {
    console.log(props);
    console.log(e);
  };
  const onDelete = () => {
    console.log(eventId);
  };
  const onColor = (e) => {
    console.log(e);
  };
  const onEmployee = (e) => {
    console.log(e);
  };
  const onInfo = (e) => {
    console.log(e);
  };

  return (
    <>
      <div id="contextMenu" ref={wrapperRef} className={styles.container}>
        <div className={styles.info} onClick={onInfo}>
          <IoEllipsisVerticalOutline />
          <span>Info</span>
        </div>
        <div className={styles.add} onClick={onAdd}>
          <IoAddCircleOutline />
          <span>Name</span>
        </div>
        <div className={styles.color} onClick={onColor}>
          <IoWaterSharp />
          <span>Color</span>
        </div>
        <div className={styles.employee} onClick={onEmployee}>
          <IoPersonAddOutline />
          <span>Add employee</span>
        </div>
        <div className={styles.delete} onClick={onDelete}>
          <RiDeleteBin6Line />
          <span>Delete</span>
        </div>
      </div>
      
      {/* <div>
        <SketchColor />
      </div> */}
    </>
  );
}

function useOutsideAlerter(ref) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        ref.current.style.display = "none";
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

function mapStateToProps(state) {
  const { eventId } = state.progressPlan;
  return {
    eventId,
  };
}

export default connect(mapStateToProps)(RightClickMenu);
