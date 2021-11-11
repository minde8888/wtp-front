const EMPLOYEE_DATA = "EMPLOYEE_DATA",
    EMPLOYEE_DATA_ERROR = "EMPLOYEE_DATA_ERROR"

const initialState = {
    message: "",
    data: ""
};

export default function (state = initialState, action) {
console.log(action);
    const { type, payload } = action;

    switch (type) {
        case EMPLOYEE_DATA:
            return {
                data: payload
            };
        case EMPLOYEE_DATA_ERROR:
            return {
                message: payload
            };   
        default:
            return state;
    }
}