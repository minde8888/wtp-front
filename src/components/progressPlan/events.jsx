import React from "react";
import { connect } from "react-redux";

function Events(props) {
  console.log(props);
  let now = new Date();
  let daysInMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  ).getDate();

  return (
    <>
      <Draggable
        bounds={{
          top: top,
          left: left,
          right: right,
          bottom: bottom,
        }}
        cancel="span"
        key={item.id}

        onStop={(result) =>
          onDragEnd(result, columns, setColumns, i)
        }
        onStart={(e) => handleStart(e, i)}
      >
        <div className={`event ${item.color}`} id={item.id}
          ref={(element) => {
            eventRef.current[i] = element;
          }}>
          <span
            className="left"
            onMouseDown={(e) => onMouseDown(e, i)}
          ></span>
          {range(item.start, item.end).map((range, i) => (
            <div
              key={uuid()}
              className={`range ${item.color}`}
            >
              {/* {range}  */}
            </div>
          ))}

          <span
            className="right"
            onMouseDown={(e) => onMouseDown(e, i)}
          ></span>
          <span className="event-name">{item.content}</span>
        </div>
      </Draggable>
    </>
  )

}

function mapStateToProps(state) {
  const { onResize } = state.progressPlan;
  return {
    onResize,
  };
}

export default connect(mapStateToProps)(Events);
