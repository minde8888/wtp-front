import React, { useEffect, useState, useCallback } from "react";
import { getDatesBetweenDates, daysInMonth } from "./date/date";

function ResizeEvents({ event, container }) {
    const { color, start, end, progressPlanId } = event;

    const [state, setState] = useState({
        minimum_size: 29,
        original_width: 0,
        original_x: 0,
        original_mouse_x: 0,
        container_size: daysInMonth * 30,
        current_container: {},
        element: null,
        rightResize: 0,
        leftResize: 0,
        containerSizeValues: null,
        elementResize: null,
        leftWidth: 0,
        isResizing: false,
    });

    let rgb =
        JSON.parse(color).r + "," + JSON.parse(color).g + "," + JSON.parse(color).b;

    let colorBackground = { background: `rgba(${rgb})` };

    const elements = [];
    for (
        let i = 0;
        i < getDatesBetweenDates(new Date(start), new Date(end)).length;
        i++
    ) {
        elements.push(<div key={i} className={"range"}></div>);
    }

    const onMouseDown = useCallback(
        (e) => {
            setState((prevState) => ({
                ...prevState,
                //   elementResize: eventRef.current,
                original_width: e.target.offsetParent.offsetWidth - 1,
                original_mouse_x: e.pageX,
                original_x: e.target.offsetParent.getBoundingClientRect().left,
                element: e.target.offsetParent,
                rightResize: e.target.classList.value,
                leftResize: e.target.classList.value,
                resizeElement: e.target.offsetParent,
                isResizing: true,
            }));
        },
        [setState]
    );

    const {
        minimum_size,
        original_width,
        original_mouse_x,
        element,
        rightResize,
        leftResize,
        leftWidth,
    } = state;

    const onMouseMove = useCallback(
        (e) => {
            if (element) {
                if (rightResize === "right" && element !== undefined) {
                    const width = original_width + (e.pageX - original_mouse_x);
                    if (width > minimum_size) {
                        element.style.width = width + "px";
                    }
                } else if (leftResize === "left" && element !== undefined) {
                    const width = original_width - (e.pageX - original_mouse_x);
                    if (width > minimum_size) {
                        element.style.width = width + "px";
                        element.style.left = leftWidth + e.pageX - original_mouse_x + "px";
                    }
                }
            }
        },
        [
            element,
            leftResize,
            leftWidth,
            minimum_size,
            original_mouse_x,
            original_width,
            rightResize,
        ]
    );

    useEffect(() => {
        const onMouseUpResize = (e) => {
            document.removeEventListener("mousemove", onMouseMove);
            if (!leftWidth) {
                setState((prevState) => ({
                    ...prevState,
                    isResizing: false,
                    leftWidth: e.pageX - original_mouse_x,
                }));
            } else {
                setState((prevState) => ({
                    ...prevState,
                    isResizing: false,
                    leftWidth: leftWidth + (e.pageX - original_mouse_x),
                }));
            }
        };

        if (state.isResizing) {
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUpResize);
        }
        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUpResize);
        };
    }, [
        state.isResizing,
        onMouseMove,
        element,
        leftResize,
        leftWidth,
        minimum_size,
        original_mouse_x,
        original_width,
        rightResize,
        event
    ]);

    return (
        <div
            className="event"
            style={colorBackground}
            id={progressPlanId}
        // ref={(element) => {
        //     eventRef.current = element;
        // }}
        >
            <span className="left" onMouseDown={(e) => onMouseDown(e)}></span>
            {elements}
            <span className="right" onMouseDown={(e) => onMouseDown(e)}></span>
            <span className="event-name"></span>
        </div>
    );
}

export default ResizeEvents;
