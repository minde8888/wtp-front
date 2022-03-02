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
