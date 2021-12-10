import { employeeConstants } from "../constants/employeeConstants";

const initialState = {
    message: "",
    data: "",
    userIsLoadied: false
};

export default function employee(state = initialState, action) {

    const { type, payload, userIsLoadied } = action;

    switch (type) {
        case employeeConstants.EMPLOYEE_DATA:
            return {
                data: payload,
                userIsLoadied: userIsLoadied
            };
        case employeeConstants.EMPLOYEE_DATA_ERROR:
            return {
                message: payload,
                userIsLoadied: userIsLoadied
            };
        default:
            return state;
    }
}