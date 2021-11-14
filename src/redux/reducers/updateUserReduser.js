const USER_DATA = "USER_DATA",
    USER_DATA_ERROR = "USER_DATA_ERROR",
    GET_FILE = "GET_FILE"

const initialState = {
    message: "",
    data: "",
    file: null,
    ImageSrc: null,
    userIsLoadied: false
};

export default function updateUser(state = initialState, action) {

    const { type, payload, userIsLoadied } = action;

    switch (type) {
        case USER_DATA:
            return {
                data: payload,
            };
        case USER_DATA_ERROR:
            return {
                message: payload,
            };
        case GET_FILE:
            return {
                file: payload,
                fileSrc: URL.createObjectURL(payload)
            }
        default:
            return state;
    }
}