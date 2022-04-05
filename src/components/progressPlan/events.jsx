import React, { useEffect, useState, useCallback } from "react";
import Draggable from "react-draggable";
import { changeDate, draggableDate } from "../../redux/actions/progressPlan";
import store from "../../redux/store";
import {
  getDatesBetweenDates,
  daysMonth,
  dragDate,
  resizeDate,
} from "./date/date";

function Events({ event, container }) {
  const [stateDrag, setDrag] = useState({ top: 0, bottom: 0 });
  const [statePosition, setPosition] = useState({ x: 0, y: 0 });
  const { top, bottom } = stateDrag;
  const { x, y } = statePosition;
  const { color, start, end, progressPlanId, index } = event;
  let daysInMonth = daysMonth();
  const handleStart = (e) => {
    var element = e.target.getBoundingClientRect();
    const containerSize = container.current.getBoundingClientRect();
    setDrag((prevState) => ({
      ...prevState,
      top: containerSize.top - element.top,
      bottom:
        containerSize.bottom - element.bottom - (element.top - element.bottom),
    }));
  };

  console.log(window.innerWidth);

  const onStop = useCallback(
    (event, data) => {
      const containerSize = container.current.getBoundingClientRect();
      let element = data.node.getBoundingClientRect();
      const elementHeight =
        Math.round((element.top - element.bottom) / 10) * 10;
      let positionTop = Math.round(
        (containerSize.top - element.top) / elementHeight
      );
      let positionBottom = Math.round(
        (containerSize.bottom - element.bottom) / elementHeight
      );

      setDrag((prevState) => ({
        ...prevState,
        top: positionTop,
        bottom: positionBottom,
      }));

      let days = Math.round(data.x / 30);
      let index = Math.round(data.y / -elementHeight);

      let newIndex = parseInt(data.node.attributes[2].value) + index;
      let id = data.node.id;
      let date = dragDate(start, end, days);
      store.dispatch(draggableDate(id, date, newIndex));

      setPosition({
        x: days,
        y: index,
      });
    },
    [container]
  );

  /*----------Resize--------------------*/

  const [state, setState] = useState({
    minimum_size: 29,
    original_width: 0,
    original_mouse_x: 0,
    container_size: daysInMonth * 30,
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
      rightResize
    ]
  );

  useEffect(() => {
    const onMouseUpResize = (e) => {
      document.removeEventListener("mousemove", onMouseMove);
      let newDaysPosition = Math.round((e.pageX - original_mouse_x) / 30);
      const widthLeft = original_width - (e.pageX - original_mouse_x);
      const widthRight = original_width + (e.pageX - original_mouse_x);
 
      if (leftResize === "left" && widthLeft >= minimum_size) {
        store.dispatch(
          changeDate(element.id, resizeDate(start, newDaysPosition), "start")
        );
      } else if (leftResize === "left" && widthLeft <= minimum_size) {
        store.dispatch(changeDate(element.id, resizeDate(end, 0), "start"));
      }
      if (rightResize === "right" && widthRight >= minimum_size) {
        store.dispatch(
          changeDate(element.id, resizeDate(end, newDaysPosition), "end")
        );
      } else if (leftResize === "right" && widthRight <= minimum_size) {
        store.dispatch(changeDate(element.id, resizeDate(start, 0), "end"));
      }
      newDaysPosition = 0;
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
    end,
  ]);

  return (
    <Draggable
      position={{
        x: x * 30,
        y: y * 20,
      }}
      bounds={{
        top: top,
        bottom: bottom,
      }}
      cancel="span"
      onStop={(event, data) => onStop(event, data)}
      onStart={(e) => handleStart(e)}
    >
      <div
        className="event"
        style={colorBackground}
        id={progressPlanId}
        index={index}
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
