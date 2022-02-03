import React, { useState, useRef } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import uuid from "uuid/v4";
import "./progressPlan.scss";

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
            content: "event",
            color: "bg-primary text-white",
            day: 5,
            index: 0,
        },
    ];

    let columnsDays = {};
    for (let i = 0; i < totalDays; i++) {
        columnsDays = {
            ...columnsDays,
            [uuid()]: {
                day: i + 1,
                items: itemsFromBackend.filter(item => item.day === i + 1),
            },
        };
    }

    const max = Math.max.apply(Math, itemsFromBackend.map(function (o) { return o.index; }));

    const [columns, setColumns] = useState(columnsDays);

    const minimum_size = 20;
    let original_width = 0;
    let original_height = 0;
    let original_x = 0;
    let original_y = 0;
    let original_mouse_x = 0;
    let original_mouse_y = 0;

    const onMouseDown = (e) => {
        let data = e.target.getBoundingClientRect()

        original_width = data.width;
        original_height = data.height;
        original_x = data.left;
        original_y = data.top;
        original_mouse_x = e.pageX;
        original_mouse_y = e.pageY
        console.log(original_width);
        console.log(original_height);
        console.log(original_x);
        console.log(original_y);
        console.log(original_mouse_x);
        console.log(original_mouse_y);
    }
    const onMouseMove = (e) => {
        let element = document.querySelector(".month")

        if (e.target.classList.contains('right')) {
            const width = original_width + (e.pageX - original_mouse_x);

            if (width > minimum_size) {
                element.style.width = width + 'px'
            }
        }
        else if (e.target.classList.contains('left')) {
            const width = original_width - (e.pageX - original_mouse_x)
            if (width > minimum_size) {
                element.style.width = width + 'px'
                element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
            }
        }
        else if (e.target.classList.contains('top')) {

            const height = original_height - (e.pageY - original_mouse_y)
            if (height > minimum_size) {
                element.style.height = height + 'px'
                element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
            }
        }

        else if (e.target.classList.contains('bottom')) {
            const height = original_height + (e.pageY - original_mouse_y)
            if (height > minimum_size) {
                element.style.height = height + 'px'
            }

        }
    }
    const onMouseUp = (e) => {

    }

    return (
        <>
            {[...Array(max + 1)].map((elementInArray, i) => (
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
                                            {(provided, snapshot) => (
                                                <div
                                                    className="border month"
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                    style={{
                                                        background: snapshot.isDraggingOver
                                                            ? "lightblue"
                                                            : "",
                                                        padding: 4,
                                                        minWidth: 50,
                                                        minHeight: 30,
                                                        position: "relative"
                                                    }}

                                                >
                                                    {column.items.map((item, index) => (
                                                        <div className="drag-box"
                                                            key={item.id}
                                                            style={{
                                                                padding: "0 8px",
                                                                backgroundColor: "black",
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
                                                                            className={`event ${item.color}`}
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            style={{
                                                                                backgroundColor: snapshot.isDragging
                                                                                    ? "#263B4A"
                                                                                    : "",
                                                                                color: "white",
                                                                                ...provided.draggableProps.style,
                                                                            }}
                                                                        >
                                                                            <span className="first"
                                                                                onMouseDown={onMouseDown}
                                                                                onMouseMove={onMouseMove}
                                                                                onMouseUp={onMouseUp}
                                                                            >1</span>
                                                                            <span className="second"
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
                                                                                }}>2</span>
                                                                            <span className="event-name">
                                                                                {item.content}
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                </Draggable>
                                                            ) : null}
                                                        </div>
                                                    ))}
                                                    {provided.placeholder}
                                                </div>
                                            )}
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

export default ProgressPlan;
