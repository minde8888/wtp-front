import React from "react";
import { connect } from "react-redux";

function Events(props) {
  console.log(props);
  let now = new Date();
  let daysInMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
  ).getDate();

  const getDayCoordinates = (index, daysInMonth) => {
    let dayIndex = index % daysInMonth;
    let rowIndex = Math.floor(index / daysInMonth);
    return {
      dayIndex,
      rowIndex,
    };
  };

  let maxRowIndex = props.events.map((item) => {
    return item.index;
  })

  var style = {
    display: 'grid',
    gridTemplateColumns: `repeat( ${daysInMonth.toString()}, 30px)`
  }

  // var a = 

  return (
    <>
      <div style={style}>
        {[...Array((Math.max(...maxRowIndex) + 1) * daysInMonth)].map((_, index) => {
          let { dayIndex, rowIndex } = getDayCoordinates(index, daysInMonth);
          return (<div index={rowIndex} key={index}>{dayIndex + 1}   </div>)
        })}
      </div>

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
