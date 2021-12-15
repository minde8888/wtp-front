import { userConstants } from "../constants/userConstants";

const initialState = {
    message: "",
    userIsLoadied: false,
    file: null,
    ImageSrc: null,
    employees: JSON.parse(localStorage.getItem('employees')),
    data: JSON.parse(localStorage.getItem('user'))
};

export default function user(state = initialState, action) {

    const { type, payload } = action;
   
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
        case userConstants.EMPLOYEE_DATA:
            return {
                data: payload,
                userIsLoadied: true
            };
        case userConstants.EMPLOYEE_DATA_ERROR:
            return {
                message: payload,
                userIsLoadied: false
            };
        case userConstants.USER_DATA_ERROR:
            return {
                message: payload,
            };
        case userConstants.GET_FILE:
            return {
                ImageFile: payload,
                fileSrc: URL.createObjectURL(payload)
            }
        case userConstants.DELETED_EMPLOYEE:
            return { ...state, employees: state.employees.filter(i => i.id !== payload) };
        default:
            return state;
    }
}