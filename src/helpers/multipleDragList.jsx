import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import uuid from "uuid/v4";

const onDragEnd = (result, columns, setColumns) => {
  console.log(result);
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

function MultipleDragList(props) {
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
      day: 1,
      index: 0,
    },
    {
      id: uuid(),
      content: "event2",
      color: "bg-danger text-white",
      day: 1,
      index: 1,
    },
    {
      id: uuid(),
      content: "event4",
      color: "bg-danger text-white",
      day: 3,
      index: 2,
    },
    {
      id: uuid(),
      content: "event3",
      color: "bg-primary text-white",
      day: 5,
      index: 0,
    },
  ];

  let columnsDays = {};
 // visus kurie true supushina i 1 objekta
  for (let i = 0; i < totalDays; i++) {
    if (itemsFromBackend.some(item => item.day === i+1)) {
      columnsDays = {
        ...columnsDays,
        [uuid()]: {
          day: i + 1,
          items: itemsFromBackend,
        },
      };
    } else {
      columnsDays = {
        ...columnsDays,
        [uuid()]: {
          day: i + 1,
          items: [],
        },
      };
    }
  }

  console.log(columnsDays);
  const [columns, setColumns] = useState(columnsDays);
  return (
    <>
      {[...Array(3)].map((elementInArray, i) => (
        <div key={i} className="d-flex flex-row justify-content-center">
          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
          >
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <div className="text-center" key={columnId}>
                  <div style={{ margin: 0 }}>
                    {column.day}
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            className="border"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                              background: snapshot.isDraggingOver
                                ? "lightblue"
                                : "",
                              padding: 4,
                              minWidth: 50,
                              minHeight: 30,
                            }}
                          >
                            {column.items.map((item, index) => {
                              return (
                                <div
                                  key={item.id}
                                  style={{
                                    padding: "0 1rem",
                                    backgroundColor: "brown",
                                  }}
                                  onMouseDown={
                                    (e) =>
                                      console.log(
                                        "pagriebem desra",
                                        e.target.getBoundingClientRect()
                                      )
                                    /*
                                    kažkur išsaugoti kurią dešrą pagriebėm (this.setState)
                                    iškarto keičiam dešros dydį (per inline style su position absolute)

                                   */
                                  }
                                  onMouseMove={(e) => {
                                    console.log("judinam desra");
                                  }}
                                  onMouseUp={() => {
                                    console.log("paleidom desra");
                                    /*
                                      kažkur pažymim kurią dešrą paleidom (this.setState)
                                      suskaičiuojam pagal pixelius kiek padidinom dešrą
                                    */
                                  }}
                                >
                                  {i === item.index ? (
                                    <Draggable
                                      key={item.id}
                                      draggableId={item.id}
                                      index={index}
                                    >
                                      {(provided, snapshot) => (
                                        <div
                                          className={item.color}
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          style={{
                                            userSelect: "none",
                                            margin: "0 0 1px 0",
                                            backgroundColor: snapshot.isDragging
                                              ? "#263B4A"
                                              : "",
                                            color: "white",
                                            ...provided.draggableProps.style,
                                            position: "relative",
                                            height: "30px",
                                            width: "50px",
                                          }}
                                        >
                                          <span
                                            style={{ position: "absolute" }}
                                          >
                                            {item.content}
                                          </span>
                                        </div>
                                      )}
                                    </Draggable>
                                  ) : null}
                                </div>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                </div>
              );
            })}
          </DragDropContext>
        </div>
      ))}
    </>
  );
}

export default MultipleDragList;
