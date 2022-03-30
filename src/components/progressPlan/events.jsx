import React, { useEffect, useState, useCallback } from "react";
import Draggable from "react-draggable";
import { changeDate } from "../../redux/actions/progressPlan";
import store from "../../redux/store";
import { getDatesBetweenDates, daysInMonth, newDate } from "./date/date";

function Events({ event, container }) {

  const [stateDrag, setDrag] = useState({ top: 0, bottom: 0 });
  const { top, bottom } = stateDrag;

  const handleStart = (e) => {
    console.log(e);
    var element = e.target.getBoundingClientRect();

    const containerSize = container.current.getBoundingClientRect();
    console.log(containerSize.top - element.top);
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", onMouseUpDraggable);

    setDrag((prevState) => ({
      ...prevState,
      top: containerSize.top - element.top,
      bottom: containerSize.bottom - element.bottom,
    }));
  };

  const handleDrag = (e) => {
    // console.log(e.target.getBoundingClientRect());
    // console.log(window.screen.width);
  };

  const onMouseUpDraggable = useCallback(
    (e) => {
      const containerSize = container.current.getBoundingClientRect();

      let element = e.target.getBoundingClientRect();

      // let positionTop = Math.round((container.top - element.top) / 20);
      // let positionBottom = Math.round((container.bottom - element.bottom) / 20);
      setState((prevState) => ({
        ...prevState,
        top: containerSize.top - element.top,
        bottom: containerSize.bottom - element.bottom,
      }));

      // console.log(e.target.parentElement);
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", onMouseUpDraggable);
    },
    [container]
  );

  /*----------Resize--------------------*/

  const { color, start, end, progressPlanId } = event;

  const [state, setState] = useState({
    minimum_size: 29,
    original_width: 0,
    original_x: 0,
    original_mouse_x: 0,
    container_size: daysInMonth * 30,
    current_container: {},
    element: null,
    rightResize: 0,
    leftResize: 0,
    containerSizeValues: null,
    elementResize: null,
    leftWidth: 0,
    isResizing: false,
  });

  let rgb =
    JSON.parse(color).r + "," + JSON.parse(color).g + "," + JSON.parse(color).b;

  let colorBackground = { background: `rgba(${rgb})` };

  const elements = [];
  for (
    let i = 0;
    i < getDatesBetweenDates(new Date(start), new Date(end)).length;
    i++
  ) {
    elements.push(<div key={i} className={"range"}></div>);
  }

  const onMouseDown = useCallback(
    (e) => {
      setState((prevState) => ({
        ...prevState,
        original_width: e.target.offsetParent.offsetWidth - 1,
        original_mouse_x: e.pageX,
        original_x: e.target.offsetParent.getBoundingClientRect().left,
        element: e.target.offsetParent,
        rightResize: e.target.classList.value,
        leftResize: e.target.classList.value,
        resizeElement: e.target.offsetParent,
        isResizing: true,
      }));
    },
    [setState]
  );

  const {
    minimum_size,
    original_width,
    original_mouse_x,
    element,
    rightResize,
    leftResize,
    leftWidth,
  } = state;

  const onMouseMove = useCallback(
    (e) => {
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
            element.style.left = leftWidth + e.pageX - original_mouse_x + "px";
          }
        }
      }
    },
    [
      element,
      leftResize,
      leftWidth,
      minimum_size,
      original_mouse_x,
      original_width,
      rightResize,
    ]
  );

  useEffect(() => {
    const onMouseUpResize = (e) => {
      document.removeEventListener("mousemove", onMouseMove);
      let newDaysPosition = Math.round((e.pageX - original_mouse_x) / 30);
      if (leftResize === "left") {
        store.dispatch(changeDate(element.id, newDate(start, newDaysPosition), "start"));
      }
      if (leftResize === "right") {
        store.dispatch(changeDate(element.id, newDate(end, newDaysPosition), "end"));
      }
    };
    if (state.isResizing) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUpResize);
    }
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUpResize);
    };
  }, [
    state.isResizing,
    onMouseMove,
    element,
    leftResize,
    leftWidth,
    minimum_size,
    original_mouse_x,
    original_width,
    rightResize,
    event,
    start,
    end
  ]);

  return (
    <Draggable
      bounds={{
        top: top,
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
      >
        <span className="left" onMouseDown={(e) => onMouseDown(e)}></span>
        {elements}
        <span className="right" onMouseDown={(e) => onMouseDown(e)}></span>
        <span className="event-name"></span>
      </div>
    </Draggable>
  );
}

export default Events;
