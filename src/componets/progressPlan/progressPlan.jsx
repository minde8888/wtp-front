// import React, { Component } from "react";
// import { connect } from "react-redux";
// import Draggable from "react-draggable";
// import Moment from "react-moment";
// import moment from "moment";
// import "moment-timezone";
// import { addDays, addMonth, eachDayOfInterval, formatRelative } from "date-fns";
// import { nb } from "date-fns/locale";
// import "./progressPlan.scss";

// class ProgressPlan extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       days: "",
//     };
//     console.log(
//       formatRelative(addDays(new Date(), 0), new Date(), { locale: nb })
//     );
//   }
//   render = () => {
//     const start = Date.now();
//     // var date = moment().toDate()
//     const dateToFormat = new Date();
//     // const start = moment().add(-23, "m");
//     const calendarStrings = {
//       lastDay: "[Yesterday at] LT",
//       sameDay: "[Today at] LT",
//       nextDay: "[Tomorrow at] LT",
//       lastWeek: "[last] dddd [at] LT",
//       nextWeek: "dddd [at] LT",
//       sameElse: "L",
//     };
//     let now = new Date();
//     const daysName = ["Mon", "Tue", "Wen", "Thu", "Fri", "Sat", "Sun"];

//     var months = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ];
//     var monthName = months[now.getMonth()];
//     console.log(monthName);

//     const totalDays = new Date(
//       now.getFullYear(),
//       now.getMonth() + 1,
//       0
//     ).getDate();
//     const today = now.getDate();

//     let days = [totalDays];
//     var loopData = "";
//     for (let i = 0; i < totalDays; i++) {
//       loopData += `<div>${i + 1}</div>`;
//     }
//     // this.setState({days: loopData})
    
//     var startDate = moment('02-01-2020', 'DD-MM-YYYY');
//     var endDate = moment('02-05-2021', 'DD-MM-YYYY');
   
//     var dayDiff = endDate.diff(startDate, 'days');
//     console.log('Days:' + dayDiff);
  
//     var monthDiff = endDate.diff(startDate, 'months');
//     console.log('Month:' + monthDiff);
  
//     var yearDiff = endDate.diff(startDate, 'years');
//     console.log('Year:' + yearDiff);
    

//     return (
//       <div>
//         <div dangerouslySetInnerHTML={{ __html: loopData }}></div>
//       </div>
//     );
//   };
// }

// function mapStateToProps(state) {
//   return {};
// }

// export default connect(mapStateToProps)(ProgressPlan);
