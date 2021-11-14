const EMPLOYEE_DATA = "EMPLOYEE_DATA",
    EMPLOYEE_DATA_ERROR = "EMPLOYEE_DATA_ERROR"

const initialState = {
    message: "",
    data: "",
    userIsLoadied: false
};

export default function employee(state = initialState, action) {

    const { type, payload, userIsLoadied } = action;

    switch (type) {
        case EMPLOYEE_DATA:
            return {
                data: payload,
                userIsLoadied: userIsLoadied
            };
        case EMPLOYEE_DATA_ERROR:
            return {
                message: payload,
                userIsLoadied: userIsLoadied
            };
        default:
            return state;
    }
}