import React, { useEffect, useState, useCallback, useRef } from "react";
import { connect } from "react-redux";
import Draggable from "react-draggable";
import { resize } from "../../redux/actions/progressPlan";
import { getAllProgressPlans } from "../../redux/actions/progressPlan";
import { getDatesBetweenDates } from "./date/date";
import { daysInMonth } from "./date/date";

function Events(props) {
  /*-------------Resize Start-----------------*/
console.log(props);
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
   // containerSizeValues: props.container.current.getBoundingClientRect(), //uzkrauna pries gaunant props container
  });

  const { stateResize } = props;

  const onMouseDown = (e) => {
    console.log(e);
    setState({
      // neuzsetina !!!!!!!!!!!!!!!
      original_width: e.target.offsetParent.offsetWidth - 1,
      original_mouse_x: e.pageX,
      element: e.target.offsetParent,
      rightResize: e.target.classList.value,
      leftResize: e.target.classList.value,
      //current_container: props.container.current.getBoundingClientRect(),
    });
    props.dispatch(resize(true));
  };

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
  } = state;

  useEffect(() => {
    if (stateResize) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUpResize);
    } else {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUpResize);
    }

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUpResize);
    };
  }, [stateResize]);

  const onMouseMove = useCallback(
    (e) => {
      console.log(window.screen.width);
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
    [
      stateResize,
      element,
      original_mouse_x,
      leftResize,
      minimum_size,
      original_width,
      rightResize,
    ]
  );

  const onMouseUpResize = useCallback((e) => {
    props.dispatch(resize(false));
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUpResize);
  });

  /*----------Resize End --------------------*/

  /*------------Draggable start--------------*/

  const onDragEnd = (e) => {
    // console.log(e);
  };

  const handleStart = (e) => {
    // var element = e.target.getBoundingClientRect();
    // var containerSizeValues = props.container.current.getBoundingClientRect();
    // document.addEventListener("mousemove", handleDrag);
    // document.addEventListener("mouseup", onMouseUpDraggable);
    // setState({
    //   top: containerSizeValues.top - element.top,
    //   bottom: containerSizeValues.bottom - element.bottom,
    // });
  };

  const handleDrag = (e) => {
    console.log(window.screen.width);
  };

  const onMouseUpDraggable = (e) => {
    // console.log(state);
    props.dispatch(resize(false));
    // console.log(e.target.parentElement);
    document.removeEventListener("mousemove", handleDrag);
    document.removeEventListener("mouseup", onMouseUpDraggable);
  };

  /*------------Draggable End----------------*/

  const { color, start, end, progressPlanId } = props.data;

  let rgb =
    JSON.parse(color).r + "," + JSON.parse(color).g + "," + JSON.parse(color).b;

  var colorBackground = { background: `rgba(${rgb})` };

  const elements = [];
  for (
    let i = 0;
    i < getDatesBetweenDates(new Date(start), new Date(end)).length;
    i++
  ) {
    elements.push(
      <div key={i} className={"range"} style={colorBackground}></div>
    );
  }

  var eventRef = useRef([]);

  return (
    <Draggable
      bounds={{
        top: top,
        bottom: bottom,
      }}
      cancel="span"
      onStop={(result) => onDragEnd(result)}
      onStart={(e) => handleStart(e)}
    >
      <div
        className={`event `}
        id={progressPlanId}
        ref={(element) => {
          eventRef.current = element;
        }}
      >
        <span className="left" onMouseDown={(e) => onMouseDown(e)}></span>
        {elements}
        <span className="right" onMouseDown={(e) => onMouseDown(e)}></span>
        <span className="event-name"></span>
      </div>
    </Draggable>
  );
}

function mapStateToProps(state) {
  const { stateResize } = state.progressPlan;
  return { stateResize };
}
export default connect(mapStateToProps)(Events);
