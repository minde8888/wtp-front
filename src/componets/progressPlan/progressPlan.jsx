import React, { useState, useEffect, useRef } from "react";
import uuid from "uuid/v4";
import "./progressPlan.scss";
import { connect } from "react-redux";
import { resize } from "../../redux/actions/progressPlan";
import Draggable from "react-draggable";
import { range } from "../../helpers/range";

function ProgressPlan(props) {
  let now = new Date();
  const totalDays = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  ).getDate();

  const itemsFromBackend = [
    {
      id: uuid(),
      content: "event1ssssssssssssssssssssssss",
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
  /****************************************Resize******************************************/
  const [state, setState] = useState({
    minimum_size: 42,
    original_width: 0,
    original_x: 0,
    original_mouse_x: 0,
    container_size: totalDays * 42,
    current_container: {},
    top: 0,
    right: 0,
    left: 0,
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
    container_size,
    current_container,
  } = state;

  const onMouseDown = (e, i) => {
    setState({
      ...state,
      original_width: e.target.offsetParent.offsetWidth - 1,
      original_mouse_x: e.pageX,
      element: e.target.offsetParent,
      right: e.target.classList.value,
      left: e.target.classList.value,
      current_container: containerRef.current[i].getBoundingClientRect(),
    });
    props.dispatch(resize(true));
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUpResize);
  }, [props.onResize]);

  const onMouseMove = (e) => {
    if (props.onResize) {
      if (right === "right" && element !== undefined) {
        const width = original_width + (e.pageX - original_mouse_x);
        if (width > 50) {
          element.style.width = width + "px";
        }
      } else if (left === "left" && element !== undefined) {
        const width = original_width - (e.pageX - original_mouse_x);
        if (width > minimum_size) {
          element.style.width = width + "px";
          element.style.left = 4 + (e.pageX - original_mouse_x) + "px";
        }
      }
    }
  };

  const onMouseUpResize = (e) => {
    props.dispatch(resize(false));
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUpResize);
  };

  /******************************Resize***************************************/
  let columnsDays = {};
  for (let i = 0; i < totalDays; i++) {
    columnsDays = {
      ...columnsDays,
      [uuid()]: {
        start: i + 1,
        end: i + 1,
        items: itemsFromBackend.filter((item) => item.start === i + 1),
      },
    };
  }

  /**********************Draggable*******************************/
  const containerRef = useRef([]);

  const onDragEnd = (result, columns, setColumns, index) => {
    console.log(totalDays * 42);
    console.log(containerRef.current[index].getBoundingClientRect());
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
  const [columns, setColumns] = useState(columnsDays);

  const handleStart = (e, i) => {
    var draggable = e.target.getBoundingClientRect();
    console.log(draggable);
    var containerSize = containerRef.current[i].getBoundingClientRect();
    containerRef.current[i].getBoundingClientRect();
    var top = i === 0 ? 0 : -containerSize.height * i;
    var bottom = max === 0 ? 0 : (max - i) * containerSize.height;
    setState({ top: top, bottom: bottom });
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", onMouseUpDraggable);
  };
  const handleDrag = (e) => {
    console.log("drag" + e);
  };
  const onMouseUpDraggable = (e) => {
    // props.dispatch(resize(false));
    // console.log(e.target.parentElement);
    document.removeEventListener("mousemove", handleDrag);
    document.removeEventListener("mouseup", onMouseUpDraggable);
  };

  // console.log(props.resize);
  return (
    <>
      {[...Array(max + 1)].map((_elementInArray, i) => (
        <div
          key={i}
          className="d-flex flex-row justify-content-center box-month container"
          ref={(element) => {
            containerRef.current[i] = element;
          }}
        >
          {Object.entries(columns).map(([columnId, column], index) => (
            <div className="text-center cell" key={columnId}>
              <div className="cell-top">
                <div className="border day " id={uuid()}>
                  {column.items.map((item, index) => (
                    <div className="drag-box " key={item.id}>
                      {i === item.index ? (
                        <Draggable
                          bounds={{
                            top: top,
                            left: -100,
                            right: 100,
                            bottom: bottom,
                          }}
                          cancel="span"
                          key={item.id}
                          onMouseDown={(e) => handleStart(e, i)}
                          onStop={(result) =>
                            onDragEnd(result, columns, setColumns, i)
                          }
                        >
                          <div className={`event ${item.color}`} id={item.id}>
                            {console.log(bottom)}
                            <span
                              className="left"
                              onMouseDown={(e) => onMouseDown(e, i)}
                            ></span>
                            {range(item.start, item.end).map((range, i) => (
                              <div
                                key={uuid()}
                                className={`range ${item.color}`}
                              >
                                {/* {range} */}
                              </div>
                            ))}

                            <span
                              className="right"
                              onMouseDown={(e) => onMouseDown(e, i)}
                            ></span>
                            <span className="event-name">{item.content}</span>
                          </div>
                        </Draggable>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
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
