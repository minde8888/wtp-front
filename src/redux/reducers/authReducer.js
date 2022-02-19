import {
    authConstants
} from "../constants/authConstants";

const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));

var initialState = {
    token: "",
    isLoggedIn: refreshToken === null || refreshToken.length === 0 || refreshToken === undefined ? false : true
}

export default function auth(state = initialState, action) {
    const {
        type,
        payload
    } = action;

    switch (type) {
        case authConstants.REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
            };
        case authConstants.REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false,
            };
        case authConstants.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true
            };
        case authConstants.LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        case authConstants.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        case authConstants.REFRESH:
            return {
                ...state,
                isLoggedIn: true,
                token: payload
            }
        default:
            return state;
    }
}