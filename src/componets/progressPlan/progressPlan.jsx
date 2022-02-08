import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import uuid from "uuid/v4";
import "./progressPlan.scss";
import { connect } from "react-redux";
import { resize } from "../../redux/actions/progressPlan";
import { range } from "../../helpers/range";

const onDragEnd = (result, columns, setColumns) => {
  // console.log(result);
  if (!result.destination) return;
  const { source, destination } = result;

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

  const max = Math.max.apply(
    Math,
    itemsFromBackend.map(function (o) {
      return o.index;
    })
  );

  const [columns, setColumns] = useState(columnsDays);
  const [state, setState] = useState({
    minimum_size: 50,
    original_width: 0,
    original_x: 0,
    original_mouse_x: 0,
    resize: false,
  });
  const {
    minimum_size,
    original_width,
    original_x,
    original_mouse_x,
    element,
    right,
    left,
  } = state;

  const onMouseDown = (e) => {

    let data = e.target.getBoundingClientRect();
    setState({
      ...state,
      original_width: e.target.offsetParent.offsetWidth - 1,
      original_x: data.left,
      original_mouse_x: e.pageX,
      element: e.target.offsetParent,
      right: e.target.classList.value,
      left: e.target.classList.value,
    });
    props.dispatch(resize(true));
  };

  const onMouseMove = (e) => {

    if (resize) {

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

  const onMouseUp = (e) => {
    props.dispatch(resize(false));
  };

  return (
    <>
      {[...Array(max + 1)].map((_elementInArray, i) => (
        <div
          key={i}
          className="d-flex flex-row justify-content-center box-month "
          onMouseMove={onMouseMove}
        >
          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
          >
            {Object.entries(columns).map(([columnId, column], index) => (
              <div className="text-center cell" key={columnId}>
                <div className="cell-top">
                  {index + 1}
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => (
                      <div
                        className="border day "
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "",
                        }}
                      >
                        {column.items.map((item, index) => (
                          <div className="drag-box " key={item.id}>
                            {i === item.index
                              ? <Draggable
                                isDragDisabled={false}
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    className={`event   ${item.color}`}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    <span
                                      className="left"
                                      onMouseDown={onMouseDown}
                                      onMouseUp={onMouseUp}
                                    >
                                      1
                                    </span>
                                    {range(item.start, item.end).map(
                                      (range, i) => (
                                        <div key={uuid()} className={` ${item.color}`}>
                                          {range}
                                        </div>)
                                    )}

                                    <span
                                      className="right"
                                      onMouseDown={onMouseDown}
                                      onMouseUp={onMouseUp}
                                    >
                                      2
                                    </span>
                                    <span className="event-name">
                                      {item.content}
                                    </span>
                                  </div>
                                )}
                              </Draggable>

                              : null}
                          </div>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              </div>
            ))}
          </DragDropContext>
        </div>
      ))}
    </>
  );
}

function mapStateToProps(state) {
  const { resize } = state.progressPlan;

  return {
    resize,
  };
}

export default connect(mapStateToProps)(ProgressPlan);
