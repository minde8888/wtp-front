import React, { useCallback, useState, useEffect, useRef } from "react";
import uuid from "uuid/v4";
import "./progressPlan.scss";
import { connect } from "react-redux";
import { resize } from "../../redux/actions/progressPlan";
import AddProgressPlan from "./addProgressPlan/addProgressPlan";
import { getAllProgressPlans } from "../../redux/actions/progressPlan";
import Events from "./events";
import { dayDateInColons } from "./date/date";


function ProgressPlan(props) {

  let now = new Date();
  const daysInMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  ).getDate();

  useEffect(() => {
    props.dispatch(getAllProgressPlans());
  }, []);

  // var date = moment()
  //     .utcOffset('+05:30')
  //     .format('YYYY-MM-DD hh:mm:ss a');



  // console.log(props);
  // let columnsDays = {};
  // for (let i = 0; i < daysInMonth; i++) {
  //   columnsDays = {
  //     ...columnsDays,
  //     [i]: {
  //       items: itemsFromBackend.filter((item) => item.start === i + 1),
  //     },
  //   };
  // }
  // console.log(columnsDays);
  // const [columns, setColumns] = useState(columnsDays);

  /****************************************Resize start******************************************/
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

  // const { stateResize } = props;
  // props.dispatch(resize(true))
  /*
  1. rendering component
  2. useEffect callback
  3. change of props / state
  4. useEffect cleanup
  5. rendering component
  6. useEffect callback
  7. useEffect cleanup
  8. component unmount
  */

  // useEffect(() => {
  //   if (stateResize) {
  //     document.addEventListener("mousemove", onMouseMove);
  //     document.addEventListener("mouseup", onMouseUpResize);
  //   } else {
  //     document.removeEventListener("mousemove", onMouseMove);
  //     document.removeEventListener("mouseup", onMouseUpResize);
  //   }

  //   return () => {
  //     document.removeEventListener("mousemove", onMouseMove);
  //     document.removeEventListener("mouseup", onMouseUpResize);
  //   };
  // }, [stateResize]);

  // const onMouseMove = useCallback(
  //   (e) => {
  //     if (stateResize) {
  //       if (rightResize === "right" && element !== undefined) {
  //         const width = original_width + (e.pageX - original_mouse_x);
  //         if (width > minimum_size) {
  //           element.style.width = width + "px";
  //           // console.log(Math.round(width/minimum_size));
  //           // console.log(columns);
  //           // console.log(element.id);
  //           // console.log(itemsFromBackend);
  //         }
  //       } else if (leftResize === "left" && element !== undefined) {
  //         const width = original_width - (e.pageX - original_mouse_x);
  //         if (width > minimum_size) {
  //           element.style.width = width + "px";
  //           element.style.left = 4 + (e.pageX - original_mouse_x) + "px";
  //         }
  //       }
  //     }
  //   },
  //   [
  //     stateResize,
  //     element,
  //     original_mouse_x,
  //     leftResize,
  //     minimum_size,
  //     original_width,
  //     rightResize,
  //   ]
  // );

  // const onMouseUpResize = useCallback((e) => {
  //   props.dispatch(resize(false));
  //   document.removeEventListener("mousemove", onMouseMove);
  //   document.removeEventListener("mouseup", onMouseUpResize);
  // });

  /******************************Resize end***************************************/

  /**********************Draggable start*******************************/
  const containerRef = useRef([]);
  var eventRef = useRef([]);

  const onDragEnd = (result, columns, setColumns, index) => {
    // console.log(daysInMonth * 42);
    // console.log(eventRef.current[index].getBoundingClientRect());
    if (!result.destination) return;
    const { source, destination } = result;
    // console.log(source, destination);
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  /****************find the amount of rows*****************/

  let max
  if (props.isLoaded) {
    max = Math.max.apply(
      Math,
      props.progress.map(function (o) {
        return o.index;
      })
    );
  }
  console.log(props.progress);
  /****************find the amount of rows*****************/

  /**********************Draggable end*******************************/

  const daysInPrevMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 0,
    0
  ).getDate();

  const daysInNextMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 2,
    0
  ).getDate();

  const getDayCoordinates = (index, daysInMonth) => {
    let dayIndex = index % daysInMonth;
    let rowIndex = Math.floor(index / daysInMonth);
    return {
      dayIndex,
      rowIndex,
    };
  };

  let maxRowIndex = [2, 3];
  // let maxRowIndex = itemsFromBackend.map((item) => {
  //   return item.index;
  // });

  var style = {
    display: "grid",
    justifyContent: "center",
    alignContent: "center",
    gridTemplateColumns: `repeat( ${(
      daysInMonth +
      daysInPrevMonth +
      daysInNextMonth +
      2
    ).toString()}, 30px)`,
  };

  var gridContainer = {
    display: "grid",
    gridColumn: 1,
    gridGap: "6px",
  };

  return (
    <>
      <AddProgressPlan />
      <div style={gridContainer}>
        <div style={style}>
          {[...Array((Math.max(...maxRowIndex) + 1) *
            (daysInPrevMonth + daysInMonth + daysInNextMonth + 2)
          ),].map((_, index) => {
            let { dayIndex, rowIndex } = getDayCoordinates(
              index,
              daysInPrevMonth +
              daysInMonth +
              daysInNextMonth + 2
            );
            return (
              <div key={uuid()}>
                {daysInPrevMonth === dayIndex ||
                  daysInPrevMonth + daysInMonth === dayIndex - 1 ? (
                  <div className="cell" index={rowIndex}></div>
                ) : (
                  <div className="cell" date={dayDateInColons(dayIndex)} index={rowIndex}>
                    {
                      (props.progress !== null &&
                        props.progress.some(value => rowIndex.toString() === value.index) &&
                        props.progress.some(value => dayDateInColons(dayIndex).toString() === value.start)) &&
                      // console.log(dayIndex)
                      console.log(rowIndex)
                    }
                    {dayIndex + 1}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

function mapStateToProps(state) {
  const { stateResize, progress } = state.progressPlan;
  return {
    stateResize,
    progress,
  };
}

export default connect(mapStateToProps)(ProgressPlan);