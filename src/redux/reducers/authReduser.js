const REGISTER_SUCCESS = "REGISTER_SUCCESS",
    REGISTER_FAIL = "REGISTER_FAIL",
    LOGIN_SUCCESS = "LOGIN_SUCCESS",
    LOGIN_FAIL = "LOGIN_FAIL",
    LOGOUT = "LOGOUT"

const user = JSON.parse(localStorage.getItem("user"));
const employees = JSON.parse(localStorage.getItem('employees'));
const token = JSON.parse(localStorage.getItem('token'));

var initialState = token ? { isLoggedIn: true, token } : { isLoggedIn: false, token: null };
initialState = { ...initialState, ...{employees}, ...{user}};


export default function auth(state = initialState, action) {

    const { type, user, employees, token } = action;

    switch (type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
            };
        case REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: user,
                employees: employees,
                token: token
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        default:
            return state;
    }
}