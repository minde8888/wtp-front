import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import store from "../../../redux/store";
import {
  updateProgressPlan,
  removeProgress,
  addEmployeeToProgress,
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
let employeeId = null;
let progressTitle = null;

function RightClickMenu(props) {
  const wrapperRef = useRef(null);
  const [state, setState] = useState({ position: null });
  const { position } = state;
  const {
    data,
    projectData,
    employees,
    colorRef,
    titleRef,
    employeeRef,
    infoRef,
    eventId,
    projectId,
    updateProgress,
    employeeIdProgress,
    progress,
    dispatch,
    updateProgressTitle,
    employeesIds,
  } = props;

  useOutsideAlerter(
    wrapperRef,
    colorRef,
    titleRef,
    employeeRef,
    infoRef,
    updateProgress,
    updateProgressTitle);

  employeeId = employeeIdProgress;
  updateObj = updateProgress;
  progressTitle = updateProgressTitle;

  const onAdd = () => {
    colorRef.current.style.display = "none";
    employeeRef.current.style.display = "none";
    infoRef.current.style.display = "none";
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

  const onInfo = () => {
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
        event={progress}
      />
      <AddEmployees
        employees={employees}
        eventId={eventId}
        projectId={projectId}
        progress={progress}
        employeesIds={employeesIds}
      />
      <Info
        eventId={eventId}
        projectId={projectId}
        manager={data}
        project={projectData}
      />
    </>
  );
}

function useOutsideAlerter(
  ref,
  colorRef,
  titleRef,
  employeeRef,
  infoRef,
  updateProgress,
  updateProgressTitles) {

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
          updateObj.employeesIds = null
          store.dispatch(updateProgressPlan(updateObj))
          progressTitle = undefined;
          updateObj = undefined
          console.log("color");
        }
        if (employeeId !== undefined) {
          store.dispatch(addEmployeeToProgress(employeeId));
        }
        if (progressTitle !== undefined) {
          progressTitle.employeesIds = null
          store.dispatch(updateProgressPlan(progressTitle));
          progressTitle = undefined;
          updateObj = undefined
          console.log("title");
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref,
    colorRef,
    titleRef,
    employeeRef,
    infoRef,
    updateObj,
    progressTitle,
    updateProgress,
    updateProgressTitles,
  ]);
}

function mapStateToProps(state) {
  const {
    eventId,
    titleRef,
    employeeRef,
    infoRef,
    employeesIds
  } = state.progressPlan;
  const {
    projectId,
    colorRef,
    updateProgress,
    projectData,
    employeeIdProgress,
    updateProgressTitle,
  } = state.project;
  const { data } = state.user;
  const { employees } = state.user.data;

  return {
    eventId,
    colorRef,
    projectId,
    updateProgress,
    titleRef,
    employeeRef,
    infoRef,
    employees,
    data,
    projectData,
    employeeIdProgress,
    updateProgressTitle,
    employeesIds,
  };
}

export default connect(mapStateToProps)(RightClickMenu);
