import React, { useEffect, useState, useCallback } from "react";
import Draggable from "react-draggable";
import { changeDate, draggableDate, sendId } from "../../redux/actions/progressPlan";
import store from "../../redux/store";
import { getDatesBetweenDates, dragDate, resizeDate } from "./date/date";

function Events({ event, container, id }) {
  /*-----------------------onDrag---------------------------------*/
  const [stateDrag, setDrag] = useState({
    top: 0,
    bottom: 0,
  });

  const { top, bottom } = stateDrag;
  const { color, start, end, progressPlanId, index } = event;

  const onStart = (e) => {
    let element = e.target.getBoundingClientRect();
    const containerSize = container.current.getBoundingClientRect();

    setDrag((prevState) => ({
      ...prevState,
      top: containerSize.top - element.top,
      bottom:
        containerSize.bottom - element.bottom - (element.top - element.bottom),
    }));
  };

  const onStop = useCallback(
    (e, data) => {
      let element = data.node.getBoundingClientRect();
      const elementHeight =
        Math.round((element.top - element.bottom) / 10) * 10;

      let days = Math.round(data.x / 30);
      let index = Math.round(data.y / -elementHeight);

      let newIndex = parseInt(data.node.attributes[2].value) + index;
      let elementId = data.node.id;
      let date = dragDate(start, end, days);
      store.dispatch(draggableDate(elementId, date, newIndex, id));
    },
    [id, end, start]
  );
  /*-----------------------onDrag End-------------------------------*/

  /*-----------------------Resize-----------------------------------*/
  const [state, setState] = useState({
    minimum_size: 29,
    original_width: 0,
    original_mouse_x: 0,
    element: null,
    rightResize: 0,
    leftResize: 0,
    elementResize: null,
    leftWidth: 0,
    isResizing: false,
  });

  let rgba = `${JSON.parse(color).r}, 
  ${JSON.parse(color).g} , 
  ${JSON.parse(color).b},
  ${JSON.parse(color).a}`;

  let colorBackground = { background: `rgba(${rgba})` };
  const elements = [];
  for (
    let i = 0;
    i < getDatesBetweenDates(new Date(start), new Date(end)).length;
    i++
  ) {
    elements.push(<div key={i} className={"range move"}></div>);
  }
  /* eslint-disable */
  const onMouseDown = useCallback(
    (e) => {
      setState((prevState) => ({
        ...prevState,
        original_width: e.target.offsetParent.offsetWidth - 1,
        original_mouse_x: e.pageX,
        element: e.target.offsetParent,
        rightResize: e.target.classList,
        leftResize: e.target.classList,
        resizeElement: e.target.offsetParent,
        isResizing: true,
      }));
    },
    [state]
  );
  /* eslint-disable */
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
        if (
          Object.values(rightResize).includes("right") &&
          element !== undefined
        ) {
          const width = original_width + (e.pageX - original_mouse_x);
          if (width > minimum_size) {
            element.style.width = width + "px";
          }
        } else if (
          Object.values(leftResize).includes("left") &&
          element !== undefined
        ) {
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
    const onMouseUp = (e) => {
      let newDaysPosition = Math.round((e.pageX - original_mouse_x) / 30);
      const widthLeft = original_width - (e.pageX - original_mouse_x);
      const widthRight = original_width + (e.pageX - original_mouse_x);

      if (
        Object.values(leftResize).includes("left") &&
        widthLeft >= minimum_size
      ) {
        store.dispatch(
          changeDate(
            element.id,
            resizeDate(start, newDaysPosition),
            "start",
            id
          )
        );
      } else if (
        Object.values(leftResize).includes("left") &&
        widthLeft <= minimum_size
      ) {
        store.dispatch(changeDate(element.id, resizeDate(end, 0), "start", id));
      }
      if (
        Object.values(rightResize).includes("right") &&
        widthRight >= minimum_size
      ) {
        store.dispatch(
          changeDate(element.id, resizeDate(end, newDaysPosition), "end", id)
        );
      } else if (
        Object.values(rightResize).includes("right") &&
        widthRight <= minimum_size
      ) {
        store.dispatch(changeDate(element.id, resizeDate(start, 0), "end", id));
      }
      newDaysPosition = 0;
    };
    if (state.isResizing) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
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
    id,
  ]);
  /*-----------------------Resize End--------------------------------*/

  const onContextMenu = (e) => {
    store.dispatch(sendId(e.target.offsetParent.id))
    const contextMenu = document.querySelector("#contextMenu");
    document.addEventListener("contextmenu", (e) => e.preventDefault());
    const { pageX, pageY } = e;
    contextMenu.style.top = `${pageY}px`;
    contextMenu.style.left = `${pageX}px`;
    contextMenu.style.display = "block";
  };

  return (
    <Draggable
      bounds={{
        top: top,
        bottom: bottom,
      }}
      cancel="span"
      onStop={(e, data) => onStop(e, data)}
      onStart={(e) => onStart(e)}
    >
      <div
        className="event"
        style={colorBackground}
        id={progressPlanId}
        index={index}
        onContextMenu={onContextMenu}
      >
        <span className="eventName">{event.name}</span>
        <span className="left move" onMouseDown={(e) => onMouseDown(e)}></span>
        {elements}
        <span className="right move" onMouseDown={(e) => onMouseDown(e)}></span>
        <span className="event-name"></span>
      </div>
    </Draggable>
  );
}

export default Events;
