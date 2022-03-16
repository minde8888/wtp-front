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

  const positionRowIndex = (date, index) => {    
   // Date.parse(props.progress[index].start) === dayDateInColons(dayIndex)
    if (Date.parse(props.progress[index].start) === Date.parse(date)) {
      return true
    }
  }


  var count = 0;
  now.setHours(0, 0, 0);
  console.log(props.progress);
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
            {[
              ...Array(
                (getRowMax(props.progress) + 1) *
                (daysInPrevMonth + daysInMonth + daysInNextMonth + 2)
              ),
            ].map((_, index) => {
              let { dayIndex, rowIndex } = getDayCoordinates(
                index,
                daysInPrevMonth + daysInMonth + daysInNextMonth + 2
              );
              return (
                <div key={uuid()}>
                  {daysInPrevMonth === dayIndex ||
                    daysInPrevMonth + daysInMonth === dayIndex - 1 ? (
                    <div className="cell empty" index={rowIndex}></div>
                  ) : (
                    <>
                      <div
                        className={"cell"}
                        date={dayDateInColons(dayIndex)}
                        index={rowIndex}
                      >
                        {rowIndex === 0 && daysInPrevMonth >= dayIndex ? (
                          <div className="days">{dayIndex + 1}</div>
                        ) : rowIndex === 0 &&
                          daysInPrevMonth <= dayIndex &&
                          dayIndex <= daysInPrevMonth + daysInMonth ? (
                          <div
                            className={`days ${dayDateInColons(dayIndex).toString() ===
                              now.toString() && "today"
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
                        {props.progress !== null &&
                          positionRowIndex(
                            dayDateInColons(dayIndex).toString(),
                            rowIndex.toString()
                          ) && (
                            <Events
                              data={props.progress[count++]}
                              dispatch={props.dispatch}
                              container={containerRef}
                            />
                          )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

function mapStateToProps(state) {
  const { progress } = state.progressPlan;
  return {
    progress,
  };
}

export default connect(mapStateToProps)(ProgressPlan);
