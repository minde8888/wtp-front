import { authConstants } from "../constants/authConstants";

const token = JSON.parse(localStorage.getItem('token'));

var initialState =
    token ?
        { isLoggedIn: true, token } :
        { isLoggedIn: false, token: null };


export default function auth(state = initialState, action) {

    const { type, data } = action;

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
                token: data.user,
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
        default:
            return state;
    }
}