import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import store from "../../../redux/store";
import {
  updateProgressPlan,
  removeProgress,
  addEmployeeToProgress,
  employeeIdProgress,
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

const RightClickMenu = (props) => {
  const wrapperRef = useRef(null);

  const [state, setState] = useState({ position: null });
  const [infoRef, setInfoRef] = useState(null);
  const [colorRef, setColorRef] = useState(null);
  const [titleRef, setTitleRef] = useState(null);
  const [employeeRef, setEmployeeRef] = useState(null);

  const { position } = state;
  const {
    data,
    projectData,
    employees,
    eventId,
    projectId,
    updateProgressColor,
    updateProgressTitle,
    progress,
    dispatch,
    employeesIds,
    employeeIsChanged
  } = props;

  useOutsideAlerter(
    wrapperRef,
    colorRef,
    titleRef,
    employeeRef,
    infoRef,
    updateProgressColor,
    updateProgressTitle,
    employeesIds,
    eventId,
    progress,
    employeeIsChanged
  );

  const getPosition = () => {
    return wrapperRef.current.getBoundingClientRect();
  };

  const onAddTitle = () => {
    colorRef.style.display = "none";
    employeeRef.style.display = "none";
    infoRef.style.display = "none";
    titleRef.style.display = "block";
    setState({
      position: getPosition(),
      isTitle: true,
    });
  };

  const onDelete = () => {
    dispatch(removeProgress(eventId, projectId));
    wrapperRef.current.style.display = "none";
  };

  const onColor = () => {
    titleRef.style.display = "none";
    employeeRef.style.display = "none";
    infoRef.style.display = "none";
    colorRef.style.display = "block";
    const { y, right } = getPosition();
    colorRef.style.top = `${y}px`;
    colorRef.style.left = `${right}px`;
  };

  const onEmployee = () => {
    colorRef.style.display = "none";
    titleRef.style.display = "none";
    infoRef.style.display = "none";
    employeeRef.style.display = "block";
    const { y, right } = getPosition();
    employeeRef.style.top = `${y}px`;
    employeeRef.style.left = `${right}px`;
    let id = findExistingIds(progress, eventId);
    store.dispatch(employeeIdProgress(id));
  };

  const onInfo = () => {
    colorRef.style.display = "none";
    titleRef.style.display = "none";
    employeeRef.style.display = "none";
    infoRef.style.display = "block";
    const { y, right } = getPosition();
    infoRef.style.top = `${y}px`;
    infoRef.style.left = `${right}px`;
  };

  return (
    <>
      <div id="contextMenu" ref={wrapperRef} className={styles.container}>
        <div className={styles.info} onClick={onInfo}>
          <IoEllipsisVerticalOutline />
          <span>Info</span>
        </div>
        <div className={styles.add} onClick={onAddTitle}>
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
      <SketchColor ref={setColorRef} projectId={projectId} eventId={eventId} />

      <ChangeTitle
        ref={setTitleRef}
        position={position}
        projectId={projectId}
        eventId={eventId}
        event={progress}
      />
      <AddEmployees
        ref={setEmployeeRef}
        employees={employees}
        eventId={eventId}
        progress={progress}
        employeesIds={employeesIds}
      />
      <Info
        ref={setInfoRef}
        eventId={eventId}
        projectId={projectId}
        manager={data}
        project={projectData}
      />
    </>
  );
};

function findExistingIds(progress, eventId) {
  let element = progress.find((e) => e.progressPlanId === eventId);
  if (
    element !== undefined &&
    element.employees.$values.length !== 0 &&
    eventId !== null
  ) {
    return element.employees.$values.map((e) => e.id);
  }
  return [];
}

function useOutsideAlerter(
  ref,
  colorRef,
  titleRef,
  employeeRef,
  infoRef,
  updateProgressColor,
  updateProgressTitle,
  employeesIds,
  eventId,
  progress,
  employeeIsChanged
) {
  // const { color } = updateProgress || {};

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !colorRef.contains(event.target) &&
        !titleRef.contains(event.target) &&
        !employeeRef.contains(event.target) &&
        !infoRef.contains(event.target)
      ) {
        ref.current.style.display = "none";
        colorRef.style.display = "none";
        titleRef.style.display = "none";
        employeeRef.style.display = "none";
        infoRef.style.display = "none";
        if (updateProgressColor) {
          store.dispatch(
            updateProgressPlan({ ...updateProgressColor, employeesIds: [] })
          );
        }
        if (updateProgressTitle) {
          store.dispatch(
            updateProgressPlan({ ...updateProgressTitle, employeesIds: [] })
          );
        }
        if (employeeIsChanged) {
          store.dispatch(
            addEmployeeToProgress({
              employeesIds: employeesIds,
              ProgressPlanId: eventId,
            })
          );
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      console.log(111111);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [
    ref,
    colorRef,
    titleRef,
    infoRef,
    employeeRef,
    updateProgressColor,
    updateProgressTitle,
    employeeIsChanged,
    progress
  ]);
}

function mapStateToProps(state) {
  const { eventId, infoRef, employeesIds, employeeIsChanged } = state.progressPlan;
  const { projectId, updateProgressColor, updateProgressTitle, projectData } =
    state.project;
  const { data } = state.user;
  const { employees } = state.user.data;

  return {
    eventId,
    projectId,
    updateProgressColor,
    updateProgressTitle,
    infoRef,
    employees,
    data,
    projectData,
    employeesIds,
    employeeIsChanged
  };
}

export default connect(mapStateToProps)(RightClickMenu);
