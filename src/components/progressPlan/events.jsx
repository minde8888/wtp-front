import React, { useEffect, useState, useCallback, useRef } from "react";
import { connect } from "react-redux";
import Draggable from "react-draggable";
import { resize } from "../../redux/actions/progressPlan";
import { getAllProgressPlans } from "../../redux/actions/progressPlan";
import { getDatesBetweenDates } from "./date/date";
import { daysInMonth } from "./date/date";

function Events({ event, container }) {
  /*-------------Resize Start-----------------*/

  const { color, start, end, progressPlanId } = event;

  const [state, setState] = useState({
    minimum_size: 30,
    original_width: 0,
    original_x: 0,
    original_mouse_x: 0,
    container_size: daysInMonth * 30,
    current_container: {},
    element: null,
    top: 0,
    bottom: 0,
    rightResize: 0,
    leftResize: 0,
    containerSizeValues: null,
    elementResize: null,
    isResizing: false,
  });

  const onMouseDown = useCallback(
    (e) => {
      setState((prevState) => ({
        ...prevState,
        elementResize: eventRef.current,
        original_width: e.target.offsetParent.offsetWidth - 1,
        original_mouse_x: e.pageX,
        element: e.target.offsetParent,
        rightResize: e.target.classList.value,
        leftResize: e.target.classList.value,
        resizeElement: e.target.offsetParent,
        isResizing: true,
      }));
    },
    [setState, progressPlanId]
  );

  const {
    minimum_size,
    original_width,
    original_mouse_x,
    element,
    top,
    bottom,
    rightResize,
    leftResize,
    container_size,
    containerSizeValues,
    elementResize,
  } = state;

  const onMouseMove = useCallback(
    (e) => {
      // console.log(element);
      if (element) {
        if (rightResize === "right" && element !== undefined) {
          const width = original_width + (e.pageX - original_mouse_x);
          if (width > minimum_size) {
            element.style.width = width + "px";
          }
        } else if (leftResize === "left" && element !== undefined) {
          const width = original_width - (e.pageX - original_mouse_x);
          if (width > minimum_size) {
            element.style.width = width + "px";
            element.style.left = 4 + (e.pageX - original_mouse_x) + "px";
          }
        }
      }
    },
    [state, container]
  );

  useEffect(() => {
    const onMouseUpResize = (e) => {
      // console.log(progressPlanId);
      document.removeEventListener("mousemove", onMouseMove);
      // document.removeEventListener("mouseup", onMouseUpResize);
      setState((prevState) => ({ ...prevState, isResizing: false }));
    };

    if (state.isResizing) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUpResize);
    }
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUpResize);
    };
  }, [container.current, onMouseMove, state]);

  /*----------Resize End --------------------*/

  /*------------Draggable start--------------*/

  const handleStart = (e) => {
    var element = e.target.getBoundingClientRect();
    // const container = container.current.getBoundingClientRect();
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", onMouseUpDraggable);

    // setState({
    //   top: container.top - element.top,
    //   bottom: container.bottom - element.bottom,
    // });
    // console.log(container.top - element.top);
    // console.log(container.top);
    // console.log(element.top);
    // console.log(top);
    // console.log(111111);
  };

  // console.log(top);
  // console.log(bottom);

  const handleDrag = (e) => {
    // console.log(e.target.getBoundingClientRect());
    console.log(window.screen.width);
  };

  const onMouseUpDraggable = (e) => {
    // console.log(e.target);
    // console.log(state);
    let element = e.target.getBoundingClientRect();
    // console.log(element);
    // const cont = container.current.getBoundingClientRect();
    // let row = (container.bottom - container.top) / 20;
    let positionTop = Math.round((container.top - element.top) / 20);
    let positionBottom = Math.round((container.bottom - element.bottom) / 20);
    setState({
      top: positionTop * 20,
      bottom: positionBottom * 20,
    });

    // console.log(e.target.parentElement);
    document.removeEventListener("mousemove", handleDrag);
    document.removeEventListener("mouseup", onMouseUpDraggable);
  };

  /*------------Draggable End----------------*/

  let rgb =
    JSON.parse(color).r + "," + JSON.parse(color).g + "," + JSON.parse(color).b;

  var colorBackground = { background: `rgba(${rgb})` };

  const elements = [];
  for (
    let i = 0;
    i < getDatesBetweenDates(new Date(start), new Date(end)).length;
    i++
  ) {
    elements.push(<div key={i} className={"range"}></div>);
  }
  // console.log(top);
  // console.log(bottom);
  var eventRef = useRef([]);
  // console.log(props);
  return (
    <Draggable
      bounds={{
        top: top, //nurodo kiek judeti elementui nuo esemos pozicijos i virsu
        bottom: bottom,
      }}
      cancel="span"
      // onStop={(result) => onDragEnd(result)}
      onStart={(e) => handleStart(e)}
    >
      <div
        className="event"
        style={colorBackground}
        id={progressPlanId}
        ref={(element) => {
          eventRef.current = element;
        }}
      >
        {/* {console.log(top)} */}
        <span className="left" onMouseDown={(e) => onMouseDown(e)}></span>
        {elements}
        <span className="right" onMouseDown={(e) => onMouseDown(e)}></span>
        <span className="event-name"></span>
      </div>
    </Draggable>
  );
}

export default Events;
