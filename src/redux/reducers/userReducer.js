import { userConstants } from "../constants/userConstants";

const initialState = {
    message: "",
    userIsLoaded: false,
    data: JSON.parse(localStorage.getItem('user'))
};

export default function user(state = initialState, action) {

    const { type, payload, width, height, data } = action;

    switch (type) {
        case userConstants.MANAGER_DATA:
            return {
                data: data,
                userIsLoaded: true
            };
        case userConstants.MANAGER_EMPLOYEES:
            return {
                ...state,
                data: { ...state.data.employees, payload }
            }
        case userConstants.MANAGER_DATA_ERROR:
            return {
                message: payload,
                userIsLoaded: false
            };
        case userConstants.USER_DATA_ERROR:
            return {
                message: payload,
            };
        case userConstants.GET_FILE:
            state.data.imageSrc = URL.createObjectURL(payload);
            return {
                ...state,
                imageFile: payload,
                width: width,
                height: height
            }
        case userConstants.DELETED_EMPLOYEE:
            {
                const dateCopy = { ...state.data };
                const index = dateCopy.employees.$values.findIndex(i => i.id === payload);
                dateCopy.employees.$values.splice(index, 1);
                return {
                    ...state, data: dateCopy
                };
            }
        case userConstants.MANAGER_EMPLOYEE_UPDATE:
            return {
                ...state, employees: { ...state.data.employees.$values, payload }
            };
        case userConstants.UPDATE_USER:

            return {
                ...state, data: payload.data,
                userIsLoaded: true
            }
        default:
            return state;
    }
}