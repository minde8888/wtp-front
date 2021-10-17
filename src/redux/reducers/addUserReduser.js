const IN_PROGRESS = "IN_PROGRESS",
    ADD_SUCCESS = "ADD_SUCCESS",
    ADD_FAIL = "ADD_FAIL"

const initialState = {
    progress: " ",
    message: "",
    currentFile: "",
    previewImage: "",
    imageInfos: "",
};

export default function (state = initialState, action) {
    const { type, progress, payload, message } = action;

    switch (type) {
        case IN_PROGRESS:
            return {
                ...state,
                progress: progress
            };
        case ADD_SUCCESS:
            return {
                ...state,
                response: payload
            };
        case ADD_FAIL:
            return {
                ...state,
                payload: message,
                progress: progress
            };
        default:
            return state;
    }
}