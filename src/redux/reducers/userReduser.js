import { userConstants } from "../constants/userConstants";

const initialState = {
    message: "",
    userIsLoadied: false,
    employees: JSON.parse(localStorage.getItem('employees')),
    data: JSON.parse(localStorage.getItem('user'))
};

export default function user(state = initialState, action) {

    const { type, payload, width, height } = action;

    switch (type) {
        case userConstants.MANAGER_DATA:
            return {
                data: payload,
                userIsLoadied: true
            };
        case userConstants.MANAGER_DATA_ERROR:
            return {
                message: payload,
                userIsLoadied: false
            };
        case userConstants.USER_DATA_ERROR:
            return {
                message: payload,
            };
        case userConstants.GET_FILE:
            state.data.imageSrc =  URL.createObjectURL(payload);
            return {
                ...state,
                imageFile: payload,
                width: width,
                height: height
            }
        case userConstants.DELETED_EMPLOYEE:
            return {
                ...state, employees: state.employees.filter(i => i.id !== payload)
            };
        case userConstants.MANAGER_EMPLOYEE_UPDTE:
            return {
                ...state, employees: { ...payload }
            };
        default:
            return state;
    }
}