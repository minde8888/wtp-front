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


}

function mapStateToProps(state) {
  const { onResize } = state.progressPlan;
  return {
    onResize,
  };
}

export default connect(mapStateToProps)(Events);
