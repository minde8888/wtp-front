import React, { useReducer, useEffect } from "react";
import { DateRangeInput } from "@datepicker-react/styled";
import { ThemeProvider } from "styled-components";
import { addDate } from "../../../../redux/actions/progressPlan";

const initialState = {
  startDate: null,
  endDate: null,
  focusedInput: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "focusChange":
      return { ...state, focusedInput: action.payload };
    case "dateChange":
      return action.payload;
    default:
      throw new Error();
  }
}

function GetDatePicker(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  let date = {
    start: state.startDate,
    end: state.endDate,
  };

  useEffect(() => {
    props.dispatch(addDate(date));
  }, [state]);

  return (
    <ThemeProvider
      theme={{
        breakpoints: ["32em", "48em", "64em"],
        reactDatepicker: {
          daySize: [36, 40],
          fontFamily: "system-ui, -apple-system",
          colors: {
            accessibility: "#D80249",
            selectedDay: "#f7518b",
            selectedDayHover: "#F75D95",
            primaryColor: "#d8366f",
          },
        },
      }}
    >
      <DateRangeInput
        displayFormat={"dd/MM/yyyy"}
        onDatesChange={(data) =>
          dispatch({ type: "dateChange", payload: data })
        }
        onFocusChange={(focusedInput) =>
          dispatch({ type: "focusChange", payload: focusedInput })
        }
        startDate={state.startDate} // Date or null
        endDate={state.endDate} // Date or null
        focusedInput={state.focusedInput} // START_DATE, END_DATE or null
      />
    </ThemeProvider>
  );
}

export default GetDatePicker;
