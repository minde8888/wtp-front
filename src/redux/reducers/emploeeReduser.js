import { employeeConstants } from "../constants/employeeConstants";

const initialState = {
    message: "",
    data: "",
    userIsLoaded: false
};

export default function employee(state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case employeeConstants.EMPLOYEE_PROFILE:
            return {
                profile: payload,
                userIsLoaded: true
            };
        case employeeConstants.EMPLOYEE_PROFILE_ERROR:
            return {
                message: payload,
                userIsLoaded: false
            };
        default:
            return state;
    }
}