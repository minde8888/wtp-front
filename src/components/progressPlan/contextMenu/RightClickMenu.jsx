import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import store from "../../../redux/store";
import {
  updateProgress,
  removeProgress,
} from "../../../redux/actions/progressPlan";
import SketchColor from "./colorPicker/colorPicker";
import ChangeTitle from "./changeTitle/changeTitle";
import AddEmployees from "./addEmployees/addEmployees";
import Info from "./info/info";
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
  const [state, setState] = useState({ position: null });

  const { position } = state;
  const {
    data,
    employees,
    colorRef,
    titleRef,
    employeeRef,
    infoRef,
    eventId,
    title,
    projectId,
    updateProgress,
    dispatch,
  } = props;

  useOutsideAlerter(wrapperRef, colorRef, titleRef, employeeRef, infoRef);
  updateObj = updateProgress;

  const onAdd = () => {
    colorRef.current.style.display = "none";
    employeeRef.current.style.display = "none";
    titleRef.current.style.display = "block";
    setState({
      position: wrapperRef.current.getBoundingClientRect(),
      isTitle: true,
    });
  };

  const onDelete = () => {
    dispatch(removeProgress(eventId, projectId));
    wrapperRef.current.style.display = "none";
  };

  const onColor = () => {
    titleRef.current.style.display = "none";
    employeeRef.current.style.display = "none";
    infoRef.current.style.display = "none";
    colorRef.current.style.display = "block";
    const { y, right } = wrapperRef.current.getBoundingClientRect();
    colorRef.current.style.top = `${y}px`;
    colorRef.current.style.left = `${right}px`;
  };

  const onEmployee = () => {
    colorRef.current.style.display = "none";
    titleRef.current.style.display = "none";
    infoRef.current.style.display = "none";
    employeeRef.current.style.display = "block";
    const { y, right } = wrapperRef.current.getBoundingClientRect();
    employeeRef.current.style.top = `${y}px`;
    employeeRef.current.style.left = `${right}px`;
  };

  const onInfo = (e) => {
    console.log(e);
    colorRef.current.style.display = "none";
    titleRef.current.style.display = "none";
    employeeRef.current.style.display = "none";
    infoRef.current.style.display = "block";
    const { y, right } = wrapperRef.current.getBoundingClientRect();
    infoRef.current.style.top = `${y}px`;
    infoRef.current.style.left = `${right}px`;
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
      <ChangeTitle
        position={position}
        projectId={projectId}
        eventId={eventId}
        wrapperRef={wrapperRef}
        title={title}
      />
      <AddEmployees employees={employees} />
      <Info manager={data} employees={employees}/>
    </>
  );
}

function useOutsideAlerter(ref, colorRef, titleRef, employeeRef, infoRef) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !colorRef.current.contains(event.target) &&
        !titleRef.current.contains(event.target) &&
        !employeeRef.current.contains(event.target) &&
        !infoRef.current.contains(event.target)
      ) {
        ref.current.style.display = "none";
        colorRef.current.style.display = "none";
        titleRef.current.style.display = "none";
        employeeRef.current.style.display = "none";
        infoRef.current.style.display = "none";
        if (updateObj !== undefined) {
          store.dispatch(updateProgress(updateObj));
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, colorRef, titleRef, employeeRef, infoRef]);
}

function mapStateToProps(state) {
  const { eventId, title, titleRef, employeeRef, infoRef } = state.progressPlan;
  const { projectId, colorRef, updateProgress } = state.project;
  const { employees, data } = state.user;

  return {
    eventId,
    title,
    colorRef,
    projectId,
    updateProgress,
    titleRef,
    employeeRef,
    infoRef,
    employees,
    data
  };
}

export default connect(mapStateToProps)(RightClickMenu);
