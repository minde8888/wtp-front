

function Events(props) {


    let now = new Date();
    const daysInMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0
    ).getDate();

    const getDayCoordinates = (index, daysInMonth) => {
        dayIndex = index % daysInMonth
        rowIndex = Math.floor(index / daysInMonth)
        return {
            dayIndex,
            rowIndex
        }
    }
    console.log(getDayCoordinates);
    new Array(6 * daysInMonth).map((_, index) => {
        const { dayIndex, rowIndex } = getDayCoordinates(index, daysInMonth)
        if (eventsMaps[rowIndex].start === dayIndex) {
            return (<Event />)
        }
    })
}