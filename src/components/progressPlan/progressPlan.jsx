import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { connect } from "react-redux";
import AddProgressPlan from "./addProgressPlan/addProgressPlan";
import ToNextMonth from "./toNextMonth/toNextMonth";
import Events from "./events";
import RightClickMenu from "./contextMenu/RightClickMenu";
import {
  daysNextMonth,
  daysMonth,
  daysPrevMonth,
  months,
  dayDateInColons,
} from "./date/date";
import "./progressPlan.scss";

function ProgressPlan(props) {
  let { progressPlanId } = useParams();
  let dateNow = new Date();
  const containerRef = useRef([]);
  const data = props.projectData.find((p) => p.projectId === progressPlanId);
  const progress = data.progressPlan.$values;
  let { skipMonth } = props;

  let daysInMonth = daysMonth(skipMonth);
  let daysInPrevMonth = daysPrevMonth(skipMonth);
  let daysInNextMonth = daysNextMonth(skipMonth);

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
  if (progress === null) return null;

  let rowMaxNumber =
    Math.max(
      ...progress.map((e) => {
        return e.index;
      })
    ) + 1;

  const totalDays = [
    ...Array(
      rowMaxNumber * (daysInPrevMonth + daysInMonth + daysInNextMonth + 2)
    ),
  ];

  let currentMonth = new Date().getMonth() + skipMonth;
  let prevMonth = new Date().getMonth() - 1 + skipMonth;
  let nextMonth = new Date().getMonth() + 1 + skipMonth;

  for (let i = 0; i < progress.length; i++) {
    if (currentMonth === new Date(progress[i].start).getMonth()) {
      if (Number(progress[i].index) > 0) {
        let positionEvent =
          (daysInPrevMonth + daysInMonth + daysInNextMonth + 2) *
          progress[i].index +
          new Date(progress[i].start).getDate() +
          daysInPrevMonth;
        totalDays[positionEvent] = progress[i];
      } else {
        let index = new Date(progress[i].start).getDate() + daysInPrevMonth;
        totalDays[index] = progress[i];
      }
    }

    if (prevMonth === new Date(progress[i].start).getMonth()) {
      if (Number(progress[i].index) > 0) {
        let positionEvent =
          (daysInPrevMonth + daysInMonth + daysInNextMonth + 2) *
          progress[i].index +
          new Date(progress[i].start).getDate();
        totalDays[positionEvent - 1] = progress[i];
      } else {
        let index = new Date(progress[i].start).getDate() - 1;
        totalDays[index] = progress[i];
      }
    }

    if (nextMonth === new Date(progress[i].start).getMonth()) {
      if (Number(progress[i].index) > 0) {
        let positionEvent =
          (daysInPrevMonth + daysInMonth + daysInNextMonth + 2) *
          progress[i].index +
          new Date(progress[i].start).getDate() +
          daysInPrevMonth +
          daysInMonth +
          2;
        totalDays[positionEvent - 1] = progress[i];
      } else {
        let index =
          new Date(progress[i].start).getDate() +
          daysInPrevMonth +
          daysInMonth +
          1;
        totalDays[index] = progress[i];
      }
    }
  }
  const getCurrentMonth = (a = 0) => {
    dateNow.setHours(0, 0, 0);
    return Math.abs((dateNow.getMonth() + skipMonth + a) % 12);
  };

  return (
    <>
      <RightClickMenu progress={progress} />
      <AddProgressPlan progress={progress} id={progressPlanId} />
      <div className="month">
        <div>{months[getCurrentMonth(-1)]}</div>
        <div>{months[getCurrentMonth()]}</div>
        <div>{months[getCurrentMonth(1)]}</div>
      </div>
      <ToNextMonth rowMaxNumber={rowMaxNumber} />
      <div ref={containerRef} style={gridContainer} className="containerScroll">
        {Array.isArray(progress) && progress.length !== 0 && (
          <div style={style}>
            {totalDays.map((events, index) => {
              if (!containerRef.current) return null;
              return (
                <RenderDay
                  key={uuid()}
                  index={index}
                  daysInPrevMonth={daysInPrevMonth}
                  daysInMonth={daysInMonth}
                  daysInNextMonth={daysInNextMonth}
                  dateNow={dateNow}
                  containerRef={containerRef}
                  events={events}
                  id={progressPlanId}

                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

const getDayCoordinates = (index, daysInMonth) => {
  let dayIndex = index % daysInMonth;
  let rowIndex = Math.floor(index / daysInMonth);
  return {
    dayIndex,
    rowIndex,
  };
};

function RenderDay({
  index,
  daysInPrevMonth,
  daysInMonth,
  daysInNextMonth,
  dateNow,
  progress,
  containerRef,
  events,
  id
}) {
  let { dayIndex, rowIndex } = getDayCoordinates(
    index,
    daysInPrevMonth + daysInMonth + daysInNextMonth + 2
  );
  if (
    daysInPrevMonth === dayIndex ||
    daysInPrevMonth + daysInMonth === dayIndex - 1
  ) {
    return <div className="cell empty move" index={rowIndex}></div>;
  }
  if (!containerRef.current) {
    return null;
  }
  return (
    <div className="cell move" date={dayDateInColons(dayIndex)} index={index}>
      <RenderTopMonthDays
        rowIndex={rowIndex}
        daysInPrevMonth={daysInPrevMonth}
        daysInMonth={daysInMonth}
        dayIndex={dayIndex}
        dateNow={dateNow}
      />
      {progress !== null && events && (
        <Events event={events} container={containerRef} id={id} />
      )}
    </div>
  );
}

function RenderTopMonthDays({
  rowIndex,
  dayIndex,
  dateNow,
  daysInMonth,
  daysInPrevMonth,
}) {
  if (rowIndex === 0 && daysInPrevMonth >= dayIndex) {
    return <div className="days">{dayIndex + 1}</div>;
  }
  if (
    rowIndex === 0 &&
    daysInPrevMonth <= dayIndex &&
    dayIndex <= daysInPrevMonth + daysInMonth
  ) {
    return (
      <div
        className={`days ${dayDateInColons(dayIndex).toString() ===
          dateNow.toString() && "today"}`}
      >
        {dayIndex - daysInPrevMonth}
      </div>
    );
  }
  if (rowIndex === 0) {
    return (
      <div className="days">
        {dayIndex - (daysInPrevMonth + daysInMonth + 1)}
      </div>
    );
  }
  return null;
}

function mapStateToProps(state) {

  const { projectData } = state.project;
  const { skipMonth } = state.progressPlan;
  return {
    projectData,
    skipMonth,
  };
}

export default connect(mapStateToProps)(ProgressPlan);
