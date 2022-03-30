import React, { useEffect, useState, useCallback } from "react";
import { getDatesBetweenDates, daysInMonth, newDate } from "./date/date";
import { changeDate } from "../../redux/actions/progressPlan";
import store from "../../redux/store";

function ResizeEvents({ event }) {
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
        //   elementResize: eventRef.current,
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
  );
}

export default ResizeEvents;
