const PASSWORS_SEND = "PASSWORS_SEND",
PASSWORS_SEND_ERROR = "PASSWORS_SEND_ERROR"

const initialState = {
    message: ""
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case PASSWORS_SEND:
            return {
                ...state,
                email: payload.email,
                token: payload.token
            }
        case PASSWORS_SEND_ERROR:
            return {
                message: payload
            }
        default:
            return state;
    }
}