import React from "react";
import { connect } from "react-redux";

function Events(props) {
  console.log(props);
  let now = new Date();
  const daysInMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
  ).getDate();

  const getDayCoordinates = (index, daysInMonth) => {
    console.log(index, daysInMonth);
    let dayIndex = index % daysInMonth;
    let rowIndex = Math.floor(index / daysInMonth);
    return {
      dayIndex,
      rowIndex,
    };
  };

  let maxRowIndex = props.events.map((item) =>{
    return item.index;
  })
console.log();
  return (
    <>
      {new Array(6 * daysInMonth).map((_, index) => {
        const { dayIndex, rowIndex } = getDayCoordinates(index, daysInMonth);
        if (props[rowIndex].start === dayIndex) {
          return <div>{console.log("a")} 1111</div>;
        }
      })}
    </>
  );
}

function mapStateToProps(state) {
  const { onResize } = state.progressPlan;
  return {
    onResize,
  };
}

export default connect(mapStateToProps)(Events);
