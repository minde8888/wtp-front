const PASSWORS_SEND = "PASSWORS_SEND",
    PASSWORS_SEND_ERROR = "PASSWORS_SEND_ERROR",
    CLEAR_PASSWORS_MESSAGE = "CLEAR_PASSWORS_MESSAGE"

const initialState = {
    send: "",
    message: ""
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case PASSWORS_SEND:
            return {
                ...state,
                message: payload,
                send: true
            }
        case PASSWORS_SEND_ERROR:
            return {
                message: payload,
                send: false
            }
        case CLEAR_PASSWORS_MESSAGE:
            return{
                message:""
            }
        default:
            return state;
    }
}

