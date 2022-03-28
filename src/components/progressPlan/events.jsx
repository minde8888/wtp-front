import React, { useState, useCallback } from "react";
import Draggable from "react-draggable";
import ResizeEvents from "./resizeEvent";

function Events({ event, container }) {
  const [state, setState] = useState({ top: 0, bottom: 0 });

  const { top, bottom } = state;

  const handleStart = (e) => {
    var element = e.target.getBoundingClientRect();

    const containerSize = container.current.getBoundingClientRect();
    console.log(containerSize.top - element.top);
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", onMouseUpDraggable);

    setState((prevState) => ({
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
  // console.log(top);
  // console.log(111111);

  // console.log(top);
  // console.log(bottom);

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
      <ResizeEvents event={event} container={container} />
    </Draggable>
  );
}

export default Events;
