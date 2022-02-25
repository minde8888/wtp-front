import React, { useCallback, useState, useEffect, useRef } from "react";
import uuid from "uuid/v4";
import "./progressPlan.scss";
import { connect } from "react-redux";
import { resize } from "../../redux/actions/progressPlan";
import Draggable from "react-draggable";
import { range } from "../../helpers/range";
import AddProgressPlan from "./addProgressPlan/addProgressPlan";
import { getAllProgressPlans } from "../../redux/actions/progressPlan";
import Events from "./events";

const itemsFromBackend = [
  {
    id: uuid(),
    content: "event1ssssss",
    color: "bg-success text-white",
    start: 1,
    end: 3,
    index: 0,
  },
  {
    id: uuid(),
    content: "event2",
    color: "bg-danger text-white",
    start: 1,
    end: 5,
    index: 1,
  },
  {
    id: uuid(),
    content: "event4",
    color: "bg-danger text-white",
    start: 3,
    end: 3,
    index: 2,
  },
  {
    id: uuid(),
    content: "event",
    color: "bg-primary text-white",
    start: 15,
    end: 25,
    index: 0,
  },
];

function ProgressPlan(props) {
  let now = new Date();
  const daysInMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  ).getDate();

  // const items = props.dispatch(getAllProgressPlans())
  // console.log(items);

  let columnsDays = {};
  for (let i = 0; i < daysInMonth; i++) {
    columnsDays = {
      ...columnsDays,
      [i]: {
        items: itemsFromBackend.filter((item) => item.start === i + 1),
      },
    };
  }
  // console.log(columnsDays);
  const [columns, setColumns] = useState(columnsDays);

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

  const { onResize } = props;

  const onMouseDown = (e, i) => {
    setState({
      ...state,
      original_width: e.target.offsetParent.offsetWidth - 1,
      original_mouse_x: e.pageX,
      element: e.target.offsetParent,
      rightResize: e.target.classList.value,
      leftResize: e.target.classList.value,
      current_container: containerRef.current[i].getBoundingClientRect(),
    });
    props.dispatch(resize(true));
  };

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

  useEffect(() => {
    if (onResize) {
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
  }, [onResize]);

  const onMouseMove = useCallback(
    (e) => {
      if (onResize) {
        if (rightResize === "right" && element !== undefined) {
          const width = original_width + (e.pageX - original_mouse_x);
          if (width > minimum_size) {
            element.style.width = width + "px";
            // console.log(Math.round(width/minimum_size));
            // console.log(columns);
            // console.log(element.id);
            // console.log(itemsFromBackend);
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
      onResize,
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
  const max = Math.max.apply(
    Math,
    itemsFromBackend.map(function (o) {
      return o.index;
    })
  );

  /****************find the amount of rows*****************/

  const handleStart = (e, i) => {
    var containerSizeValues = containerRef.current[i].getBoundingClientRect();
    var eventSizeValues = e.target.parentElement.getBoundingClientRect();

    var top = i === 0 ? 0 : -containerSizeValues.height * i;
    var bottom = max === 0 ? 0 : (max - i) * containerSizeValues.height;
    var left =
      eventSizeValues.x -
      containerSizeValues.x -
      (containerSizeValues.width - container_size) / 2;
    var right =
      containerSizeValues.right -
      eventSizeValues.right -
      (containerSizeValues.width - container_size) / 2;

    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", onMouseUpDraggable);
    setState({ top: top, bottom: bottom, left: -left, right: right });
  };
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

  /**********************Draggable end*******************************/

  // const getRowIndex = (index, daysInMonth) => 0 /*sveika dalis*/;
  // const getDayCoordinates = (index, daysInMonth) => {
  //   dayIndex = index % daysInMonth
  //   rowIndex = Math.floor(index / daysInMonth)
  //   return {
  //     dayIndex,
  //     rowIndex
  //   }
  // }

  // 4 event new Array(6 * 30).map((_, index) => {
  //  const { dayIndex, rowIndex } = getDayCoordinates(index, 30)
  //  if (eventsMaps[rowIndex].start === dayIndex) {
  //  return (<Event  />)
  //}
  // })

  // .style-30-days {
  //   grid-template-columns: repeat(30, 30px)
  // }

  // return (
  //   <>
  //     <AddProgressPlan/>
  //     <Events events={itemsFromBackend}/>
  //     {[...Array(max + 1)].map((_elementInArray, i) => (
  //       <div
  //         key={i}
  //         className="d-flex flex-row justify-content-center box-month container"
  //         ref={(element) => {
  //           containerRef.current[i] = element;
  //         }}
  //       >

  //         {Object.entries(columns).map(([columnId, column], index) => (
  //           <div className="text-center cell" key={columnId}>
  //             <div className="cell-top">
  //               <div className="border day " id={uuid()}>
  //                 {column.items.map((item, index) => (
  //                   <div className="drag-box " key={item.id} >
  //                     {i === item.index && (
  //                       <Draggable
  //                         bounds={{
  //                           top: top,
  //                           left: left,
  //                           right: right,
  //                           bottom: bottom,
  //                         }}
  //                         cancel="span"
  //                         key={item.id}

  //                         onStop={(result) =>
  //                           onDragEnd(result, columns, setColumns, i)
  //                         }
  //                         onStart={(e) => handleStart(e, i)}
  //                       >
  //                         <div className={`event ${item.color}`} id={item.id}
  //                           ref={(element) => {
  //                             eventRef.current[i] = element;
  //                           }}>
  //                           <span
  //                             className="left"
  //                             onMouseDown={(e) => onMouseDown(e, i)}
  //                           ></span>
  //                           {range(item.start, item.end).map((range, i) => (
  //                             <div
  //                               key={uuid()}
  //                               className={`range ${item.color}`}
  //                             >
  //                               {/* {range}  */}
  //                             </div>
  //                           ))}

  //                           <span
  //                             className="right"
  //                             onMouseDown={(e) => onMouseDown(e, i)}
  //                           ></span>
  //                           <span className="event-name">{item.content}</span>
  //                         </div>
  //                       </Draggable>
  //                     )}
  //                   </div>
  //                 ))}
  //               </div>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     ))}
  //   </>
  // );

  const getDayCoordinates = (index, daysInMonth) => {
    let dayIndex = index % daysInMonth;
    let rowIndex = Math.floor(index / daysInMonth);
    return {
      dayIndex,
      rowIndex,
    };
  };

  let maxRowIndex = itemsFromBackend.map((item) => {
    return item.index;
  });

  var style = {
    display: "grid",
    justifyContent: "center",
    alignContent: "center",
    gridTemplateColumns: `repeat( ${(daysInMonth).toString()}, 30px)`,
  };

  var gridContainer = {
    display: "grid",
    justifyContent: "center",
    alignContent: "center",
    gridTemplateColumns: `12px ${(daysInMonth).toString()*30}px 12px`,
    gridTemplateRows: "auto"
}

  return (
    <>
      <AddProgressPlan />
      <div style={gridContainer} >
        <div>a</div>
        <div style={style} >
          {[...Array((Math.max(...maxRowIndex) + 1) * daysInMonth)].map(
            (_, index) => {
              let { dayIndex, rowIndex } = getDayCoordinates(
                index,
                daysInMonth
              );
              return (
                <div index={rowIndex} key={index}>
                  {dayIndex + 1}
                </div>
              );
            }
          )}
        </div>  
        <div>b</div>
      </div>
    </>
  );
}

function mapStateToProps(state) {
  const { onResize } = state.progressPlan;
  return {
    onResize,
  };
}

export default connect(mapStateToProps)(ProgressPlan);
