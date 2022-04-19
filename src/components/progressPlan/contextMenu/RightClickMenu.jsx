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
  const { colorRef, eventId } = props;
  useOutsideAlerter(wrapperRef, colorRef);

  const onAdd = (e) => {
    console.log(props);
    console.log(e);
  };
  const onDelete = () => {
    console.log(eventId);
  };
  const onColor = () => {
    props.colorRef.current.style.display = "block";
    const { y, right } = wrapperRef.current.getBoundingClientRect();
    props.colorRef.current.style.top = `${y}px`;
    props.colorRef.current.style.left = `${right}px`;
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
      <SketchColor />
    </>
  );
}

function useOutsideAlerter(ref, colorRef) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && 
        !ref.current.contains(event.target) && 
        !colorRef.current.contains(event.target)) {
        ref.current.style.display = "none";
        colorRef.current.style.display = "none";
        
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, colorRef]);
}

function mapStateToProps(state) {
  const { eventId, colorRef } = state.progressPlan;
 
  return {
    eventId,
    colorRef
  };
}

export default connect(mapStateToProps)(RightClickMenu);
