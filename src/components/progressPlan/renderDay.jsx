import React, { useEffect, useState, useCallback, useRef } from "react";
import { connect } from "react-redux";
import Draggable from "react-draggable";
import { resize } from "../../redux/actions/progressPlan";
// import { getAllProgressPlans } from "../../redux/actions/progressPlan";
import {
  dayDateInColons,
  getDatesBetweenDates,
  months,
  daysInPrevMonth,
  daysInNextMonth,
  daysInMonth
} from "./date/date";

const getDayCoordinates = (index, daysInMonth) => {
  let dayIndex = index % daysInMonth;
  let rowIndex = Math.floor(index / daysInMonth);
  return {
    dayIndex,
    rowIndex,
  };
};

const exists = (value, index, progress) =>
  progress.some((obj) => {
    return obj.index === index && Date.parse(obj.start) === Date.parse(value);
  });

function RenderDay(props) {

  const {
    dispatch,
    index,
    daysInPrevMonth,
    daysInMonth,
    daysInNextMonth,
    dateNow,
    progress,
    container,
    stateResize,
  } = props

  var eventRef = useRef([]);


  let { dayIndex, rowIndex } = getDayCoordinates(
    index,
    daysInPrevMonth + daysInMonth + daysInNextMonth + 2
  );


  /*-------------Resize Start-----------------*/
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
    elemenetResize: null
  });

  const onMouseDown = (e) => {

    setState({
      ...state,
      elemenetResize: eventRef.current,
      original_width: e.target.offsetParent.offsetWidth - 1,
      original_mouse_x: e.pageX,
      element: e.target.offsetParent,
      rightResize: e.target.classList.value,
      leftResize: e.target.classList.value,
    });
    dispatch(resize(true));
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
    elemenetResize
  } = state;

  useEffect(() => {
    setState({ ...state, containerSizeValues: container.current })
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
  }, [stateResize, container.current]);

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
      container
    ]
  );

  const onMouseUpResize = useCallback((e) => {
    console.log(e);
    dispatch(resize(false));
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUpResize);
  });

  /*----------Resize End --------------------*/

  /*------------Draggable start--------------*/

  const onDragEnd = (e) => {
    // console.log(e);
  };

  const handleStart = (e) => {
    var element = e.target.getBoundingClientRect();
    var containerSizeValues = props.container.current.getBoundingClientRect();
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", onMouseUpDraggable);
    setState({
      top: containerSizeValues.top - element.top,
      bottom: containerSizeValues.bottom - element.bottom,
    });
  };

  const handleDrag = (e) => {
    console.log(window.screen.width);
  };

  const onMouseUpDraggable = (e) => {
    // console.log(state);
    dispatch(resize(false));
    // console.log(e.target.parentElement);
    document.removeEventListener("mousemove", handleDrag);
    document.removeEventListener("mouseup", onMouseUpDraggable);
  };

  /*------------Draggable End----------------*/

  console.log(progress);
  // const { color, start, end, progressPlanId } = progress;

  // let rgb =
  //   JSON.parse(color).r + "," + JSON.parse(color).g + "," + JSON.parse(color).b;

  // var colorBackground = { background: `rgba(${rgb})` };

  // const elements = [];
  // for (
  //   let i = 0;
  //   i < getDatesBetweenDates(new Date(start), new Date(end)).length;
  //   i++
  // ) {
  //   elements.push(
  //     <div key={i} className={"range"} ></div>
  //   );
  // }



  if (
    daysInPrevMonth === dayIndex ||
    daysInPrevMonth + daysInMonth === dayIndex - 1
  ) {
    return <div className="cell empty" index={rowIndex}></div>;
  }
  if (!container.current) {
    return null;
  }

  return (
    <div className={"cell"} date={dayDateInColons(dayIndex)} index={rowIndex}>
      <RenderTopMonthDays
        rowIndex={rowIndex}
        daysInPrevMonth={daysInPrevMonth}
        dayIndex={dayIndex}
        dateNow={dateNow}
      />
      {progress !== null &&
        exists(
          dayDateInColons(dayIndex).toString(),
          rowIndex.toString(),
          progress
        ) && (
          <Draggable
            bounds={{
              // top: top,
              // bottom: bottom,
            }}
            cancel="span"
          // onStop={(result) => onDragEnd(result)}
          // onStart={(e) => handleStart(e)}
          >
            <div className="event"
            // style={colorBackground} id={progressPlanId} 
            // ref={(element) => {
            //   eventRef.current = element;
            // }}
            >
              <span className="left" onMouseDown={(e) => onMouseDown(e)}></span>
              {/* {elements} */}
              <span className="right" onMouseDown={(e) => onMouseDown(e)}></span>
              <span className="event-name"></span>
            </div>
          </Draggable>
        )}

    </div>
  );
}

function RenderTopMonthDays({
  rowIndex,
  daysInPrevMonth,
  dayIndex,
  dateNow }) {
  if (rowIndex === 0 && daysInPrevMonth >= dayIndex) {
    return (<div className="days">{dayIndex + 1}</div>)
  }
  if ((rowIndex === 0 &&
    daysInPrevMonth <= dayIndex &&
    dayIndex <= daysInPrevMonth + daysInMonth)) {
    return (<div
      className={`days ${dayDateInColons(dayIndex).toString() === dateNow.toString() && "today"}`}
    >
      {dayIndex - daysInPrevMonth}
    </div>
    )
  }
  if (rowIndex === 0) {
    return (
      <div className="days">
        {dayIndex - (daysInPrevMonth + daysInMonth + 1)}
      </div>)
  }
  return (null)
}


function mapStateToProps(state) {
  const { progress, stateResize } = state.progressPlan;
  return {
    progress,
    stateResize
  };
}

export default connect(mapStateToProps)(RenderDay);