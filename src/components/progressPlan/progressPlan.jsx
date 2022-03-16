import React, { useEffect, useRef } from "react";
import uuid from "uuid/v4";
import "./progressPlan.scss";
import { connect } from "react-redux";
import AddProgressPlan from "./addProgressPlan/addProgressPlan";
import { getAllProgressPlans } from "../../redux/actions/progressPlan";
import Events from "./events";
import { dayDateInColons } from "./date/date";
import { months } from "./date/date";
import { daysInPrevMonth } from "./date/date";
import { daysInNextMonth } from "./date/date";
import { daysInMonth } from "./date/date";

function ProgressPlan(props) {
  let now = new Date();

  useEffect(() => {
    props.dispatch(getAllProgressPlans());
  }, []);

  const containerRef = useRef([]);

  var style = {
    display: "grid",
    gridTemplateColumns: `repeat( ${(
      daysInMonth +
      daysInPrevMonth +
      daysInNextMonth +
      2
    ).toString()}, 30px)`,
  };

  var gridContainer = {
    display: "grid",
    justifyContent: "center",
  };
  if (props.progress === null) {
    return null;
  }
  const totalDays = [
    ...Array(
      (props.progress.length) *
        (daysInPrevMonth + daysInMonth + daysInNextMonth + 2)
    ),
  ];

  var count = 0;
  now.setHours(0, 0, 0);

  return (
    <>
      <AddProgressPlan />
      <div className="month">
        <div>{months[now.getMonth() - 1]}</div>
        <div>{months[now.getMonth()]}</div>
        <div>{months[now.getMonth() + 1]}</div>
      </div>
      <div style={gridContainer} ref={containerRef}>
        {Array.isArray(props.progress) && props.progress.length !== 0 && (
          <div style={style}>
            {totalDays.map((_, index) => {
              if (!containerRef.current) {
                return null;
              }
              return (
                <RenderDay
                  key={uuid()}
                  index={index}
                  daysInPrevMonth={daysInPrevMonth}
                  daysInMonth={daysInMonth}
                  daysInNextMonth={daysInNextMonth}
                  count={count}
                  now={now}
                  progress={props.progress}
                  dispatch={props.dispatch}
                  containerRef={containerRef}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

const getRowMax = (obj) => {
  return Math.max.apply(
    Math,
    obj.map((o) => {
      return o.index;
    })
  );
};

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

function RenderDay({
  dispatch,
  index,
  daysInPrevMonth,
  daysInMonth,
  daysInNextMonth,
  count,
  now,
  progress,
  containerRef,
}) {
  let { dayIndex, rowIndex } = getDayCoordinates(
    index,
    daysInPrevMonth + daysInMonth + daysInNextMonth + 2
  );
  if (
    daysInPrevMonth === dayIndex ||
    daysInPrevMonth + daysInMonth === dayIndex - 1
  ) {
    return <div className="cell empty" index={rowIndex}></div>;
  }
  return (
    <div className={"cell"} date={dayDateInColons(dayIndex)} index={rowIndex}>
      {rowIndex === 0 && daysInPrevMonth >= dayIndex ? (
        <div className="days">{dayIndex + 1}</div>
      ) : rowIndex === 0 &&
        daysInPrevMonth <= dayIndex &&
        dayIndex <= daysInPrevMonth + daysInMonth ? (
        <div
          className={`days ${
            dayDateInColons(dayIndex).toString() === now.toString() && "today"
          }`}
        >
          {dayIndex - daysInPrevMonth}
        </div>
      ) : (
        rowIndex === 0 && (
          <div className="days">
            {dayIndex - (daysInPrevMonth + daysInMonth + 1)}         
          </div>
        )
      )}
      {progress !== null &&
        exists(
          dayDateInColons(dayIndex).toString(),
          rowIndex.toString(),
          progress
        ) && (
          <Events
          
            data={progress[(() => { console.log(rowIndex-1); return rowIndex })()]}
            dispatch={dispatch}
            container={containerRef}
          />
        )}
        
    </div>
  );
}

function mapStateToProps(state) {
  const { progress } = state.progressPlan;
  return {
    progress,
  };
}

export default connect(mapStateToProps)(ProgressPlan);
