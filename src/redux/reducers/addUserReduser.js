const ADD_SUCCESS = "ADD_SUCCESS",
    ADD_FAIL = "ADD_FAIL"

const initialState = {
    message: "",
    payload:""
};

export default function (state = initialState, action) {
    const { type, payload} = action;

    switch (type) {
        case ADD_SUCCESS:
            return {
                ...state,
                response: payload
            };
        case ADD_FAIL:
            return {
                ...state,
                payload: payload.message,
            };
        default:
            return state;
    }
}