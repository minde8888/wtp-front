import { employeeConstants } from "../constants/employeeConstants";

const initialState = {
    message: "",
    data: "",
    userIsLoadied: false
};

export default function employee(state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case employeeConstants.EMPLOYEE_PROFILE:
            return {
                profile: payload,
                userIsLoadied: true
            };
        case employeeConstants.EMPLOYEE_PROFILE_ERROR:
            return {
                message: payload,
                userIsLoadied: false
            };
        default:
            return state;
    }
}