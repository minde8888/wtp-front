const PASSWORD_SEND = "PASSWORD_SEND",
    PASSWORD_SEND_ERROR = "PASSWORD_SEND_ERROR",
    CLEAR_PASSWORD_MESSAGE = "CLEAR_PASSWORD_MESSAGE"

const initialState = {
    send: "",
    message: ""
}

export default function newPassword (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case PASSWORD_SEND:
            return {
                ...state,
                message: payload,
                send: true
            }
        case PASSWORD_SEND_ERROR:
            return {
                message: payload,
                send: false
            }
        case CLEAR_PASSWORD_MESSAGE:
            return{
                message:""
            }
        default:
            return state;
    }
}

