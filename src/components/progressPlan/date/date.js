export const THIS_YEAR = +(new Date().getFullYear());

export const THIS_MONTH = +(new Date().getMonth()) + 1;

export const WEEK_DAYS = {
    Sunday: "Sun",
    Monday: "Mon",
    Tuesday: "Tue",
    Wednesday: "Wed",
    Thursday: "Thu",
    Friday: "Fri",
    Saturday: "Sat"
}

export const CALENDAR_MONTHS = {
    January: "Jan",
    February: "Feb",
    March: "Mar",
    April: "Apr",
    May: "May",
    June: "Jun",
    July: "Jul",
    August: "Aug",
    September: "Sep",
    October: "Oct",
    November: "Nov",
    December: "Dec"
}

export const dayDate = (day) => {
    const date = new Date()
    date.setDate(day)
    return date
}

export const monthDate = (month) => {
    const date = new Date()
    date.setMonth(month)
    return date
}

export const yearDate = (y) => {
    const date = new Date()
    date.setFullYear(y)
    return date
}

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

const daysInPrevMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 0,
    0
).getDate();

const daysInMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
).getDate();

const daysInNextMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 2,
    0
).getDate();