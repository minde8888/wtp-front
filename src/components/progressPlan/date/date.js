export const THIS_YEAR = +(new Date().getFullYear());

export const THIS_MONTH = +(new Date().getMonth()) + 1;

export const weekDays = {
    Sun: "Sunday",
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
    Sat: "Saturday"
}

export const  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const dayDateInColons = (day) => {
    let d = day
    const date = new Date()
    if (d <= daysInPrevMonth) {
        d = -daysInPrevMonth + d + 1
        date.setHours(0,0,0)
        date.setDate(d)
        date.setHours(0, 0, 0, 0);
    } else if (daysInPrevMonth < d && d <= (daysInPrevMonth + daysInMonth)) {
        d = d - daysInPrevMonth
        date.setHours(0,0,0)
        date.setDate(d)
        date.setHours(0, 0, 0, 0);
    } else if (daysInMonth <= d) {
        d = (d + 2) - (daysInMonth)
        date.setHours(0,0,0)
        date.setDate(d)
        date.setHours(0, 0, 0, 0);
    }
    return date
}

let now = new Date();

export const daysInPrevMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 0,
    0
).getDate();

export const daysInMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
).getDate();

export const daysInNextMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 2,
    0
  ).getDate();

export const getDatesBetweenDates = (startDate, endDate) => {
    let dates = []
    const theDate = new Date(startDate)
    while (theDate < endDate) {
      dates = [...dates, new Date(theDate)]
      theDate.setDate(theDate.getDate() + 1)
    }
    dates = [...dates, endDate]
    return dates
  }