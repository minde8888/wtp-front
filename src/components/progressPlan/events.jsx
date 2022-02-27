import React,{useEffect, useState} from "react";
import { connect } from "react-redux";
import uuid from "uuid/v4";
import Draggable from "react-draggable";
import { range } from "../../helpers/range";
import { resize } from "../../redux/actions/progressPlan";
import { getAllProgressPlans } from "../../redux/actions/progressPlan";

function Events(props) {

  let now = new Date();
  const daysInMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  ).getDate();

  const [state, setState] = useState({
    minimum_size: 42,
    original_width: 0,
    original_x: 0,
    original_mouse_x: 0,
    container_size: daysInMonth * 42,
    current_container: {},
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    rightResize: 0,
    leftResize: 0,
  });

  const {
    minimum_size,
    original_width,
    original_mouse_x,
    element,
    right,
    left,
    top,
    bottom,
    rightResize,
    leftResize,
    container_size,
  } = state;

  const { stateResize } = props;

  // let now = new Date();
  // let daysInMonth = new Date(
  //   now.getFullYear(),
  //   now.getMonth() + 1,
  //   0
  // ).getDate();

  // const handleStart = (e, i) => {
  //   var containerSizeValues = containerRef.current[i].getBoundingClientRect();
  //   var eventSizeValues = e.target.parentElement.getBoundingClientRect();

  //   var top = i === 0 ? 0 : -containerSizeValues.height * i;
  //   var bottom = max === 0 ? 0 : (max - i) * containerSizeValues.height;
  //   var left =
  //     eventSizeValues.x -
  //     containerSizeValues.x -
  //     (containerSizeValues.width - container_size) / 2;
  //   var right =
  //     containerSizeValues.right -
  //     eventSizeValues.right -
  //     (containerSizeValues.width - container_size) / 2;

  //   document.addEventListener("mousemove", handleDrag);
  //   document.addEventListener("mouseup", onMouseUpDraggable);
  //   setState({ top: top, bottom: bottom, left: -left, right: right });
  // };
  const handleDrag = (e) => {
    // console.log(state);
  };
  const onMouseUpDraggable = (e) => {
    // console.log(state);
    // props.dispatch(resize(false));
    // console.log(e.target.parentElement);
    document.removeEventListener("mousemove", handleDrag);
    document.removeEventListener("mouseup", onMouseUpDraggable);
  };

  const onMouseDown = (e, i) => {
    setState({
      ...state,
      original_width: e.target.offsetParent.offsetWidth - 1,
      original_mouse_x: e.pageX,
      element: e.target.offsetParent,
      rightResize: e.target.classList.value,
      leftResize: e.target.classList.value,
      // current_container: containerRef.current[i].getBoundingClientRect(),
    });
    // props.dispatch(resize(true));
  };

  return (
    <>
      <Draggable
        bounds={{
          top: top,
          left: left,
          right: right,
          bottom: bottom,
        }}
        cancel="span"
        key={"item.id"}
        // onStop={(result) => onDragEnd(result, columns, setColumns)}
        // onStart={(e) => handleStart(e)}
      >
        <div
          className={`event ${"item.color"}`}
          id={"item.id"}
          // ref={(element) => {
          //   eventRef.current[i] = element;
          // }}
        >
          <span className="left" onMouseDown={(e) => onMouseDown(e)}></span>

          {/* {range(item.start tem.end).map((range) => (
            <div key={uuid()} className={`range ${item.color}`}>
              {range} 
            </div>
          ))} */ console.log(2222)}

          <span className="right" onMouseDown={(e) => onMouseDown(e)}></span>
          <span className="event-name">{"1"}</span>
        </div>
      </Draggable>
    </>
  );
}

export default Events;
