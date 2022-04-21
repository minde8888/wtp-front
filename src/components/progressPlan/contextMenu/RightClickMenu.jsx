import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import store from "../../../redux/store";
import { updateProgress, removeProgress } from "../../../redux/actions/progressPlan";
import SketchColor from "./colorPicker/colorPicker";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  IoAddCircleOutline,
  IoEllipsisVerticalOutline,
  IoWaterSharp,
  IoPersonAddOutline,
} from "react-icons/io5";
import styles from "./rightClickMenus.module.scss";


let updateObj = null;

function RightClickMenu(props) {

  const wrapperRef = useRef(null);
  const { colorRef, eventId, projectId, updateProgress } = props;
  useOutsideAlerter(wrapperRef, colorRef);
  updateObj = updateProgress;

  const onAdd = (e) => {
    console.log(props);
    console.log(e);
  };

  const onDelete = () => {
    props.dispatch(removeProgress(eventId, projectId))
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
      <SketchColor projectId={projectId} eventId={eventId} />
    </>
  );
}

function useOutsideAlerter(ref, colorRef) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !colorRef.current.contains(event.target)
      ) {
        ref.current.style.display = "none";
        colorRef.current.style.display = "none";
        if (updateObj !== undefined) {
          store.dispatch(updateProgress(updateObj))
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, colorRef]);
}

function mapStateToProps(state) {

  const { eventId } = state.progressPlan;
  const { projectId, colorRef, updateProgress } = state.project;

  return {
    eventId,
    colorRef,
    projectId,
    updateProgress
  };
}

export default connect(mapStateToProps)(RightClickMenu);
