const URL_CHANGE = "URL_CHANGE",
URL_ERROR = "URL_ERROR"

const initialState = {
    email: "",
    token: "",
    message:""
}

export default function (state = initialState, action) {
    console.log(action);
    const { type, payload } = action;

    switch (type) {
        case URL_CHANGE:
            return {
                ...state,
                email: payload.email,
                token: payload.token
            }
        case  URL_ERROR:
            return{
                ...state,
                message: playloade.message
            }
        default:
            return state;
    }
}