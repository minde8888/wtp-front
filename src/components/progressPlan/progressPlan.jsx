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
  let dateNow = new Date();

  const containerRef = useRef([]);
  const { progress } = props;
  useEffect(() => {
    props.dispatch(getAllProgressPlans());
  }, []);

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
  if (progress === null) {
    return null;
  }
  const max = Math.max(
    progress.map((e) => {
      return e.index;
    })
  );

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

  let currentMonth = new Date().getMonth();
  let prevMonth = new Date().getMonth() - 1;

  for (let i = 0; i < progress.length; i++) {
    if (currentMonth === new Date(progress[i].start).getMonth()) {
      if (Number(progress[i].index) === i) {
        let positionEvent =
          (daysInPrevMonth + daysInMonth + daysInNextMonth + 2) * i +
          new Date(progress[i].start).getDate();
        totalDays[positionEvent + daysInPrevMonth] = progress[i];
      } else {
        let index = new Date(progress[i].start).getDate() + daysInPrevMonth;
        totalDays[index] = progress[i];
      }
    }

    // if (prevMonth === new Date(progress[i].start).getMonth()) {
    //   if (Number(progress[i].index) > 0) {
    //     let positionEvent =
    //       (daysInPrevMonth + daysInMonth + daysInNextMonth + 2) * i +
    //       new Date(progress[i].start).getDate();
    //     totalDays[positionEvent - 1] = progress[progress[i].index];
    //     console.log(positionEvent);
    //   } else {
    //     let index = new Date(progress[i].start).getDate() + daysInPrevMonth + daysInMonth + 1;
    //     totalDays[index] = progress[i];
    //   }
    // }
  }

  console.log(totalDays);
  dateNow.setHours(0, 0, 0);

  return (
    <>
      <AddProgressPlan />
      <div className="month">
        <div>{months[dateNow.getMonth() - 1]}</div>
        <div>{months[dateNow.getMonth()]}</div>
        <div>{months[dateNow.getMonth() + 1]}</div>
      </div>
      <div ref={containerRef} style={gridContainer}>
        {Array.isArray(props.progress) && props.progress.length !== 0 && (
          <div style={style}>
            {totalDays.map((events, index) => {
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
                  dateNow={dateNow}
                  dispatch={props.dispatch}
                  containerRef={containerRef}
                  events={events}
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
  if (!containerRef.current) {
    return null;
  }
  return (
    <div className="cell" date={dayDateInColons(dayIndex)} index={index}>
      <RenderTopMonthDays
        rowIndex={rowIndex}
        daysInPrevMonth={daysInPrevMonth}
        dayIndex={dayIndex}
        dateNow={dateNow}
      />
      {progress !== null && events && (
        // progress[rowIndex].start === dayDateInColons(dayIndex).toString() &&
        // progress[rowIndex].index === rowIndex.toString() &&
        <Events event={events} container={containerRef} />
        // <>{console.log(events)}</>
      )}
    </div>
  );
}

function RenderTopMonthDays({ rowIndex, daysInPrevMonth, dayIndex, dateNow }) {
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
        className={`days ${dayDateInColons(dayIndex).toString() === dateNow.toString() && "today"
          }`}
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
  const { progress } = state.progressPlan;
  return {
    progress,
  };
}

export default connect(mapStateToProps)(ProgressPlan);
